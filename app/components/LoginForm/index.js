import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
import GithubButton from 'components/GithubButton';
import Label from 'components/Label';
import theme from 'themeConfig';
import { Field, reduxForm } from 'redux-form/immutable';
import StyledLoginForm from './style';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (
    values.username &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const Form = ({ handleSubmit, submitting, login }) => (
  <form onSubmit={handleSubmit(login)}>
    <Field
      name="username"
      type="text"
      component={Input}
      placeholder="Username or E-Mail"
    />
    <Field
      name="password"
      type="password"
      component={Input}
      placeholder="Password"
    />
    <Button content="Go" type="submit" disabled={submitting} />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  submitting: PropTypes.bool,
};

const RForm = reduxForm({
  form: 'loginform',
  validate,
})(Form);

function LoginForm(props) {
  return (
    <StyledLoginForm className="login-form" {...props}>
      <div className="login-form-container">
        <div className="login-form-head">
          <Title size={2} content="Login" />
          <GithubButton />
        </div>
        <RForm login={props.onSubmit} />
        <Label type="link" size="mini" onClick={props.onToggleForm}>
          Join Us
        </Label>
      </div>
    </StyledLoginForm>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object,
  onToggleForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  theme,
};

export default LoginForm;
