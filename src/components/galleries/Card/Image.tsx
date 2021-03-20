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
  // y: MotionValue<number>;
}

export const Image = ({
  isSelected,
  // backgroundColor,
  src,
  // y,
  id,
}: ImageProps): any => (
  <motion.div
    animate={isSelected ? openAnimation : closeAnimation}
    className="d-card-image-container"
    layout
    transition={isSelected ? openSpring : closeSpring}
  >
    <motion.img
      alt=""
      animate={isSelected ? openAnimation : closeAnimation}
      className="d-card-image"
      layout
      src={src}
      transition={isSelected ? openSpring : closeSpring}
      // style={{ y }}
    />
  </motion.div>
);

export default Image;
