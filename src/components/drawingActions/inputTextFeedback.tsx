import { useEffect, useState } from 'react';

import { motion, transform, useAnimation } from 'framer-motion';

import { GenericObjectProps } from '../../interfaces/genericObjectProps';

const mapRemainingToColor = transform([2, 6], ['#ff008c', '#ccc']);
const mapRemainingToSpringVelocity = transform([0, 5], [50, 0]);

const InputFeedback = ({
  renderInput,
  maxLength,
}: GenericObjectProps): JSX.Element => {
  const [value, setValue] = useState('');
  const charactersRemaining = maxLength - value.length;
  const controls = useAnimation();

  useEffect(() => {
    if (charactersRemaining > 6) return;

    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        velocity: mapRemainingToSpringVelocity(charactersRemaining),
        stiffness: 700,
        damping: 80,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.length]);

  return (
    <div className="container">
      {/* <input onChange={(e) => setValue(e.target.value)} value={value} /> */}
      {renderInput({ onInput: (e: any) => setValue(e.target.value), value })}
      <div>
        <motion.span
          animate={controls}
          style={{ color: mapRemainingToColor(charactersRemaining) }}
        >
          {charactersRemaining}
        </motion.span>
      </div>
    </div>
  );
};

export default InputFeedback;
