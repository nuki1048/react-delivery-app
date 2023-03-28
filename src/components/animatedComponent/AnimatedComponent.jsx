import { LazyMotion, m, domAnimation } from "framer-motion";
import React from "react";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
// eslint-disable-next-line react/prop-types
function AnimatedComponent({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
export default AnimatedComponent;
