import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import Title from 'components/Title';
import Image from 'components/Image';
import Button from 'components/Button';
import Label from 'components/Label';
import HomeStepCard from 'components/HomeStepCard';
import BlackBox from 'components/BlackBox';
import BenderEyes from 'components/BenderEyes';
import bender from 'images/logo.png';
import mathlab from 'images/mathlab.png';
import python from 'images/py.png';
import screen from 'images/screen.png';
import r from 'images/r.png';
import FakeChart from 'components/FakeChart';
import Cgu from 'components/Cgu';
import LoginForm from 'components/LoginForm';
import RetrieveForm from 'components/RetrieveForm';
import JoinForm from 'components/JoinForm';
import {
  makeSelectStatus,
  makeSelectFirstViewLoaded,
  makeSelectCookiesUsage,
} from 'containers/App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import sagaApp from 'containers/App/saga';
import reducerApp from 'containers/App/reducer';
import LocalStorageManager from 'utils/localStorageManager';
import {
  verifyUser,
  firstViewLoaded,
  validCookiesUsage,
  loadCookiesPermissions,
} from 'containers/App/actions';
import { light as theme } from 'themeConfig';
import ReactGA from 'react-ga';
import reducer from './reducer';
import { makeSelectForm } from './selectors';
import { login, join, toggleForm, reset } from './actions';
import HomeView from './style';

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleScroll: true,
      statusCGU: false,
    };
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
    this.handleToggleCgu = this.handleToggleCgu.bind(this);
    ReactGA.initialize('UA-130808639-1');
    ReactGA.pageview('homepage');
  }

  componentDidMount() {
    this.props.loadCookiesPermissions();
    window.addEventListener('scroll', this.handleScrollToElement);
    setTimeout(() => {
      this.props.loaded();
    }, 2000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollToElement);
  }

  handleToggleCgu() {
    this.setState({ ...this.state, statusCGU: !this.state.statusCGU });
  }

  handleScrollToElement() {
    const head = document.getElementById('head');
    if (
      this.props.status !== 'waiting' &&
      window.scrollY > head.clientHeight / 2
    ) {
      this.setState({ ...this.state, visibleScroll: false });
    } else {
      this.setState({ ...this.state, visibleScroll: true });
    }
  }

  handleDreemRedirect() {
    window.open('https://dreem.com/', '_blank');
    ReactGA.event({
      category: 'Redirect',
      action: 'Visit Dreem Website',
    });
  }

  handleDocRedirect() {
    window.open('https://bender-optimizer.readthedocs.io', '_blank');
    ReactGA.event({
      category: 'Redirect',
      action: 'Visit ReadTheDocs Website',
    });
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    let form = '';

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
              openCGU={this.handleToggleCgu}
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
      <HomeView theme={theme}>
        {this.props.cookiesUsage === false ? (
          <div className="cookies-header-container">
            <div className="cookies-header">
              We use cookies.<button onClick={this.props.validCookiesUsage}>
                ACCEPT THE ABOVE MENTION
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        <Cgu onToggleCgu={this.handleToggleCgu} isOpen={this.state.statusCGU} />
        <div className="home-head-container" id="head">
          <Title className="home-title" content="Welcome to Bender" size={1} />
          <Title
            className="home-sub-title"
            content="Hyperparameters Optimization"
            size={3}
          />
          <div className="home-head-buttons">
            <Button content="DOCS" onClick={this.handleDocRedirect} />
            {/* <Button
              content="DEMO"
              onClick={() => this.props.history.push('demo')}
            /> */}
          </div>
          <BenderEyes />
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
                <Image className="image" src={r} height="50px" width="auto" />
              </HomeStepCard>
            </div>
            <div className="home-body-middle">
              <BlackBox />
              <div className="home-body-step-container">
                <HomeStepCard
                  number="2"
                  title="Feed Bender your results or ask him some new ones to try"
                  desc="The more you feed Bender with pairs of [Hyperparameters / Algorithm Results], the more he will become efficient."
                >
                  <Image src={bender} height="50px" width="auto" />
                </HomeStepCard>
              </div>
            </div>
            <div className="home-body-right">
              <HomeStepCard
                number="3"
                title="Use the web client to explore the results and get the best set of Hyperparameters"
                desc=""
              >
                <Image
                  className="image fit"
                  src={screen}
                  height="250px"
                  width="auto"
                />
              </HomeStepCard>
            </div>
          </div>
          <span className="powered" onClick={this.handleDreemRedirect}>
            Powered by dreem
          </span>
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
  validCookiesUsage: PropTypes.func,
  loadCookiesPermissions: PropTypes.func,
  cookiesUsage: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    // Export event properties to bypass event pooling warning
    onLogin: data => {
      ReactGA.event({
        category: 'User',
        action: 'Login',
      });
      dispatch(
        login({
          username: data.username,
          password: data.password,
        }),
      );
    },
    onJoin: data => {
      ReactGA.event({
        category: 'User',
        action: 'Join',
      });
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
      );
    },
    onReset: data => dispatch(reset(data)),
    loaded: () => dispatch(firstViewLoaded()),
    verifyUser: token => dispatch(verifyUser(token)),
    toggleForm: data => dispatch(toggleForm(data)),
    validCookiesUsage: () => dispatch(validCookiesUsage()),
    loadCookiesPermissions: () => dispatch(loadCookiesPermissions()),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  firstViewLoaded: makeSelectFirstViewLoaded(),
  form: makeSelectForm(),
  cookiesUsage: makeSelectCookiesUsage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withReducerApp = injectReducer({ key: 'global', reducer: reducerApp });
const withSagaApp = injectSaga({ key: 'global', saga: sagaApp });

export default compose(
  withReducer,
  withReducerApp,
  withSagaApp,
  withConnect,
)(Home);
