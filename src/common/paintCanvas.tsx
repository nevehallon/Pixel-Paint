/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createRef, useEffect, useRef, useState } from 'react';

import Detector from '../services/paintHelperService';

function getCoords(index: number, length: number): string {
  return `${Math.floor(index / Math.sqrt(length))},${Math.floor(
    index % Math.sqrt(length)
  )}`;
}

export interface CanvasProps {
  fillAction: (grid: { fill: string; touched: boolean }[]) => void;
  grid: { fill: string; touched: boolean }[];
  currentColor: string;
}

function PaintCanvas({ fillAction, grid, currentColor }: CanvasProps): any {
  const [gridCopy, setGridCopy] = useState([...grid]);
  const squareRefs = useRef<any[]>([]);
  const sqrt = Math.sqrt(grid.length);
  const emitState = (
    newGrid: CanvasProps['grid'],
    e: any | Event = { type: '', keycode: 0 }
  ): any => {
    Detector.canCallBack = false;

    if (e.type === 'keyup' && e.keyCode !== 13) {
      return;
    }
    if (!Detector.isMouseDown) {
      // update parent state
      fillAction(newGrid);
    }
  };

  useEffect(() => {
    Detector.callback = () => {
      Detector.newGrid = squareRefs.current.map((x: any) => ({
        fill: x.style.backgroundColor,
        touched: x.dataset.touched,
      }));
      if (Detector.canCallBack) {
        emitState(Detector.newGrid);
      }
    };

    return () => {
      Detector.callback = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGridCopy([...grid]);
    squareRefs.current = grid.map(createRef);
  }, [grid, grid.length, fillAction]);

  const handleFill = (i: number, e: any | Event): any => {
    if (e.type === 'keydown') {
      // allow user to navigate the grid with arrow keys
      if (e.keyCode > 36 && e.keyCode < 41) {
        e.keyCode === 37
          ? squareRefs.current[i - 1 >= 0 ? i - 1 : i]?.focus()
          : e.keyCode === 38
          ? squareRefs.current[i - sqrt >= 0 ? i - sqrt : i]?.focus()
          : e.keyCode === 39
          ? squareRefs.current[i + 1 >= 0 ? i + 1 : i]?.focus()
          : e.keyCode === 40
          ? squareRefs.current[i + sqrt >= 0 ? i + sqrt : i]?.focus()
          : undefined;
        e.preventDefault();
      }
    }
    if (
      gridCopy[i].fill === currentColor ||
      (e.type === 'mouseenter' && !Detector.isMouseDown) ||
      (e.type === 'keydown' && e.keyCode !== 13)
    ) {
      return;
    }

    squareRefs.current[i].style.backgroundColor = currentColor;
    if (squareRefs.current[i].dataset.touched === 'false') {
      squareRefs.current[i].dataset.touched = true;
    }

    if (e.type === 'mouseenter') Detector.canCallBack = true;
    if (e.type === 'keydown') emitState(gridCopy);
  };

  // console.log('rendered');
  // console.count(); TODO: fix multiple renders

  return (
    <div
      className="paintGrid"
      style={{
        gridTemplateColumns: `repeat(${sqrt}, minmax(1px, 1fr))`,
        gridTemplateRows: `repeat(${sqrt}, minmax(1px, 1fr))`,
      }}
    >
      {grid.map((x, i, arr) => (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          aria-label="fill square"
          className="square"
          data-touched={x.touched}
          key={getCoords(i, arr.length)}
          onKeyDown={(e) => handleFill(i, e)}
          onMouseDown={(e) => handleFill(i, e)}
          onMouseEnter={(e) => handleFill(i, e)}
          // eslint-disable-next-line no-return-assign
          ref={(el) => (squareRefs.current[i] = el)}
          role="button"
          style={{ backgroundColor: gridCopy[i].fill }}
          tabIndex={0}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
