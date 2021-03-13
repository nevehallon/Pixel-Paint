/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';

import Detector from '../../services/paintHelperService';

function getCoords(index: number, length: number): string {
  return `${Math.floor(index / Math.sqrt(length))},${Math.floor(
    index % Math.sqrt(length)
  )}`;
}

const handleTouchMove = (e: TouchEvent) => {
  // ? stop user from scrolling when touching the canvas
  e.preventDefault();
};

export interface CanvasProps {
  fillAction: (grid: { fill: string; touched: string }[]) => void;
  grid: { fill: string; touched: string }[];
  currentColor: string;
  addedStyle: {
    border: string;
  };
}

const PaintCanvas = forwardRef(
  (
    { fillAction, grid, currentColor, addedStyle }: CanvasProps,
    ref: ForwardedRef<any>
  ): any => {
    const sqrt = Math.sqrt(grid.length);
    const Helper = useRef() as MutableRefObject<Detector>;
    const squareRefs = useRef<any[]>([]);

    const setSquareRef = (
      index: number,
      element: HTMLDivElement | null
    ): void => {
      if (index === 0) {
        squareRefs.current = [];
      }
      squareRefs.current[index] = element;
    };

    const emitState = (
      newGrid: CanvasProps['grid'],
      e: any | Event = { type: '', keycode: 0 }
    ): any => {
      Helper.current.drawStart = false;
      Helper.current.canCallBack = false;

      if (e.type === 'keyup' && e.keyCode !== 13) {
        return;
      }
      if (!Helper.current?.isMouseDown) {
        // update parent state
        fillAction(newGrid);
      }
    };

    useEffect(() => {
      Helper.current = new Detector();
      const helper = Helper.current;
      helper.callback = () => {
        helper.newGrid = squareRefs.current.map((x: any) => ({
          fill: x.style.backgroundColor,
          touched: x.dataset.touched,
        }));

        if (helper.canCallBack) {
          emitState(helper.newGrid);
        }
      };
      (ref as any).current.addEventListener('touchmove', handleTouchMove);

      return () => {
        helper.callback = () => {};
        helper.cleanup();
        // (ref as any).current.removeEventListener('touchmove', handleTouchMove);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFill = (i: number, e: any | Event): any => {
      if (e.type === 'pointerdown') {
        e.target.releasePointerCapture(e.pointerId);
        // stop right click
        if (e.which === 3 || e.button === 2) return;

        Helper.current.drawStart = true;
      }
      const squares = squareRefs.current;
      if (e.type === 'keydown') {
        // allow user to navigate the grid with arrow keys
        if (e.keyCode > 36 && e.keyCode < 41) {
          e.keyCode === 37
            ? squares[i - 1 >= 0 ? i - 1 : i]?.focus()
            : e.keyCode === 38
            ? squares[i - sqrt >= 0 ? i - sqrt : i]?.focus()
            : e.keyCode === 39
            ? squares[i + 1 >= 0 ? i + 1 : i]?.focus()
            : e.keyCode === 40
            ? squares[i + sqrt >= 0 ? i + sqrt : i]?.focus()
            : undefined;
          e.preventDefault();
        }
      }

      if (
        squares[i].style.backgroundColor === currentColor ||
        (e.type === 'pointerenter' &&
          (!Helper.current?.isMouseDown || !Helper.current?.drawStart)) ||
        (e.type === 'keydown' && e.keyCode !== 13)
      ) {
        return;
      }

      // ? setting square color
      squares[i].style.backgroundColor = currentColor;
      if (!squares[i].dataset.touched) {
        squares[i].dataset.touched = 'true';
      }

      Helper.current.canCallBack = true;
      if (e.type === 'keydown') {
        emitState(
          squares.map((x: any) => ({
            fill: x.style.backgroundColor,
            touched: x.dataset.touched,
          }))
        );
      }
    };

    // console.log('rendered');
    // console.count(); TODO: fix multiple renders

    return (
      <div
        className="paintGrid"
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${sqrt}, minmax(1px, 1fr))`,
          gridTemplateRows: `repeat(${sqrt}, minmax(1px, 1fr))`,
        }}
      >
        {grid.map((x, i, arr) => (
          <div
            aria-label="fill square"
            className="square"
            data-touched={x.touched}
            key={getCoords(i, arr.length)}
            onKeyDown={(e) => handleFill(i, e)}
            onPointerDown={(e) => handleFill(i, e)}
            onPointerEnter={(e) => handleFill(i, e)}
            ref={(el) => setSquareRef(i, el)}
            role="button"
            style={{ backgroundColor: x.fill, ...addedStyle }}
            tabIndex={0}
          />
        ))}
      </div>
    );
  }
);

export default PaintCanvas;
