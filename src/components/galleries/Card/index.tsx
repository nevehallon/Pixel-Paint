/* eslint-disable @typescript-eslint/no-unused-expressions */
import { memo, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from 'primereact/button';

import { DrawingProps } from '../../../interfaces/DrawingProps';
import useScrollConstraints from '../utils/use-scroll-constraints';
import useWheelScroll from '../utils/use-wheel-scroll';
import {
  closeAnimation,
  closeSpring,
  openAnimation,
  openSpring,
} from './animations';
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
  ({ isSelected, onDelete, _id, drawingName, description, dataUrl }: Props) => {
    const history = useHistory();
    const y = useMotionValue(0);
    const input = [-500, 0, 500];
    const output = [0, isSelected ? 1 : 0, 0];
    const opacity = useTransform(y, input, output);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      const yValue = y.get();
      const isInBounds = yValue > dismissDistance || yValue < -dismissDistance;

      isInBounds && history.go(-1);
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
          className="overlay"
          style={{ opacity, pointerEvents: isSelected ? 'auto' : 'none' }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Link replace to="/my-drawings" />
        </motion.div>

        <motion.div
          _dragY={y}
          animate={isSelected ? openAnimation : closeAnimation}
          className={`d-card-content-container ${isSelected && 'open'}`}
          drag={isSelected ? 'y' : false}
          dragConstraints={constraints}
          onDragEnd={checkSwipeToDismiss}
          ref={cardRef}
          style={{ y }}
          transition={isSelected ? openSpring : closeSpring}
        >
          <motion.div
            animate={isSelected ? openAnimation : closeAnimation}
            className="d-card-content"
            layout
            transition={isSelected ? openSpring : closeSpring}
          >
            <Image isSelected={isSelected} src={dataUrl} />
            <Title isSelected={isSelected} title={drawingName} />
            <ContentPlaceholder description={description} />
            <span className="p-fluid d-flex justify-content-around mx-1 my-3">
              <Button
                className="mx-1 p-button-rounded p-button-text p-button-lg d-inline-block"
                icon="pi pi-pencil"
                label="Edit"
                onClick={() => history.replace(`/edit/${_id}`)}
              />
              <Button
                className="mx-1 p-button-rounded p-button-text p-button-danger p-button-lg d-inline-block"
                icon="pi pi-trash"
                label="Delete"
                onClick={() => {
                  onDelete();
                  history.replace('/my-drawings');
                }}
              />
            </span>
          </motion.div>
        </motion.div>
        {!isSelected && (
          <Link className="d-card-open-link" to={`my-drawings/${_id}`} />
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Card;
