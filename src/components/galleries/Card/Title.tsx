import { motion } from 'framer-motion';

import {
  closeAnimation,
  closeSpring,
  openAnimation,
  openSpring,
} from './animations';

export interface TitleProps {
  title: any;
  category: any;
  isSelected: any;
}

export const Title = ({ title, category, isSelected }: TitleProps): any => (
  <motion.div
    animate={isSelected ? openAnimation : closeAnimation}
    className="title-container"
    layout
    transition={isSelected ? openSpring : closeSpring}
  >
    <span className="category">{category}</span>
    <h2>{title}</h2>
  </motion.div>
);

export default Title;
