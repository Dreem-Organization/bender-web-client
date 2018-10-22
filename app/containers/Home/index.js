import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
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
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import homeReducer from './reducer';
import { makeSelectForm } from './selectors';
import { login, join, toggleForm } from './actions';

const HomeView = styled.div`
  .home-head-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;
    min-height: 150px;
    .home-sub-head {
      .title {
        margin: 10px;
        transition: 0.2s;
        &:hover {
          cursor: pointer;
          color: ${theme.light};
          transform: scale(1.05);
        }
      }
      display: flex;
      justify-content: center;
    }
  }
  .home-middle-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 25vh;
    min-height: 150px;
    position: relative;
    z-index: 2;
    .home-form-container {
      .home-form-sub-container {
        position: relative;
        text-align: center;
      }
    }
  }
  .home-body-container {
    position: relative;
    height: 100vh;
    background-color: ${theme.main};
    z-index: 1;
    .home-body-back {
      position: absolute;
      z-index: 1;
      height: 100px;
      top: -100px;
      width: 100%;
      background: linear-gradient(
        to left bottom,
        #f4f1f1 50%,
        ${theme.main} 50%
      );
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.loaded();
    }, 2000);
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    return (
      <HomeView>
        <ParallaxProvider>
          <div className="home-head-container">
            <Parallax
              className="custom-class"
              offsetYMax={40}
              offsetYMin={-100}
              slowerScrollRate
              tag="figure"
            >
              <Title
                className="home-title"
                content="Welcome to Bender"
                size={1}
              />
              <div className="home-sub-head">
                <Link
                  to="/eat-my-shiny-metal-docs"
                  href="/eat-my-shiny-metal-docs"
                >
                  <Title content="EAT DOCS" size={2} />
                </Link>
                <Link to="/demo" href="/eat-my-shiny-metal-docs">
                  <Title content="SEE DEMO" size={2} />
                </Link>
              </div>
            </Parallax>
          </div>
          <div className="home-middle-container">
            <div className="home-form-container">
              <Parallax
                className="custom-class"
                offsetYMax={300}
                offsetYMin={-200}
                tag="figure"
              >
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
              </Parallax>
            </div>
          </div>
          <div className="home-body-container">To come</div>
        </ParallaxProvider>
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
