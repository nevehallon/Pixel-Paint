/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

function GlobalListener({
  eventType,
  handler,
}: {
  eventType: string[];
  handler: (() => any)[];
}): null {
  useEffect(() => {
    eventType.forEach((x, i) => window.addEventListener(x, handler[i]));

    return () => {
      eventType.forEach((x, i) => window.removeEventListener(x, handler[i]));
    };
  }, []);
  return null;
}

export default GlobalListener;
