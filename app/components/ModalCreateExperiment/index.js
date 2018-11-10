// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Input from 'components/Input';
import Label from 'components/Label';
import Icon from 'components/Icon';
import Switch from 'components/Switch';
import Button from 'components/Button';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import StyledModalCreateExperiment from './style';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  errors.metrics = [];
  if (values.metrics) {
    values.metrics.forEach(m => {
      const childError = {};
      if (m && !m.type) {
        childError.type = 'Required';
      }
      if (m && !m.metric_name) {
        childError.metric_name = 'Required';
      }
      errors.metrics.push(childError);
    });
  }
  if (!values.dataset) {
    errors.dataset = 'Required';
  }
  return errors;
};

class renderMembers extends React.PureComponent {
  componentWillMount() {
    const { fields } = this.props;
    if (!fields.length) fields.push();
  }

  render() {
    return (
      <div className="metrics-list">
        {this.props.fields.map((metric, index) => (
          <div className="metric" key={`metric-${index}`}>
            <Icon
              name="close"
              onClick={() => this.props.fields.remove(index)}
            />
            <Field
              name={`${metric}.metric_name`}
              type="text"
              component={Input}
              placeholder={`Metric ${index + 1}`}
            />
            <Field
              name={`${metric}.type`}
              type="text"
              component={Switch}
              options={[
                { label: 'MAXIMIZE', value: 'reward' },
                { label: 'MINIMIZE', value: 'loss' },
              ]}
            />
          </div>
        ))}
        <Button
          className="spec"
          type="round"
          icon="add_circle_outline"
          color="positive"
          onClick={e => {
            e.preventDefault();
            this.props.fields.push();
          }}
        />
      </div>
    );
  }
}

renderMembers.propTypes = {
  fields: PropTypes.object,
};

const Form = ({ handleSubmit, submitting, onCreate }) => (
  <form onSubmit={handleSubmit(onCreate)}>
    <Label content="Name" type="simple" size="normal" />
    <Field
      name="name"
      type="text"
      component={Input}
      placeholder="Be creative"
    />
    <Label content="Description" type="simple" size="normal" />
    <Field
      name="description"
      type="text"
      component={Input}
      placeholder="Make it short and usefull"
    />
    <Label content="Metrics" type="simple" size="normal" />
    <FieldArray name="metrics" component={renderMembers} />
    <Label content="Dataset Name" type="simple" size="normal" />
    <Field
      name="dataset"
      type="text"
      component={Input}
      placeholder="'test.csv' is ugly..."
    />
    <Button content="Create" type="submit" disabled={submitting} />
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

function ModalCreateExperiment(props) {
  return (
    <StyledModalCreateExperiment className="modal-create-experiment" {...props}>
      <Label content="Create a new experiment" type="important" size="big" />
      <RForm onCreate={props.onValidate} />
    </StyledModalCreateExperiment>
  );
}

ModalCreateExperiment.propTypes = {
  theme: PropTypes.object,
  onValidate: PropTypes.func,
};

ModalCreateExperiment.defaultProps = {
  theme,
};

export default ModalCreateExperiment;
