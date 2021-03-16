import { motion } from 'framer-motion';

import { closeSpring } from './animations';

export interface ImageProps {
  // id: string;
  isSelected: boolean;
  pointOfInterest?: number | undefined;
  backgroundColor: string;
}

export const Image = ({
  // id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}: ImageProps): any => (
  <motion.div
    className="card-image-container"
    layout
    style={{ backgroundColor, originX: 0, originY: 0 }}
  >
    <motion.img
      alt=""
      animate={isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }}
      className="card-image"
      initial={false}
      // src={`images/${id}.jpg`}
      transition={closeSpring}
    />
  </motion.div>
);

export default Image;
