import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import Image from 'components/Image';
import Button from 'components/Button';
import Label from 'components/Label';
import HomeStepCard from 'components/HomeStepCard';
import BlackBox from 'components/BlackBox';
import logo from 'images/white.png';
import bender from 'images/logo.png';
import mathlab from 'images/mathlab.png';
import python from 'images/py.png';
import screen from 'images/screen.png';
import r from 'images/r.png';
import FakeChart from 'components/FakeChart';
import LoginForm from 'components/LoginForm';
import RetrieveForm from 'components/RetrieveForm';
import JoinForm from 'components/JoinForm';
import { slideInBottom, scrollIndicator } from 'KeyFrames';
import {
  makeSelectStatus,
  makeSelectFirstViewLoaded,
} from 'containers/App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/App/saga';
import reducer from 'containers/App/reducer';
import LocalStorageManager from 'utils/localStorageManager';
import { verifyUser, firstViewLoaded } from 'containers/App/actions';
import { light as theme } from 'themeConfig';
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import homeReducer from './reducer';
import { makeSelectForm } from './selectors';
import { login, join, toggleForm, reset } from './actions';

const HomeView = styled.div`
  .home-head-container {
    padding-top: 50px;
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    height: calc(100vh - 200px);
    min-height: 690px;
    background-color: ${theme.main};
    flex-direction: column;
    .home-title {
      position: relative;
      z-index: 1;
      color: ${theme.inverted};
    }
    .home-sub-title {
      position: relative;
      z-index: 1;
      font-size: 1.6rem;
      color: ${theme.inverted};
    }
    .home-head-buttons {
      position: relative;
      z-index: 1;
      .button {
        font-weight: bold;
        font-size: 1.3rem;
        background-color: ${theme.inverted};
        margin: 20px;
        padding: 0 20px 2px 20px;
      }
    }
    .bender-container {
      position: absolute;
      bottom: -2px;
      left: 50px;
      width: 250px;
      height: 250px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      animation: ${slideInBottom} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      img {
        width: 100%;
        height: auto;
        opacity: 0.3;
      }
      .eyes-container {
        position: absolute;
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
    height: 100vh;
    background-color: ${theme.grey};
    display: flex;
    flex-direction: column;
    z-index: 1;
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
        color: ${theme.greyDark};
      }
      .text-bender {
        color: ${theme.main};
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
          color: ${theme.main};
          border: 3px solid ${theme.main};
          border-radius: 2rem;
        }
        .sep {
          margin: 0 10px;
          width: 20px;
          height: 0px;
          border: 1px solid ${theme.main};
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
          border-left: 2px solid ${theme.main};
          border-bottom: 2px solid ${theme.main};
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
      align-items: center;
      position: relative;
      .home-body-left,
      .home-body-step-container,
      .home-body-right {
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
        flex: 1;
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

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleScroll: true,
    };
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
    this.handleEyes = this.handleEyes.bind(this);
    this.draweyes = this.draweyes.bind(this);
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollToElement);
    setTimeout(() => {
      this.props.loaded();
    }, 2000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollToElement);
  }
  handleScrollToElement() {
    const head = document.getElementById('head');
    if (
      this.props.status !== 'waiting' &&
      window.scrollY > head.clientHeight / 2
    ) {
      this.setState({ visibleScroll: false });
    } else {
      this.setState({ visibleScroll: true });
    }
  }

  componentDidUpdate() {
    if (this.props.status !== 'waiting') {
      this.c = document.getElementById('canvas');
      if (this.c) {
        this.ctx = this.c.getContext('2d');
        this.centerX = this.c.width / 2;
        this.centerY = this.c.height / 2;
        this.radius = 100;
        this.radiusEye = 10;
        this.faceCenterX = this.centerX;
        this.faceCenterY = this.c.height - 20;
        this.radiusEyeIn = 10;
        this.eyeYPosition = this.faceCenterY - 5;
        this.reyedx = this.faceCenterX + this.radiusEyeIn / 2 + 35;
        this.reyedy = this.eyeYPosition;
        this.leyedx = this.faceCenterX - this.radiusEyeIn / 2 - 35;
        this.leyedy = this.eyeYPosition;
        this.eyesgap = 15;
        this.draweyes(this.leyedx, this.leyedy, this.reyedx, this.reyedy);
      }
    }
  }

  draweyes(lEyeX, lEyeY, rEyeX, rEyeY) {
    this.ctx.beginPath();
    this.ctx.arc(rEyeX, rEyeY, this.radiusEyeIn, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#5eb0ef';
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(lEyeX, lEyeY, this.radiusEyeIn, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#5eb0ef';
    this.ctx.fill();
  }

  handleEyes(e) {
    this.c = document.getElementById('canvas');
    this.ctx = this.c.getContext('2d');
    const head = document.getElementById('head');
    const mouseX = e.pageX - (this.centerX + 50);
    const mouseY = e.pageY - (head.clientHeight - 20);
    const ratioX = Math.abs(mouseX) / (Math.abs(mouseX) + Math.abs(mouseY));
    const ratioY = Math.abs(mouseY) / (Math.abs(mouseX) + Math.abs(mouseY));
    let reyedxafter = 0;
    let reyedyafter = 0;
    let leyedxafter = 0;
    let leyedyafter = 0;
    if (mouseX > 0) {
      reyedxafter = this.reyedx + ratioX * this.eyesgap;
    } else {
      reyedxafter = this.reyedx - ratioX * this.eyesgap;
    }
    if (mouseY > 0) {
      reyedyafter = this.reyedy + ratioY * this.eyesgap;
    } else {
      reyedyafter = this.reyedy - ratioY * this.eyesgap;
    }
    if (mouseX > 0) {
      leyedxafter = this.leyedx + ratioX * this.eyesgap;
    } else {
      leyedxafter = this.leyedx - ratioX * this.eyesgap;
    }
    if (mouseY > 0) {
      leyedyafter = this.leyedy + ratioY * this.eyesgap;
    } else {
      leyedyafter = this.leyedy - ratioY * this.eyesgap;
    }
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.draweyes(leyedxafter, leyedyafter, reyedxafter, reyedyafter);
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    let form = '';

    console.log(this.props.form);
    switch (this.props.form) {
      case 'login':
        form = (
          <div className="home-form-sub-container">
            <LoginForm
              animate={!this.props.firstViewLoaded}
              onSubmit={this.props.onLogin}
              onSocialLoginSucess={this.props.onSocialLoginSucess}
              onToggleForm={this.props.toggleForm}
            />
          </div>
        );
        break;
      case 'join':
        form = (
          <div className="home-form-sub-container">
            <JoinForm
              animate={!this.props.firstViewLoaded}
              onSubmit={data =>
                this.props.onJoin({ history: this.props.history, ...data })
              }
              onSocialLoginSucess={this.props.onSocialLoginSucess}
              onToggleForm={this.props.toggleForm}
            />
          </div>
        );
        break;
      default:
        form = (
          <div className="home-form-sub-container">
            <RetrieveForm
              animate={!this.props.firstViewLoaded}
              onSubmit={data =>
                this.props.onReset({
                  callback: () => this.props.toggleForm('login'),
                  ...data,
                })
              }
              onToggleForm={this.props.toggleForm}
            />
          </div>
        );
    }
    return (
      <HomeView onMouseMove={this.handleEyes}>
        <div className="home-head-container" id="head">
          <Title className="home-title" content="Welcome to Bender" size={1} />
          <Title
            className="home-sub-title"
            content="Hyper-Parameters Optimization"
            size={3}
          />
          <div className="home-head-buttons">
            <Button
              content="DOCS"
              onClick={() =>
                window.open('https://bender-optimizer.readthedocs.io', '_blank')
              }
            />
            <Button
              content="DEMO"
              onClick={() => this.props.history.push('demo')}
            />
          </div>
          <div className="bender-container">
            <Image src={logo} />
            <div className="eyes-container">
              <canvas id="canvas" width={250} height={250} />
            </div>
          </div>
          <div className="home-graph-container">
            <FakeChart />
          </div>
          <div className="home-form-container">{form}</div>
        </div>
        <div className="home-body-container">
          <div className="home-body-top">
            <div className="home-body-top-about">
              <span className="text-about">About</span>
              <span className="text-bender">Bender</span>
            </div>
            <div className="home-body-top-steps">
              <span>1</span>
              <div className="sep" />
              <span>2</span>
              <div className="sep" />
              <span>3</span>
            </div>
            <Label
              content="3 Steps To Optimize Your Blackbox Algorithm"
              size="sandard"
            />
            {this.state.visibleScroll ? (
              <div className="home-scroll left">
                <span />
                <span />
                <span />
              </div>
            ) : (
              ''
            )}
            {this.state.visibleScroll ? (
              <div className="home-scroll right">
                <span />
                <span />
                <span />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="home-body-main">
            <div className="home-body-left">
              <HomeStepCard
                number="1"
                title="Plug Bender into your favorite solution"
                desc="We support a variety of existing softwares, but dont hesitate to make some suggestions : we are constantly improving Bender !"
              >
                <Image
                  className="image grey"
                  src={mathlab}
                  height="50px"
                  width="auto"
                />
                <Image src={python} height="50px" width="auto" />
                <Image
                  className="image grey"
                  src={r}
                  height="50px"
                  width="auto"
                />
              </HomeStepCard>
            </div>
            <div className="home-body-middle">
              <BlackBox />
              <div className="home-body-step-container">
                <HomeStepCard
                  number="2"
                  title="Feed Bender your results or ask him some new ones to try"
                  desc="The more you feed Bender with pairs of [Hyper-Parameters / Alrorithm Results], the more he will become efficient."
                >
                  <Image src={bender} height="50px" width="auto" />
                </HomeStepCard>
              </div>
            </div>
            <div className="home-body-right">
              <HomeStepCard
                number="3"
                title="Use the web client to explore the results and get the best set of Hyper Parameters"
                desc=""
              >
                <Image src={screen} height="250px" width="auto" />
              </HomeStepCard>
            </div>
          </div>
        </div>
      </HomeView>
    );
  }
}

Home.displayName = 'Home';
Home.propTypes = {
  history: PropTypes.object,
  status: PropTypes.string,
  onLogin: PropTypes.func,
  onJoin: PropTypes.func,
  onReset: PropTypes.func,
  verifyUser: PropTypes.func,
  loaded: PropTypes.func,
  firstViewLoaded: PropTypes.bool,
  onSocialLoginSucess: PropTypes.func,
  toggleForm: PropTypes.func,
  form: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    // Export event properties to bypass event pooling warning
    onLogin: data =>
      dispatch(
        login({
          username: data.username,
          password: data.password,
        }),
      ),
    onJoin: data =>
      dispatch(
        join({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password1: data.password1,
          password2: data.password2,
          history: data.history,
        }),
      ),
    onReset: data => dispatch(reset(data)),
    loaded: () => dispatch(firstViewLoaded()),
    verifyUser: token => dispatch(verifyUser(token)),
    toggleForm: data => dispatch(toggleForm(data)),
    // onLogin: data => console.log(data),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  firstViewLoaded: makeSelectFirstViewLoaded(),
  form: makeSelectForm(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer2 = injectReducer({ key: 'home', reducer: homeReducer });
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer2,
  withReducer,
  withSaga,
  withConnect,
)(Home);
