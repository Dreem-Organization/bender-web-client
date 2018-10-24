// /* eslint-disable */
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
  errors.parameters = [];
  if (values.parameters) {
    values.parameters.forEach(p => {
      let error = {};
      if (!p) {
        error = { hpName: 'Required' };
      } else {
        if (!p.hpName) {
          error = { hpName: 'Required', type: 'Must define a type' };
        }
        if (!p.type) {
          error = { type: 'Must define a type' };
        }
        error.select = [];
        if (p.type && p.type === 'categorical') {
          if (p.select) {
            p.select.forEach(c => {
              let childError = {};
              if (!c) {
                childError = { category: 'Required' };
              } else if (!c.category) {
                childError = { category: 'Required' };
              }
              error.select.push(childError);
            });
          }
        }
        if (
          p.type &&
          (p.type === 'normal' ||
            p.type === 'uniform' ||
            p.type === 'lognormal' ||
            p.type === 'loguniform')
        ) {
          if (!p.step) {
            error = { step: 'Required' };
          }
          if (!p.high) {
            error = { high: 'Required' };
          }
          if (!p.low) {
            error = { low: 'Required' };
          }
          if (p.high && p.low && p.high < p.low) {
            error = { high: 'Must be smaller than "high"' };
          }
        }
      }
      errors.parameters.push(error);
    });
  }
  return errors;
};

class renderChildMembers extends React.PureComponent {
  componentWillMount() {
    const { fields } = this.props;
    if (!fields.length) fields.push();
  }

  render() {
    return (
      <div className="categorical-list">
        {this.props.fields.map((metric, index) => (
          <div className="categorical" key={`categorical-${index}`}>
            <Icon
              name="close"
              onClick={() => this.props.fields.remove(index)}
            />
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
            this.props.fields.push();
          }}
        />
      </div>
    );
  }
}

renderChildMembers.propTypes = {
  fields: PropTypes.object,
};

class renderMembers extends React.PureComponent {
  componentWillMount() {
    const { fields } = this.props;
    if (!fields.length) fields.push();
    this.getConditionalFields = this.getConditionalFields.bind(this);
  }

  getConditionalFields(param, index) {
    let toDisplay = (
      <div className="categoricals">
        <FieldArray name={`${param}.select`} component={renderChildMembers} />
      </div>
    );
    if (this.props.allValues.parameters[index].type !== 'categorical') {
      toDisplay = (
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
      );
    }
    return toDisplay;
  }

  render() {
    return (
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
              this.props.fields.push();
            }}
          />
        </div>
        {this.props.fields.map((param, index) => (
          <div className="parameters" key={`parameters-${index}`}>
            <div className="delete-container">
              <Icon
                name="close"
                onClick={() => this.props.fields.remove(index)}
              />
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
            {this.props.allValues.parameters[index] ? (
              <div>{this.getConditionalFields(param, index)}</div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    );
  }
}

renderMembers.propTypes = {
  allValues: PropTypes.object,
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
