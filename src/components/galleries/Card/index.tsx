/* eslint-disable @typescript-eslint/no-unused-expressions */
import { memo, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { motion, useMotionValue } from 'framer-motion';
import { animate } from 'popmotion';

import { DrawingProps } from '../../../interfaces/DrawingProps';
import useScrollConstraints from '../utils/use-scroll-constraints';
import useWheelScroll from '../utils/use-wheel-scroll';
import { closeSpring, openSpring } from './animations';
import { ContentPlaceholder } from './ContentPlaceholder';
import { Image } from './Image';
import { Title } from './Title';

const Overlay = ({ isSelected }: { isSelected: boolean }) => (
  <motion.div
    animate={{ opacity: isSelected ? 1 : 0 }}
    className="overlay"
    initial={false}
    // layout
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    transition={{ duration: 0.2 }}
  >
    <Link replace to="/my-drawings" />
  </motion.div>
);

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
    pointOfInterest,
    backgroundColor,
    _id,
    drawingName,
    description,
    dataUrl,
  }: Props) => {
    const history = useHistory();
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    useEffect(() => {
      if (y.isAnimating()) return;

      y.start((complete) => {
        const animation = animate({
          from: y.get(),
          velocity: y.getVelocity(),
          stiffness: 400,
          damping: 40,
          onUpdate: (v: number) => y.set(v),
          onComplete: complete,
        });

        return () => animation.stop();
      });
    });

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && history.go(-1); /* replace('/my-drawings') */
    }

    function checkZIndex(latest: { y: number }) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.y < 1.01) {
        zIndex.set(0);
      }
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
      <li className="card" ref={containerRef}>
        <Overlay isSelected={isSelected} />
        <div className={`card-content-container ${isSelected && 'open'}`}>
          <motion.div
            // animate
            className="card-content"
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            // initial={false}
            // layout
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
            ref={cardRef}
            style={{ zIndex, y }}
            transition={isSelected ? openSpring : closeSpring}
          >
            <Image
              backgroundColor={backgroundColor}
              // id={_id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
            />
            <Title
              category={category}
              isSelected={isSelected}
              title={drawingName}
            />
            <ContentPlaceholder />
          </motion.div>
        </div>
        {!isSelected && (
          <Link className="card-open-link" to={`my-drawings/${_id}`} />
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Card;
