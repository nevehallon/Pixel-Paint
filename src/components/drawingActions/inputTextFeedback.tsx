import { useEffect, useState } from 'react';

import { motion, transform, useAnimation } from 'framer-motion';

import { GenericObjectProps } from '../../interfaces/genericObjectProps';

import './styles.scss';

const mapRemainingToColor = transform([2, 6], ['#ff008c', '#ccc']);
const mapRemainingToSpringVelocity = transform([0, 15], [15, 0]);

const InputFeedback = ({
  renderInput,
  maxLength,
  label,
  currentValue,
}: GenericObjectProps): JSX.Element => {
  const [value, setValue] = useState(currentValue || '');
  const charactersRemaining = maxLength - value.length;
  const controls = useAnimation();

  useEffect(() => {
    if (charactersRemaining > 10) return;

    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        velocity: mapRemainingToSpringVelocity(charactersRemaining),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.length]);

  const feedbackElement = (
    <div className="motion-container">
      <div>{label}</div>
      {!!value.length && (
        <div>
          {/* Characters Remaining: TODO: fit text here */}
          <motion.div
            animate={controls}
            style={{
              color: mapRemainingToColor(charactersRemaining),
              display: 'inline-block',
            }}
          >
            &nbsp;{charactersRemaining}
          </motion.div>
        </div>
      )}
    </div>
  );

  return (
    <div className="input-container">
      {renderInput({
        onInput: (e: any) =>
          setValue(
            e.target.value.length > maxLength
              ? value.substring(0, maxLength)
              : e.target.value
          ),
        value,
        label: feedbackElement,
        maxLength,
      })}
    </div>
  );
};

export default InputFeedback;
