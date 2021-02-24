function getCoords(index: number, length: number): string {
  return `${Math.floor(index / Math.sqrt(length))},${
    index % Math.sqrt(length)
  }`;
}

function PaintCanvas(): any {
  return (
    <div
      className="paintGrid"
      style={{
        gridTemplateColumns: `repeat(${Math.sqrt(25)}, minmax(25px, 1fr))`,
        gridTemplateRows: `repeat(${Math.sqrt(25)}, minmax(25px, 1fr))`,
      }}
    >
      {Array(25)
        .fill({ color: '', coordinates: '' })
        .map((x, i, arr) => (
          <div
            className="square"
            data-coordinates={getCoords(i, arr.length)}
            key={getCoords(i, arr.length)}
            style={{ backgroundColor: i % 2 === 0 ? 'black' : 'white' }}
          />
        ))}
    </div>
  );
}

export default PaintCanvas;
