import styled from 'styled-components';
import { puffOutCenter } from 'KeyFrames';

const WaitingWrapper = styled.div`
  .page-loader {
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: white;
    &.out {
      animation: ${puffOutCenter} 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;
    }
    &.hide {
      display: none;
    }
  }
`;

export default WaitingWrapper;
