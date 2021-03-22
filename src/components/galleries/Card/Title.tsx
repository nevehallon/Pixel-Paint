import { motion } from 'framer-motion';

import { closeAnimation, openAnimation } from './animations';

export interface TitleProps {
  title: any;
  isSelected: any;
}

export const Title = ({ title, isSelected }: TitleProps): any => (
  <motion.div
    animate={isSelected ? openAnimation : closeAnimation}
    className="title-container"
  >
    <h2>{title}</h2>
  </motion.div>
);

export default Title;
