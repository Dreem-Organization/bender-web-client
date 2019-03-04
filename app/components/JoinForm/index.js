/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
// import GithubButton from 'components/GithubButton';
import { light as theme } from 'themeConfig';
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
  if (!values.cgu) {
    errors.cgu = 'Required';
  }
  return errors;
};

const Form = ({ handleSubmit, submitting, login, openCGU }) => (
  <form onSubmit={handleSubmit(login)}>
    <div className="form-body">
      <div className="form-part">
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="E-Mail"
        />
      </div>
      <div className="form-part">
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
      </div>
    </div>
    <div className="form-cgu-container">
      <Label>
        <span>
          I accept the <a onClick={openCGU}>CGU</a>
        </span>
      </Label>
      <Field name="cgu" component={Input} type="checkbox" />
    </div>
    <Button content="Go" type="submit" disabled={submitting} />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  openCGU: PropTypes.func.isRequired,
  login: PropTypes.func,
  submitting: PropTypes.bool,
};

const RForm = reduxForm({
  form: 'joinform',
  validate,
})(Form);

function LoginForm(props) {
  return (
    <StyledLoginForm className="join-form" {...props}>
      <div className="join-form-container">
        <div className="join-form-head">
          <Title size={2} content="Join Form" theme={props.theme} />
          {/* <GithubButton /> */}
        </div>
        <RForm login={props.onSubmit} openCGU={props.openCGU} />
        <Label
          type="link"
          size="mini"
          onClick={() => props.onToggleForm('login')}
          theme={props.theme}
        >
          Log In
        </Label>
      </div>
    </StyledLoginForm>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object,
  openCGU: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  theme,
};

export default LoginForm;
