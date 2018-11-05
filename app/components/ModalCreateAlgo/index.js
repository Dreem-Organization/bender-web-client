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
  initialize,
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
    if (!fields.length && !this.props.isUpdate) fields.push();
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
  isUpdate: PropTypes.bool,
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
        <FieldArray
          name={`${param}.select`}
          component={renderChildMembers}
          isUpdate={this.props.isUpdate}
        />
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
            className={
              this.props.isUpdate ? 'create-algo-no-update spec' : 'spec'
            }
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
            <div
              className={
                this.props.isUpdate
                  ? 'create-algo-no-update delete-container'
                  : 'delete-container'
              }
            >
              <Icon
                name="close"
                onClick={() => this.props.fields.remove(index)}
              />
            </div>
            <Field
              className={
                this.props.isUpdate ? 'input create-algo-no-update' : 'input'
              }
              name={`${param}.hpName`}
              type="text"
              component={Input}
              placeholder={`Hyper-Parameter ${index + 1}`}
            />
            {this.props.isUpdate ? (
              <Label
                type="important"
                size="tiny"
                content={
                  this.props.allValues.parameters[index]
                    ? this.props.allValues.parameters[index].hpName
                    : ''
                }
              />
            ) : (
              ''
            )}
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
              className={
                this.props.isUpdate ? 'create-algo-no-update select' : 'select'
              }
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
  isUpdate: PropTypes.bool,
};

let Form = class FormClass extends React.PureComponent {
  componentDidMount() {
    if (this.props.isUpdate) {
      this.props.initializeForm();
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onCreate)}>
        <Label content="Name" type="simple" size="normal" />
        <Field
          name="name"
          type="text"
          component={Input}
          placeholder="Choose wisely"
          value="toto"
        />
        <FieldArray
          allValues={this.props.allValues}
          name="parameters"
          component={renderMembers}
          isUpdate={this.props.isUpdate}
        />
        <Button
          className="submit"
          content={this.props.isUpdate ? 'Update' : 'Create'}
          type="submit"
          disabled={this.props.submitting}
        />
      </form>
    );
  }
};

Form.propTypes = {
  initializeForm: PropTypes.func,
  allValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCreate: PropTypes.func,
  submitting: PropTypes.bool,
  isUpdate: PropTypes.bool,
};

Form = reduxForm({
  form: 'updateAlgoForm',
  validate,
})(Form);

let stateValues;

const mapStateToProps = (state, props) => {
  stateValues = props.values;

  return {
    allValues: getFormValues('updateAlgoForm')(state),
  };
};

const mapDispatchToProps = dispatch => ({
  initializeForm: () => {
    dispatch(initialize('updateAlgoForm', stateValues));
  },
});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

function ModalCreateAlgo(props) {
  let initialValues = null;
  if (props.update) {
    initialValues = {
      name: props.algo.name,
      parameters: [],
    };
    props.algo.parameters.forEach(p => {
      if (p.category === 'categorical') {
        initialValues.parameters.push({
          type: p.category,
          hpName: p.name,
          select: p.search_space.values,
        });
      } else {
        initialValues.parameters.push({
          type: p.category,
          hpName: p.name,
          low: p.search_space.low,
          high: p.search_space.high,
          step: p.search_space.step,
        });
      }
    });
  }
  return (
    <StyledModalCreateAlgo className="modal-create-experiment" {...props}>
      <Label
        content={props.update ? 'Update Algo' : 'Create a new algo'}
        type="important"
        size="big"
      />
      <FormContainer
        onCreate={props.onValidate}
        isUpdate={props.update}
        values={initialValues}
      />
    </StyledModalCreateAlgo>
  );
}

ModalCreateAlgo.propTypes = {
  theme: PropTypes.object,
  onClose: PropTypes.func,
  onValidate: PropTypes.func.isRequired,
  algo: PropTypes.object,
  update: PropTypes.bool,
};

ModalCreateAlgo.defaultProps = {
  theme,
};

export default ModalCreateAlgo;
