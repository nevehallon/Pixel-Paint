/* eslint-disable @typescript-eslint/no-unused-expressions */
import { memo, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { animate } from 'popmotion';

import { DrawingProps } from '../../../interfaces/DrawingProps';
import useScrollConstraints from '../utils/use-scroll-constraints';
import useWheelScroll from '../utils/use-wheel-scroll';
import { closeSpring, openSpring } from './animations';
import { ContentPlaceholder } from './ContentPlaceholder';
import { Image } from './Image';
import { Title } from './Title';

interface Props extends DrawingProps {
  isSelected: boolean;
  [key: string]: any;
}

// Distance in pixels a user has to scroll a card down before we recognize
// a swipe-to dismiss action.
const dismissDistance = 150;

const Card = memo(
  ({
    isSelected,
    category,
    backgroundColor,
    _id,
    drawingName,
    description,
    dataUrl,
  }: Props) => {
    const history = useHistory();
    const y = useMotionValue(0);
    const input = [-500, 0, 500];
    const output = [0, isSelected ? 1 : 0, 0];
    const opacity = useTransform(y, input, output);

    // useEffect(() => {
    //   if (y.isAnimating()) return;

    //   y.start((complete) => {
    //     const animation = animate({
    //       from: y.get(),
    //       velocity: y.getVelocity(),
    //       stiffness: 400,
    //       damping: 40,
    //       onUpdate: (v: number) => y.set(v),
    //       onComplete: complete,
    //     });

    //     return () => animation.stop();
    //   });
    // });

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      const yValue = y.get();
      const isInBounds = yValue > dismissDistance || yValue < -dismissDistance;

      isInBounds && history.go(-1); /* replace('/my-drawings') */
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );

    return (
      <li className="d-card" ref={containerRef}>
        <motion.div
          // animate={{ opacity: isSelected ? 1 : 0 }}
          className="overlay"
          style={{ opacity, pointerEvents: isSelected ? 'auto' : 'none' }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Link replace to="/my-drawings" />
        </motion.div>

        <AnimateSharedLayout type="crossfade">
          <motion.div
            animate={isSelected ? openSpring : closeSpring}
            className={`d-card-content-container ${isSelected && 'open'}`}
            layout="position"
            transition={isSelected ? openSpring : closeSpring}
          >
            <motion.div
              className="d-card-content"
              drag={isSelected ? 'y' : false}
              dragConstraints={constraints}
              layout
              // layoutId={`d-card-content-${_id}`}
              onDragEnd={checkSwipeToDismiss}
              onViewportBoxUpdate={(_, delta) => {
                y.set(delta.y.translate);
              }}
              ref={cardRef}
              style={{ y }}
              transition={isSelected ? openSpring : closeSpring}
            >
              <Image
                // backgroundColor={backgroundColor}
                id={_id}
                isSelected={isSelected}
                src={dataUrl}
                // y={y}
              />
              <Title
                category={category}
                id={_id}
                isSelected={isSelected}
                title={drawingName}
              />
              <ContentPlaceholder description={description} id={_id} />
            </motion.div>
          </motion.div>
        </AnimateSharedLayout>
        {!isSelected && (
          <Link className="d-card-open-link" to={`my-drawings/${_id}`} />
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Card;
