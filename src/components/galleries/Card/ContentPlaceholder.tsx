import { memo } from 'react';

export const ContentPlaceholder = memo(
  ({ description }: { description: string }) => (
    <div className="content-container">
      <p>{description}</p>
    </div>
  )
);

export default ContentPlaceholder;
