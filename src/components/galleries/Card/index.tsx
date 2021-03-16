/* eslint-disable @typescript-eslint/no-unused-expressions */
import { memo, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { motion, useMotionValue, useViewportScroll } from 'framer-motion';

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

// Distance in pixels a user has to scroll a card down before we recognise
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
    const { scrollY } = useViewportScroll();

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    useEffect(
      () =>
        y.onChange((latest) => {
          console.log(latest);
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && history.replace('/my-drawings');
      // console.log(y.get());
    }

    function checkZIndex(latest: { scaleX: number }) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
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
            animate
            className="card-content"
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            initial={false}
            layout
            onDrag={(event, info) => {
              // console.log(info.delta.y);
              // y.set(y.get() + info.delta.y);
              checkSwipeToDismiss();
            }}
            // onDragEnd={() => y.set(0)}
            onUpdate={(latest) => {
              checkZIndex(latest as any);
            }}
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
  (prev, next) =>
    // console.log(prev.isSelected, next.isSelected);

    prev.isSelected === next.isSelected
);

export default Card;
