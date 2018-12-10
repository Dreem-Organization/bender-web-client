import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Label from 'components/Label';
import Title from 'components/Title';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import LocalStorageManager from 'utils/localStorageManager';
import { verifyUser } from 'containers/App/actions';
import { makeSelectStatus, makeSelectJwt } from 'containers/App/selectors';
import Input from 'components/Input';
import { Field, reduxForm } from 'redux-form/immutable';
import { reset } from './actions';
import saga from './saga';

const validate = values => {
  const errors = {};
  if (!values.password1) {
    errors.password1 = 'Required';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  }
  if (values.password1 !== values.password2) {
    errors.password2 = 'Must be the same';
  }
  return errors;
};

const Form = ({ handleSubmit, submitting, mySubmit }) => (
  <form onSubmit={handleSubmit(mySubmit)}>
    <Label content="New Password" />
    <Field
      name="password1"
      type="password"
      component={Input}
      placeholder="Just try to remeber it..."
    />
    <Label content="Again" />
    <Field
      name="password2"
      type="password"
      component={Input}
      placeholder="Tell me you did not already forget..."
    />
    <Button content="RESET" type="submit" disabled={submitting} />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  mySubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

const RForm = reduxForm({
  form: 'newpassform',
  validate,
})(Form);

const ValidationView = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .head {
    margin-bottom: 40px;
  }
  form {
    width: 400px;
    .input,
    .button {
      width: 100%;
    }
    .label,
    .button {
      display: block;
      margin-top: 20px;
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Validation extends React.PureComponent {
  constructor(props) {
    super(props);
    const token = LocalStorageManager.getUser();
    this.props.verifyUser(token);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.onValidate(
      this.props.match.params.uid,
      this.props.match.params.token,
      data.password1,
      data.password2,
      () => this.props.history.push('/'),
    );
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    } else if (this.props.status === 'waiting') {
      return <div>Loading...</div>;
    }
    return (
      <ValidationView>
        <Title
          className="head"
          content="Almost there : just type your new password"
          size={1}
        />
        <RForm mySubmit={this.handleSubmit} />
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
    onValidate: (uid, token, password1, password2, callBack) =>
      dispatch(reset(uid, token, password1, password2, callBack)),
    verifyUser: token => dispatch(verifyUser(token)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  jwt: makeSelectJwt(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'reset', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Validation);
