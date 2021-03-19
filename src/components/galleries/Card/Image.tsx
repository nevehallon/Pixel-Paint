/* eslint-disable react/jsx-max-props-per-line */
import { motion, MotionValue, useMotionValue } from 'framer-motion';

import { closeSpring, openSpring } from './animations';

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
  <div className="d-card-image-container">
    <motion.img
      alt=""
      animate={isSelected ? openSpring : closeSpring}
      className="d-card-image"
      layout
      src={src}
      // style={{ y }}
      transition={isSelected ? openSpring : closeSpring}
    />
  </div>
);

export default Image;
