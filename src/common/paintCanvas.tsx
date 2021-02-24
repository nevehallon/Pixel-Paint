function getCoords(index: number, length: number): string {
  return `${Math.floor(index / Math.sqrt(length))},${Math.floor(
    index % Math.sqrt(length)
  )}`;
}

export interface CanvasProps {
  fillAction: (index: number, e: any) => void;
  dimensions: number;
  grid: string[];
}

function PaintCanvas({ fillAction, dimensions, grid }: CanvasProps): any {
  /* range 15x15 - 35x35 */

  const emitFill = (i: number, e: any | Event): any => {
    if (e.type === 'keydown' && e.keyCode !== 13) return;

    fillAction(i, e);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="paintGrid"
      style={{
        gridTemplateColumns: `repeat(${Math.sqrt(
          dimensions ** 2
        )}, minmax(1px, 1fr))`,
        gridTemplateRows: `repeat(${Math.sqrt(
          dimensions ** 2
        )}, minmax(1px, 1fr))`,
      }}
    >
      {grid.map((x, i, arr) => (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          aria-label="fill square"
          className="square"
          key={getCoords(i, arr.length)}
          onKeyDown={(e) => emitFill(i, e)}
          onMouseOver={(e) => emitFill(i, e)}
          role="button"
          style={{ backgroundColor: grid[i] }}
          tabIndex={i}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
