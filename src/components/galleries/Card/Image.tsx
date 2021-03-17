import { motion } from 'framer-motion';

import { closeSpring } from './animations';

export interface ImageProps {
  id: string;
  isSelected: boolean;
  pointOfInterest?: number | undefined;
  backgroundColor: string;
}

export const Image = ({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}: ImageProps): any => (
  <motion.div
    className="d-card-image-container"
    style={{ backgroundColor, originX: 0, originY: 0 }}
  >
    <motion.img
      alt=""
      animate={isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }}
      className="d-card-image"
      initial={false}
      // src={`images/${id}.jpg`}
      src="http://placehold.jp/150x150.png"
      transition={closeSpring}
    />
  </motion.div>
);

export default Image;
