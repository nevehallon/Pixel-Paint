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

  // prettier-ignore
  const handleFill = (i: number, e: any | Event): any => {
    if (!Detector.isMouseDown) {
      // update parent state
      fillAction(gridCopy);
    }
    if ((e.type === 'mouseover' && !Detector.isMouseDown) || (e.type === 'keydown' && e.keyCode !== 13)) {
      return;
    }

    setGridCopy((gridC) => {
    const newGrid = [...gridC];
      newGrid[i] = currentColor;
      return newGrid;
    });

    e.preventDefault();
    e.stopPropagation();
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
