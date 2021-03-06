/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

function GlobalListener({
  eventType,
  handler,
}: {
  eventType: string;
  handler: () => any;
}): null {
  useEffect(() => {
    window.addEventListener(eventType, handler);
    return () => {
      window.removeEventListener(eventType, handler);
    };
  }, []);
  return null;
}

export default GlobalListener;
