import {
  AnimationControls,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion';

export const openSpring:
  | Transition
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | boolean
  | any = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  zIndex: 2,
};
export const closeSpring:
  | Transition
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | boolean
  | any = {
  type: 'spring',
  stiffness: 300,
  damping: 35,
  transitionEnd: { zIndex: 0 },
};
