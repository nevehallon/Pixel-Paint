import { createRef, useEffect, useRef, useState } from 'react';

import { fromEvent } from 'rxjs';
import {
  bufferTime,
  debounceTime,
  delay,
  last,
  publishLast,
  take,
  takeLast,
} from 'rxjs/operators/';

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
  const squareRefs = useRef([]);

  if (squareRefs.current.length !== grid.length) {
    squareRefs.current = Array(grid.length)
      .fill('')
      .map((_, i) => squareRefs.current[i] || createRef());
  }
  // prettier-ignore
  useEffect(() => {
    const sqrRefs = squareRefs.current.map(({ current }) => current);

     fromEvent(sqrRefs, 'mouseleave').pipe(debounceTime(1000), take(1)).subscribe(() => fillAction(gridCopy));
  }, [fillAction, gridCopy]);

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
  const handleFill = (i: number, e: any | Event): any => {
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
          onKeyUp={(e) => emitState(e)}
          // onMouseLeave={() => emitState()}
          onMouseOver={(e) => handleFill(i, e)}
          onMouseUp={() => emitState()}
          ref={squareRefs.current[i]}
          role="button"
          style={{ backgroundColor: x }}
          tabIndex={0}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
