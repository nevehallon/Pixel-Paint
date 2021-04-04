/* eslint-disable @typescript-eslint/no-unused-expressions */
import { memo, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Backdrop } from '@material-ui/core';
import {
  motion,
  MotionConfig,
  useMotionValue,
  useTransform,
} from 'framer-motion';
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
import SpeedDialTooltipOpen from './quickActions';
import { Title } from './Title';

interface Props extends DrawingProps {
  isSelected: boolean;
  [key: string]: any;
}

// Distance in pixels a user has to scroll a card down before recognizing
// a swipe-to dismiss action.
const dismissDistance = 100;

const Card = memo(
  ({
    isSelected,
    onDelete,
    onFavoriteAction,
    _id,
    drawingName,
    description,
    dataUrl,
    drawingNumber,
    painterInfo,
  }: Props) => {
    const [isOpen, setOpen] = useState(false);

    const history = useHistory();
    const y = useMotionValue(0);
    const input = [-500, 0, 500];
    const output = [0, isSelected ? 1 : 0, 0];
    const opacity = useTransform(y, input, output);

    // use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    const basePath = onDelete ? 'my-drawings' : 'my-favorites';

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
          <Link replace to={`/${basePath}`} />
        </motion.div>
        <MotionConfig transition={isSelected ? openSpring : closeSpring}>
          <motion.div
            _dragY={y}
            animate={isSelected ? openAnimation : closeAnimation}
            className={`d-card-content-container ${isSelected && 'open'}`}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDragEnd={checkSwipeToDismiss}
            ref={cardRef}
            style={{ y }}
          >
            <motion.div
              animate={isSelected ? openAnimation : closeAnimation}
              className="d-card-content"
              layout
            >
              <Backdrop
                open={isOpen}
                style={{ zIndex: 1, position: 'absolute' }}
              />

              <Image isSelected={isSelected} src={dataUrl} />
              <Title isSelected={isSelected} title={drawingName} />
              <ContentPlaceholder
                description={description}
                painterInfo={onDelete ? '' : painterInfo}
              />
              {onDelete && (
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
              )}
            </motion.div>
          </motion.div>
        </MotionConfig>
        <div>
          {!isSelected && (
            <Link className="d-card-open-link" to={`${basePath}/${_id}`} />
          )}
          {!isSelected && (
            <motion.div
              animate={{
                opacity: 1,
                scale: isOpen ? 0.85 : 0.75,
              }}
              className="speedDial-container"
              initial={{
                opacity: 0,
                scale: 0.2,
                transformOrigin: '95%',
              }}
              transition={{
                delay: isOpen ? 0 : 0.7,
                type: 'spring',
                stiffness: 150,
                damping: 11,
              }}
            >
              <SpeedDialTooltipOpen
                basePath={basePath}
                dataUrl={dataUrl}
                drawingNumber={drawingNumber}
                emitClose={() => setOpen(false)}
                emitFavoriteAction={onFavoriteAction}
                emitOpen={() => setOpen(true)}
                history={history}
                id={_id}
              />
            </motion.div>
          )}
        </div>
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Card;
