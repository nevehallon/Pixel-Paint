import { motion } from 'framer-motion';

import { closeAnimation, openAnimation } from './animations';

export interface ImageProps {
  isSelected: boolean;
  src: string;
}

export const Image = ({ isSelected, src }: ImageProps): any => (
  <motion.div
    animate={isSelected ? openAnimation : closeAnimation}
    className="d-card-image-container"
    layout
  >
    <motion.img
      alt="drawing thumbnail"
      animate={isSelected ? openAnimation : closeAnimation}
      className="d-card-image"
      layout
      loading="lazy"
      onError={(e) => {
        (e.target as any).src =
          'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image-300x225.png';
      }}
      src={src}
    />
  </motion.div>
);

export default Image;
