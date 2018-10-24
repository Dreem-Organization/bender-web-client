import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import Image from 'components/Image';
import Button from 'components/Button';
import logo from 'images/white.png';
import LoginForm from 'components/LoginForm';
import JoinForm from 'components/JoinForm';
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
import {
  verifyUser,
  firstViewLoaded,
  socialLogin,
} from 'containers/App/actions';
import theme from 'themeConfig';
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import homeReducer from './reducer';
import { makeSelectForm } from './selectors';
import { login, join, toggleForm } from './actions';

const HomeView = styled.div`
  .home-head-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 50vh;
    min-height: 300px;
    background-color: ${theme.main};
    flex-direction: column;
    .home-title {
      color: ${theme.inverted};
    }
    .home-sub-title {
      font-size: 1.6rem;
      color: ${theme.inverted};
    }
    .home-head-buttons {
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
      img {
        width: 100%;
        height: auto;
        opacity: 0.3;
      }
      .eyes-container {
        position: absolute;
      }
    }
  }
  .home-body-container {
    position: relative;
    height: 100vh;
    background-color: ${theme.grey};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    .home-body-form-container {
      margin-top: -50px;
      opacity: 1;
      transition: 0.3s;
      &.hide {
        opacity: 0;
      }
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleLogin: true,
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
      window.scrollY === head.clientHeight
    ) {
      this.setState({ visibleLogin: false });
    } else {
      this.setState({ visibleLogin: true });
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
    return (
      <HomeView onMouseMove={this.handleEyes}>
        <div className="home-head-container" id="head">
          <Title className="home-title" content="Welcome to Bender" size={1} />
          <Title
            className="home-sub-title"
            content="The Free Hyper Parameters Optimizer"
            size={3}
          />
          <div className="home-head-buttons">
            <Button
              content="DOCS"
              onClick={() => this.props.history.push('eat-my-shiny-metal-doc')}
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
        </div>
        <div className="home-body-container">
          <div
            className={`home-body-form-container ${
              this.state.visibleLogin ? '' : 'hide'
            }`}
          >
            {this.props.from ? (
              <div className="home-body-form-sub-container">
                <LoginForm
                  animate={!this.props.firstViewLoaded}
                  onSubmit={this.props.onLogin}
                  onSocialLoginSucess={this.props.onSocialLoginSucess}
                  onToggleForm={this.props.toggleForm}
                />
              </div>
            ) : (
              <div className="home-body-form-sub-container">
                <JoinForm
                  animate={!this.props.firstViewLoaded}
                  onSubmit={this.props.onJoin}
                  onSocialLoginSucess={this.props.onSocialLoginSucess}
                  onToggleForm={this.props.toggleForm}
                />
              </div>
            )}
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
  verifyUser: PropTypes.func,
  loaded: PropTypes.func,
  firstViewLoaded: PropTypes.bool,
  onSocialLoginSucess: PropTypes.func,
  toggleForm: PropTypes.func,
  from: PropTypes.bool,
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
          username: data.form.username,
          firstName: data.form.firstName,
          lastName: data.form.lastName,
          email: data.form.email,
          password1: data.form.password1,
          password2: data.form.password2,
          history: data.history,
        }),
      ),
    onSocialLoginSucess: data => dispatch(socialLogin(data)),
    loaded: () => dispatch(firstViewLoaded()),
    verifyUser: token => dispatch(verifyUser(token)),
    toggleForm: () => dispatch(toggleForm()),
    // onLogin: data => console.log(data),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  firstViewLoaded: makeSelectFirstViewLoaded(),
  from: makeSelectForm(),
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
