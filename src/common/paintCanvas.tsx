/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createRef, useEffect, useState } from 'react';

import Detector from '../services/detectMouseDown';

function getCoords(index: number, length: number): string {
  return `${Math.floor(index / Math.sqrt(length))},${Math.floor(
    index % Math.sqrt(length)
  )}`;
}

export interface CanvasProps {
  fillAction: (grid: string[]) => void;
  grid: string[];
  currentColor: string;
}

function PaintCanvas({ fillAction, grid, currentColor }: CanvasProps): any {
  const sqrt = Math.sqrt(grid.length);
  const [gridCopy, setGridCopy] = useState([...grid]);
  const [squareRefs, setSquareRefs] = useState([]);
  const emitState = (
    newGrid: string[],
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

  // prettier-ignore
  useEffect(() => {
    Detector.callback = () => {
      if (Detector.canCallBack) {
        emitState(gridCopy);
      }
    };

    return () => {
      Detector.callback = () => {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGridCopy([...grid]);
    // TODO: update with the newGrid data
  }, [grid]);

  useEffect(() => {
    // prettier-ignore
    setSquareRefs((sqrRefs) => Array(grid.length).fill('').map((_, i) => sqrRefs[i] || createRef()));
  }, [grid.length, fillAction]);

  // prettier-ignore
  const handleFill = (i: number, e: any | Event): any => {
    if(e.type === 'keydown') {
      // allow user to navigate the grid with arrow keys
      if(e.keyCode > 36 && e.keyCode < 41) {
          e.keyCode === 37
          ? (squareRefs[i - 1 >= 0 ? i - 1 : i] as any)?.current?.focus()
              : e.keyCode === 38
              ? (squareRefs[i - sqrt >= 0 ? i - sqrt : i] as any)?.current?.focus()
              : e.keyCode === 39
              ? (squareRefs[i + 1 >= 0 ? i + 1 : i] as any)?.current?.focus()
              : e.keyCode === 40
              ? (squareRefs[i + sqrt >= 0 ? i + sqrt : i] as any)?.current?.focus() : undefined;
              e.preventDefault();
      }
    }
    if (
      (e.type === 'mouseover' && !Detector.isMouseDown)
    || (e.type === 'keydown' && e.keyCode !== 13)
    || (gridCopy[i] === currentColor)
    ) {
      return;
    }

    setGridCopy((gridC) => {
      const newGrid = [...gridC];
      newGrid[i] = currentColor;
      return newGrid;
    });
    // console.log({ gridCopy, grid });

    if (e.type === 'mouseover') Detector.canCallBack = true;
    if(e.type === 'keydown') emitState(gridCopy);

    e.preventDefault();
  };

  return (
    <div
      className="paintGrid"
      style={{
        gridTemplateColumns: `repeat(${sqrt}, minmax(1px, 1fr))`,
        gridTemplateRows: `repeat(${sqrt}, minmax(1px, 1fr))`,
      }}
    >
      {gridCopy.map((x, i, arr) => (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          aria-label="fill square"
          className="square"
          key={getCoords(i, arr.length)}
          onKeyDown={(e) => handleFill(i, e)}
          onMouseDown={(e) => handleFill(i, e)}
          onMouseOver={(e) => handleFill(i, e)}
          ref={squareRefs[i]}
          role="button"
          style={{ backgroundColor: x }}
          tabIndex={0}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
