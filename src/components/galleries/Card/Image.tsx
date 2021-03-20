/* eslint-disable react/jsx-max-props-per-line */
import { motion, MotionValue, useMotionValue } from 'framer-motion';

import {
  closeAnimation,
  closeSpring,
  openAnimation,
  openSpring,
} from './animations';

export interface ImageProps {
  isSelected: boolean;
  // backgroundColor: string;
  src: string;
  id: string;
}

export const Image = ({
  isSelected,
  // backgroundColor,
  src,
  id,
}: ImageProps): any => (
  <motion.div
    animate={isSelected ? openAnimation : closeAnimation}
    className="d-card-image-container"
    layout
    transition={isSelected ? openSpring : closeSpring}
  >
    <motion.img
      alt="drawing thumbnail"
      animate={isSelected ? openAnimation : closeAnimation}
      className="d-card-image"
      layout
      loading="lazy"
      onError={(e) => {
        // TODO: fix
        (e.target as any).src =
          'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image-300x225.png';
      }}
      src={src}
      transition={isSelected ? openSpring : closeSpring}
    />
  </motion.div>
);

export default Image;
