export interface DrawingProps {
  drawing: {
    _id: string;
    drawingName: string;
    description: string;
    dataUrl: string;
  };
  onDelete: () => Promise<void>;
}
