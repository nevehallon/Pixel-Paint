import { memo } from 'react';

import { motion } from 'framer-motion';

export const ContentPlaceholder = memo(() => (
  <motion.div
    className="content-container"
    // layout
    style={{ originY: 0, originX: 0 }}
  >
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, aperiam
      ullam. Saepe inventore quaerat itaque ad, mollitia perspiciatis blanditiis
      omnis vero unde natus nihil beatae odit adipisci asperiores expedita
      cupiditate.
    </p>
  </motion.div>
));

export default ContentPlaceholder;
