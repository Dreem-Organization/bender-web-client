import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import Label from 'components/Label';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import LocalStorageManager from 'utils/localStorageManager';
import { verifyUser } from 'containers/App/actions';
import { validate } from './actions';
import saga from './saga';

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
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    return (
      <ValidationView>
        <Title className="head" content="Almost a Bender user !" size={1} />
        {this.props.match.params.code === 'mail' ? (
          <Label content="Check the link we sent you on your e-mail address ! Click on it and we're good." />
        ) : (
          <Button
            content="ACTIVATE MY ACCOUNT"
            onClick={() =>
              this.props.onValidate(this.props.match.params.code, () =>
                this.props.history.push('/login'),
              )
            }
          />
        )}
      </ValidationView>
    );
  }
}

Validation.displayName = 'Validation';
Validation.propTypes = {
  status: PropTypes.string,
  verifyUser: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  onValidate: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onValidate: (key, callBack) => dispatch(validate(key, callBack)),
    verifyUser: token => dispatch(verifyUser(token)),
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Validation);
