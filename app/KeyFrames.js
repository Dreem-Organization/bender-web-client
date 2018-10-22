import { keyframes } from 'styled-components';

/**
 * ----------------------------------------
 * animation slide-in-bottom
 * ----------------------------------------
 */
export const slideInBottom = keyframes`
  0% {
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

/**
 * ----------------------------------------
 * animation slide-in-right
 * ----------------------------------------
 */
export const slideInRight = keyframes`
   0% {
     transform: translateX(1000px);
     opacity: 0;
   }
   100% {
     transform: translateX(0);
     opacity: 1;
   }
`;

/**
 * ----------------------------------------
 * animation slide-in-right
 * ----------------------------------------
 */
export const slideOutRight = keyframes`
   0% {
     transform: translateX(0);
     opacity: 1;
   }
   100% {
     transform: translateX(1000px);
     opacity: 0;
   }
`;

/**
 * ----------------------------------------
 * animation shrink
 * ----------------------------------------
 */
export const shrink = keyframes`
   0% {
     transform: translateX(1000px);
     height: 70px;
     margin: 10px;
     padding: 10px;
   }
   100% {
     transform: translateX(1000px);
     height: 0px;
     margin: 0px;
     padding: 0px;
   }
`;

/**
 * ----------------------------------------
 * animation scale-in-center
 * ----------------------------------------
 */
export const scaleInCenter = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * ----------------------------------------
 * animation puff-out-center
 * ----------------------------------------
 */

export const puffOutCenter = keyframes`
  0% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    filter: blur(2px);
    opacity: 0;
  }
`;
