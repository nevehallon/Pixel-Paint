import { motion } from 'framer-motion';

import { closeSpring } from './animations';

export interface ImageProps {
  isSelected: boolean;
  pointOfInterest?: number | undefined;
  backgroundColor: string;
  src: string;
  id: string;
}

export const Image = ({
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
  src,
  id,
}: ImageProps): any => (
  <motion.div
    className="d-card-image-container"
    layoutId={`d-card-image-container-${id}`}
    style={{ backgroundColor, originX: 0, originY: 0 }}
  >
    <motion.img
      alt=""
      // animate={isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }}
      className="d-card-image"
      initial={false}
      layoutId={`d-card-image-${id}`}
      src={src}
      transition={closeSpring}
    />
  </motion.div>
);

export default Image;
