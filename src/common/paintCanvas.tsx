import { useEffect, useState } from 'react';

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
  const [gridCopy, setGridCopy] = useState([...grid]);

  /* range 15x15 - 35x35 */
  const sqrt = Math.sqrt(grid.length);

  const emitState = (e: any | Event = { type: '', keycode: 0 }): any => {
    if (e.type === 'keyup' && e.keyCode !== 13) {
      return;
    }
    if (!Detector.isMouseDown) {
      // update parent state
      fillAction(gridCopy);
    }
  };

  // prettier-ignore
  useEffect(() => {
    Detector.callback = () => {
      emitState();
    };

    return () => {
      Detector.callback = () => {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // prettier-ignore
  const handleFill = (i: number, e: any | Event): any => {
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

    if(e.type === 'keydown') emitState();

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
          role="button"
          style={{ backgroundColor: x }}
          tabIndex={0}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
