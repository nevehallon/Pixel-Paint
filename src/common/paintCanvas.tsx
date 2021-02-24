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
        <div
          aria-label="fill square"
          className="square"
          key={getCoords(i, arr.length)}
          onFocus={(e) => fillAction(i, e)}
          onKeyDown={(e) => fillAction(i, e)}
          onMouseOver={(e) => fillAction(i, e)}
          role="button"
          style={{ backgroundColor: grid[i] }}
          tabIndex={i}
        />
      ))}
    </div>
  );
}

export default PaintCanvas;
