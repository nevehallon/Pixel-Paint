export interface Drawing {
  drawingName: string;
  description: string;
  grid: { fill: string; touched: string }[];
  _id?: string;
  // TODO:
}
