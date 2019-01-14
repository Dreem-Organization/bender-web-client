// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import Label from 'components/Label';
import Button from 'components/Button';
import { Field, reduxForm } from 'redux-form/immutable';
import StyledModalContact from './style';

// const {
//   DOM: { textarea },
// } = React;

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.content) {
    errors.content = 'Required';
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const Form = ({ handleSubmit, submitting, onCreate }) => (
  <form onSubmit={handleSubmit(onCreate)}>
    <Label content="Email" type="simple" size="normal" />
    <Field
      name="email"
      type="email"
      component={Input}
      placeholder="The adress we should use to reply to you."
    />
    <Label content="Object" type="simple" size="normal" />
    <Field
      name="title"
      type="text"
      component={Input}
      placeholder="An explicit one"
    />
    <Label content="Content" type="simple" size="normal" />
    <Field
      name="content"
      type="text"
      component={Textarea}
      placeholder="Tell us about it."
    />
    <Button content="Send" type="submit" disabled={submitting} />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
  onCreate: PropTypes.func,
  submitting: PropTypes.bool,
};

const RForm = reduxForm({
  form: 'createExperimentForm',
  validate,
})(Form);

function ModalContact(props) {
  return (
    <StyledModalContact className="modal-create-experiment" {...props}>
      <Label
        content="Contact Us"
        type="important"
        size="big"
        theme={props.theme}
      />
      <RForm onCreate={props.onValidate} />
    </StyledModalContact>
  );
}

ModalContact.propTypes = {
  theme: PropTypes.object,
  onValidate: PropTypes.func,
};

ModalContact.defaultProps = {
  theme,
};

export default ModalContact;
