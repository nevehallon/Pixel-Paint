export const openSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  zIndex: 2,
};
export const closeSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 35,
  transitionEnd: { zIndex: 0 },
};
