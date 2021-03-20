import {
  AnimationControls,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion';

export const openSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};
export const closeSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};
export const openAnimation:
  | AnimationControls
  | TargetAndTransition
  | VariantLabels = {
  zIndex: 2,
};
export const closeAnimation:
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | { [key: string]: any } = {
  stiffness: 300,
  transitionEnd: { zIndex: 0 },
};
