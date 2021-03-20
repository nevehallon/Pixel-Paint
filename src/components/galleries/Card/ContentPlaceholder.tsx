import { memo } from 'react';

export const ContentPlaceholder = memo(
  ({ description, id }: { id: string; description: string }) => (
    <div className="content-container">
      <p>{description}</p>
    </div>
  )
);

export default ContentPlaceholder;
