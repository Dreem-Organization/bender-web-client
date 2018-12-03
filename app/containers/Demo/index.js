import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectStatus } from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import { socialLogin } from 'containers/App/actions';
import saga from 'containers/App/saga';

const ValidationView = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .head {
    margin-bottom: 40px;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Validation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.socialLogin(this.props.location.search.split('=')[1]);
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    }
    return (
      <ValidationView>
        <Title className="head" content="LOGGING-IN..." size={1} />
      </ValidationView>
    );
  }
}

Validation.displayName = 'Validation';
Validation.propTypes = {
  status: PropTypes.string,
  socialLogin: PropTypes.func,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    socialLogin: data => dispatch(socialLogin(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Validation);
