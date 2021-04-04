export interface DrawingProps {
  _id: string;
  drawingName: string;
  description: string;
  dataUrl: string;
  onDelete: (() => Promise<void>) | void;
}
