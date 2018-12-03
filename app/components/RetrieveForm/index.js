import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
// import GithubButton from 'components/GithubButton';
import Label from 'components/Label';
import { light as theme } from 'themeConfig';
import { Field, reduxForm } from 'redux-form/immutable';
import StyledRetrieveForm from './style';

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
      name="email"
      type="text"
      component={Input}
      placeholder="Your E-Mail"
    />
    <Button content="Reset" type="submit" disabled={submitting} />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  submitting: PropTypes.bool,
};

const RForm = reduxForm({
  form: 'retrieveform',
  validate,
})(Form);

function RetrieveForm(props) {
  return (
    <StyledRetrieveForm className="login-form" {...props}>
      <div className="login-form-container">
        <div className="login-form-head">
          <Title size={2} content="Reset Password" theme={props.theme} />
        </div>
        <RForm login={props.onSubmit} />
        <Label
          type="link"
          size="mini"
          onClick={() => props.onToggleForm('login')}
          theme={props.theme}
        >
          Log In
        </Label>
      </div>
    </StyledRetrieveForm>
  );
}

RetrieveForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object,
  onToggleForm: PropTypes.func.isRequired,
};

RetrieveForm.defaultProps = {
  theme,
};

export default RetrieveForm;
