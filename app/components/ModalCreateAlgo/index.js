import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import theme from 'themeConfig';
import Input from 'components/Input';
import Label from 'components/Label';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Select from 'components/Select';
import {
  Field,
  FieldArray,
  reduxForm,
  getFormValues,
} from 'redux-form/immutable';
import StyledModalCreateAlgo from './style';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

const renderChildMembers = ({ fields, meta: { error } }) => (
  <div className="categorical-list">
    {fields.map((metric, index) => (
      <div className="categorical" key={`categorical-${index}`}>
        <Icon name="close" onClick={() => fields.remove(index)} />
        <Field
          name={`${metric}.category`}
          type="text"
          component={Input}
          placeholder={`Cat. ${index + 1}`}
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
        fields.push();
      }}
    />
  </div>
);

renderChildMembers.propTypes = {
  meta: PropTypes.object,
  fields: PropTypes.object,
};

const renderMembers = ({ allValues, fields, meta: { error } }) => (
  <div className="parameters-list">
    <div className="parameters-head">
      <Label content="Hyper-Parameters" type="simple" size="normal" />
      <Button
        className="spec"
        type="round"
        icon="add_circle_outline"
        color="positive"
        onClick={e => {
          e.preventDefault();
          fields.push();
        }}
      />
    </div>
    {fields.map((param, index) => (
      <div className="parameters" key={`parameters-${index}`}>
        <div className="delete-container">
          <Icon name="close" onClick={() => fields.remove(index)} />
        </div>
        <Field
          name={`${param}.hpName`}
          type="text"
          component={Input}
          placeholder={`Hyper-Parameter ${index + 1}`}
        />
        {/* <Field name={`select-${index}`} component="select">
          {[
            'Categorical',
            'Uniform',
            'Log-Uniform',
            'Normal',
            'Log-Normal',
          ].map(v => <option value={v}>{v}</option>)}
        </Field> */}
        <Field
          id={`create-algo-select-${index}`}
          name={`${param}.type`}
          selected=""
          component={Select}
          onSelectionChange={() => {}}
          values={[
            { id: '', label: 'Select type' },
            { id: 'categorical', label: 'Categorical' },
            { id: 'uniform', label: 'Uniform' },
            { id: 'loguniform', label: 'Log-Uniform' },
            { id: 'normal', label: 'Normal' },
            { id: 'lognormal', label: 'Log-Normal' },
          ]}
          label="VARIABLE TYPE"
        />
        {allValues.parameters[index] ? (
          <div>
            {allValues.parameters[index].type !== 'categorical' ? (
              <div className="non-categoricals">
                <Field
                  name={`${param}.low`}
                  type="number"
                  step="0.1"
                  component={Input}
                  placeholder="Low"
                />
                <Field
                  name={`${param}.high`}
                  type="number"
                  step="0.1"
                  component={Input}
                  placeholder="High"
                />
                <Field
                  name={`${param}.step`}
                  type="number"
                  step="0.1"
                  component={Input}
                  placeholder="Step"
                />
              </div>
            ) : (
              <div className="categoricals">
                <FieldArray
                  name={`${param}.select`}
                  component={renderChildMembers}
                />
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    ))}
  </div>
);

renderMembers.propTypes = {
  allValues: PropTypes.object,
  meta: PropTypes.object,
  fields: PropTypes.object,
};

const Form = ({ handleSubmit, submitting, onCreate, allValues }) => (
  <form onSubmit={handleSubmit(onCreate)}>
    <Label content="Name" type="simple" size="normal" />
    <Field
      name="name"
      type="text"
      component={Input}
      placeholder="Choose wisely"
    />
    <FieldArray
      allValues={allValues}
      name="parameters"
      component={renderMembers}
    />
    <Button
      className="submit"
      content="Create"
      type="submit"
      disabled={submitting}
    />
  </form>
);

Form.propTypes = {
  allValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCreate: PropTypes.func,
  submitting: PropTypes.bool,
};

let RForm = reduxForm({
  form: 'createAlgoForm',
  validate,
})(Form);

RForm = connect(state => ({
  allValues: getFormValues('createAlgoForm')(state),
}))(RForm);

function ModalCreateAlgo(props) {
  return (
    <StyledModalCreateAlgo className="modal-create-experiment" {...props}>
      <Label content="Create a new algo" type="important" size="big" />
      <RForm onCreate={props.onValidate} />
    </StyledModalCreateAlgo>
  );
}

ModalCreateAlgo.propTypes = {
  theme: PropTypes.object,
  onClose: PropTypes.func,
  onValidate: PropTypes.func,
};

ModalCreateAlgo.defaultProps = {
  theme,
};

export default ModalCreateAlgo;
