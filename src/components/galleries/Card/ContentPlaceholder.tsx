import { memo } from 'react';

import { motion } from 'framer-motion';

export const ContentPlaceholder = memo(
  ({ description, id }: { id: string; description: string }) => (
    <motion.div
      className="content-container"
      style={{ originY: 0, originX: 0 }}
    >
      <p>{description}</p>
    </motion.div>
  )
);

export default ContentPlaceholder;
