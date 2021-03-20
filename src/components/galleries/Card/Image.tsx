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
      alt=""
      animate={isSelected ? openAnimation : closeAnimation}
      className="d-card-image"
      layout
      src={src}
      transition={isSelected ? openSpring : closeSpring}
    />
  </motion.div>
);

export default Image;
