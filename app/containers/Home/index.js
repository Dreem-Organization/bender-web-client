import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import Image from 'components/Image';
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
    min-height: 150px;
    background-color: ${theme.main};
    flex-direction: column;
    .home-title {
      color: ${theme.inverted};
    }
    .home-sub-title {
      font-size: 1.6rem;
      color: ${theme.inverted};
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
        .eye {
          margin: 0 20px 5px 20px;
          position: relative;
          display: inline-block;
          height: 40px;
          width: 40px;
        }
        .pupil {
          position: absolute;
          bottom: 10px;
          left: 10px;
          width: 20px;
          height: 20px;
          background: #5eb0ef;
          transition: 0.5s;
        }
      }
    }
  }
  .home-body-container {
    position: relative;
    height: 100vh;
    background-color: ${theme.grey};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
    this.handleEyes = this.handleEyes.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.loaded();
    }, 2000);
  }

  handleEyes(event) {
    const pupil1 = document.getElementById('pupil1');
    const pupil2 = document.getElementById('pupil2');
    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');
    const x = event.screenX;
    const y = event.screenY;
    pupil1.style.left = `${(x * eye1.offsetWidth) / window.innerWidth -
      pupil1.offsetWidth / 2}px`;
    pupil1.style.top = `${(y * eye1.offsetHeight) / window.innerHeight -
      pupil1.offsetHeight / 2}px`;
    pupil2.style.left = `${(x * eye2.offsetWidth) / window.innerWidth -
      pupil2.offsetWidth / 2}px`;
    pupil2.style.top = `${(y * eye2.offsetHeight) / window.innerHeight -
      pupil2.offsetHeight / 2}px`;
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    return (
      <HomeView onMouseMove={this.handleEyes}>
        <div className="home-head-container">
          <Title className="home-title" content="Welcome to Bender" size={1} />
          <Title
            className="home-sub-title"
            content="The Free Hyper Parameters Optimizer"
            size={3}
          />
          <div className="bender-container">
            <Image src={logo} />
            <div className="eyes-container">
              <div className="eye" id="eye1">
                <div className="pupil" id="pupil1" />
              </div>
              <div className="eye" id="eye2">
                <div className="pupil" id="pupil2" />
              </div>
            </div>
          </div>
        </div>
        <div className="home-body-container">
          {this.props.from ? (
            <div className="home-form-sub-container">
              <LoginForm
                animate={!this.props.firstViewLoaded}
                onSubmit={this.props.onLogin}
                onSocialLoginSucess={this.props.onSocialLoginSucess}
                onToggleForm={this.props.toggleForm}
              />
            </div>
          ) : (
            <div className="home-form-sub-container">
              <JoinForm
                animate={!this.props.firstViewLoaded}
                onSubmit={this.props.onJoin}
                onSocialLoginSucess={this.props.onSocialLoginSucess}
                onToggleForm={this.props.toggleForm}
              />
            </div>
          )}
        </div>
      </HomeView>
    );
  }
}

Home.displayName = 'Home';
Home.propTypes = {
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
