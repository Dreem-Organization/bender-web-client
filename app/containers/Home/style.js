import styled, { css } from 'styled-components';
import { scrollIndicator } from 'KeyFrames';

const pc = css`
  overflow-x: hidden;
  min-width: 1300px;
  .home-head-container {
    padding-top: 25px;
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 200px);
    min-height: 538px;
    background-color: ${props => props.theme.main};
    flex-direction: column;
    justify-content: center;
    .powered {
      position: absolute;
      font-size: 0.8rem;
      top: 20px;
      left: 20px;
      color: rgb(253, 17, 110);
      background-color: white;
      border-radius: 20px;
      padding: 3px 10px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        background-color: rgb(253, 17, 110);
        font-weight: bold;
        color: white;
      }
    }
    .home-title {
      position: relative;
      z-index: 1;
      color: ${props => props.theme.inverted};
      &::after {
        content: 'BETA';
        position: absolute;
        font-size: 1rem;
        transform: rotate(10deg);
      }
    }
    .home-sub-title {
      position: relative;
      z-index: 1;
      font-size: 1.6rem;
      color: ${props => props.theme.inverted};
    }
    .home-head-buttons {
      position: relative;
      z-index: 1;
      .button {
        font-weight: bold;
        font-size: 1.3rem;
        background-color: ${props => props.theme.inverted};
        margin: 20px;
        padding: 0 20px 2px 20px;
      }
    }
    .home-graph-container {
      position: absolute;
      z-index: 0;
      bottom: 0;
      right: 0;
      height: 70%;
      width: 90%;
      opacity: 0.3;
      margin: 0 -150px -35px 0;
    }
    .home-form-container {
      position: relative;
      z-index: 1;
      margin-top: 40px;
    }
  }
  .home-body-container {
    position: relative;
    min-height: 100vh;
    background-color: ${props => props.theme.grey};
    display: flex;
    flex-direction: column;
    z-index: 1;
    padding-bottom: 20px;
    .home-body-top {
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .home-body-top-about {
        text-align: center;
        .text-about,
        .text-bender {
          font-size: 4rem;
          margin: 0 10px;
        }
      }
      .text-about {
        font-weight: thin;
        color: ${props => props.theme.greyDark};
      }
      .text-bender {
        color: ${props => props.theme.main};
      }
      .home-body-top-steps {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin-bottom: 20px;
        span {
          text-align: center;
          font-weight: 700;
          line-height: 1.5rem;
          width: 2rem;
          height: 2rem;
          color: ${props => props.theme.main};
          border: 3px solid ${props => props.theme.main};
          border-radius: 2rem;
        }
        .sep {
          margin: 0 10px;
          width: 20px;
          height: 0px;
          border: 1px solid ${props => props.theme.main};
        }
      }
      .home-scroll {
        position: absolute;
        top: 80px;
        &.left {
          left: 15%;
        }
        &.right {
          right: 15%;
        }
        span {
          position: absolute;
          top: 0;
          width: 24px;
          height: 24px;
          margin-left: -12px;
          border-left: 2px solid ${props => props.theme.main};
          border-bottom: 2px solid ${props => props.theme.main};
          transform: rotate(-45deg);
          animation: ${scrollIndicator} 2s infinite;
          opacity: 0;
          box-sizing: border-box;
        }
        span:nth-of-type(1) {
          animation-delay: 0s;
        }
        span:nth-of-type(2) {
          top: 16px;
          animation-delay: 0.15s;
        }
        span:nth-of-type(3) {
          top: 32px;
          animation-delay: 0.3s;
        }
      }
    }
    .home-body-main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: relative;
      .home-body-left,
      .home-body-right {
        padding-top: 100px;
      }
      .home-body-step-container {
        justify-content: center;
      }
      .home-body-left,
      .home-body-middle,
      .home-body-right {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 32%;
      }
      .home-body-middle {
        .home-body-step-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
        }
      }
    }
  }
`;

const phone = css`
  overflow-x: hidden;
  .home-head-container {
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 100px);
    background-color: ${props => props.theme.main};
    flex-direction: column;
    justify-content: center;
    .powered {
      font-size: 0.8rem;
      color: rgb(253, 17, 110);
      background-color: white;
      border-radius: 20px;
      padding: 3px 10px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        background-color: rgb(253, 17, 110);
        font-weight: bold;
        color: white;
      }
    }
    .home-title {
      font-size: 2.2rem;
      text-align: center;
      position: relative;
      z-index: 1;
      color: ${props => props.theme.inverted};
      &::after {
        content: 'BETA';
        right: 0px;
        position: absolute;
        font-size: 0.5rem;
      }
    }
    .home-sub-title {
      text-align: center;
      position: relative;
      z-index: 1;
      font-size: 1rem;
      color: ${props => props.theme.inverted};
    }
    .home-head-buttons {
      position: relative;
      z-index: 1;
      .button {
        font-weight: bold;
        font-size: 1.3rem;
        background-color: ${props => props.theme.inverted};
        margin: 20px;
        padding: 0 20px 2px 20px;
      }
    }
    .home-graph-container {
      position: absolute;
      z-index: 0;
      bottom: 0;
      right: 0;
      height: 70%;
      width: 90%;
      opacity: 0.3;
      margin: 0 -150px -35px 0;
    }
    .home-form-container {
      position: relative;
      z-index: 1;
      margin-top: 40px;
    }
  }
  .home-body-container {
    position: relative;
    min-height: 100vh;
    background-color: ${props => props.theme.grey};
    display: flex;
    flex-direction: column;
    z-index: 1;
    padding-bottom: 20px;
    .home-body-top {
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .home-body-top-about {
        text-align: center;
        .text-about,
        .text-bender {
          font-size: 2rem;
          margin: 0 10px;
        }
      }
      .text-about {
        font-weight: thin;
        color: ${props => props.theme.greyDark};
      }
      .text-bender {
        color: ${props => props.theme.main};
      }
      .home-body-top-steps {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin-bottom: 20px;
        span {
          text-align: center;
          font-weight: 700;
          line-height: 1.5rem;
          width: 2rem;
          height: 2rem;
          color: ${props => props.theme.main};
          border: 3px solid ${props => props.theme.main};
          border-radius: 2rem;
        }
        .sep {
          margin: 0 10px;
          width: 20px;
          height: 0px;
          border: 1px solid ${props => props.theme.main};
        }
      }
      .home-scroll {
        position: absolute;
        top: 10px;
        &.left {
          left: 40px;
        }
        &.right {
          right: 40px;
        }
        span {
          position: absolute;
          top: 0;
          width: 14px;
          height: 14px;
          margin-left: -7px;
          border-left: 2px solid ${props => props.theme.main};
          border-bottom: 2px solid ${props => props.theme.main};
          transform: rotate(-45deg);
          animation: ${scrollIndicator} 2s infinite;
          opacity: 0;
          box-sizing: border-box;
        }
        span:nth-of-type(1) {
          animation-delay: 0s;
        }
        span:nth-of-type(2) {
          top: 16px;
          animation-delay: 0.15s;
        }
        span:nth-of-type(3) {
          top: 32px;
          animation-delay: 0.3s;
        }
      }
    }
    .home-body-main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .home-body-step-container {
        justify-content: center;
      }
      .home-body-left,
      .home-body-middle,
      .home-body-right {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .home-body-middle {
        .black-box {
          display: none;
        }
        .home-body-step-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      }
    }
  }
`;

const HomeView = styled.div`
  @media only screen and (max-width: 1300px) {
    ${phone};
  }
  @media only screen and (min-width: 1300px) {
    ${pc};
  }
`;

export default HomeView;
