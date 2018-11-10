import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
import GithubButton from 'components/GithubButton';
import theme from 'themeConfig';
import Label from 'components/Label';
import { Field, reduxForm } from 'redux-form/immutable';
import StyledLoginForm from './style';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!values.password1) {
    errors.password1 = 'Required';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  }
  if (
    values.password1 &&
    values.password2 &&
    values.password1 !== values.password2
  ) {
    errors.password2 = 'Passwords are not matching';
  }
  return errors;
};

const Form = ({ handleSubmit, submitting, login }) => (
  <form onSubmit={handleSubmit(login)}>
    <Field
      name="username"
      type="text"
      component={Input}
      placeholder="Username"
    />
    <Field name="email" type="email" component={Input} placeholder="E-Mail" />
    <Field
      name="firstName"
      type="text"
      component={Input}
      placeholder="First Name"
    />
    <Field
      name="lastName"
      type="text"
      component={Input}
      placeholder="Last Name"
    />
    <Field
      name="password1"
      type="password"
      component={Input}
      placeholder="Password"
    />
    <Field
      name="password2"
      type="password"
      component={Input}
      placeholder="Confirm Password"
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
  form: 'joinform',
  validate,
})(Form);

function LoginForm(props) {
  return (
    <StyledLoginForm className="login-form" {...props}>
      <div className="login-form-container">
        <div className="login-form-head">
          <Title size={2} content="Join Form" />
          <GithubButton />
        </div>
        <RForm login={props.onSubmit} />
        <Label type="link" size="mini" onClick={props.onToggleForm}>
          Log In
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
