/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

function GlobalListener({
  eventType,
  handler,
}: {
  eventType: (string | boolean)[];
  handler: (((e?: any) => any) | boolean)[];
}): null {
  useEffect(() => {
    eventType.forEach((x, i, arr) => {
      let event = x;
      let index = i;
      if (x === true) event = arr[0];
      if (handler[index] === true) index = 0;
      window.addEventListener(event as any, handler[index] as any);
    });

    return () => {
      eventType.forEach((x, i, arr) => {
        let event = x;
        let index = i;
        if (x === true) event = arr[0];
        if (handler[index] === true) index = 0;
        window.removeEventListener(event as any, handler[index] as any);
      });
    };
  }, []);
  return null;
}

export default GlobalListener;
