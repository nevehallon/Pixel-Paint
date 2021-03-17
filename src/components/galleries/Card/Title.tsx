import { motion } from 'framer-motion';

import { closeSpring, openSpring } from './animations';

export interface TitleProps {
  title: any;
  category: any;
  isSelected: any;
  id: string;
}

const scaleTranslate = ({ x, y, scaleX, scaleY }: { [key: string]: any }) => {
  console.log({ x, y, scaleX, scaleY });

  return `translate(${x}, ${y}) translateZ(0)`;
};

export const Title = ({ id, title, category, isSelected }: TitleProps): any => {
  const x = isSelected ? 30 : 15;
  const y = x;

  return (
    <motion.div
      animate={{ x, y }}
      className="title-container"
      initial={false}
      style={{ originX: 0, originY: 0 }}
      transition={isSelected ? openSpring : closeSpring}
    >
      <span className="category">{category}</span>
      <h2>{title}</h2>
    </motion.div>
  );
};

export default Title;
