export interface DrawingProps {
  drawing: {
    _id: string;
    drawingName: string;
    description: string;
  };
  onDelete: () => Promise<void>;
}
