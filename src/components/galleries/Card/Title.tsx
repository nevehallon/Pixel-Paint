import { motion } from 'framer-motion';

import { closeSpring, openSpring } from './animations';

export interface TitleProps {
  title: any;
  category: any;
  isSelected: any;
  id: string;
}

export const Title = ({ id, title, category, isSelected }: TitleProps): any => (
  <motion.div
    animate={isSelected ? openSpring : closeSpring}
    className="title-container"
    layout
  >
    <span className="category">{category}</span>
    <h2>{title}</h2>
  </motion.div>
);

export default Title;
