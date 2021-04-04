import { memo } from 'react';

import { Button } from 'primereact/button';

export const ContentPlaceholder = memo(
  ({ description, painterInfo }: { description: string; painterInfo: any }) => {
    const { name } = painterInfo;
    return (
      <div className="content-container">
        {painterInfo && (
          <div className="d-flex justify-content-between mx-2">
            <span>By: {name}</span>
            <Button
              className="mx-1 p-button-rounded p-button-text p-button-lg d-inline-block"
              icon="pi pi-user"
              label="See profile"
              onClick={() => {
                // history.replace('/my-drawings');
              }}
            />
          </div>
        )}
        <p>{description}</p>
      </div>
    );
  }
);

export default ContentPlaceholder;
