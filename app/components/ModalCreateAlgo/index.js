// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { light as theme } from 'themeConfig';
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

const parser = value =>
  isNaN(parseFloat(value, 10)) ? null : parseFloat(value, 10);

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  errors.parameters = [];
  if (values.parameters) {
    values.parameters.forEach(p => {
      const error = { search_space: {} };
      if (!p.name) {
        error.name = 'Required';
      }
      if (!p.category) {
        error.category = 'Must define a category';
      }
      if (p.category && p.category === 'categorical') {
        error.search_space.values = [];
        p.search_space.values.forEach(v => {
          error.search_space.values.push(!v ? 'Required' : undefined);
        });
        let s = 0;
        p.search_space.probabilities.forEach(prob => {
          s += prob || 0;
        });
        error.search_space.probabilities = p.search_space.probabilities.map(
          () => undefined,
        );
        if (s !== 0 && s !== 1) {
          error.search_space.probabilities[
            error.search_space.probabilities.length - 1
          ] =
            'Sum of probabilities must be equal to 1';
        }
        let undef = 0;
        p.search_space.probabilities.forEach(pr => {
          undef += pr ? 0 : 1;
        });
        if (undef > 0 && undef !== p.search_space.probabilities.length) {
          error.search_space.probabilities[
            error.search_space.probabilities.length - 1
          ] =
            'If using probabilities, fill everything';
        }
      }
      if (
        ['uniform', 'loguniform', 'normal', 'lognormal'].includes(p.category)
      ) {
        if (p.search_space.base && p.search_space.base < 2) {
          error.search_space.base = 'Must be greater or equal to 2';
        }
        if (!p.search_space.step) {
          error.search_space.step = 'Required';
        }
        if (!p.search_space.high) {
          error.search_space.high = 'Required';
        }
        if (!p.search_space.low) {
          error.search_space.low = 'Required';
        }
        if (
          p.search_space.high &&
          p.search_space.low &&
          p.search_space.high < p.search_space.low
        ) {
          error.search_space.high = 'Must be smaller than "high"';
        }
      }
      if (['normal', 'lognormal'].includes(p.category)) {
        if (!p.search_space.mu) {
          error.search_space.mu = 'Required';
        }
        if (!p.search_space.sigma) {
          error.search_space.sigma = 'Required';
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
    if (fields.length === 0 && !this.props.isUpdate) fields.push();
  }

  render() {
    return (
      <div className="categorical-list">
        {this.props.fields.map((metric, index) => (
          <div className="categorical" key={`categorical-${index}`}>
            <Icon
              name="close"
              onClick={() => this.props.fields.remove(index)}
              theme={this.props.theme}
            />
            <Field
              name={metric.replace('select', 'search_space.values')}
              type="text"
              component={Input}
              placeholder={`Cat. ${index + 1}`}
              theme={this.props.theme}
            />
            <Field
              name={metric.replace('select', 'search_space.probabilities')}
              parse={parser}
              type="number"
              step="0.1"
              component={Input}
              placeholder="Proba"
              theme={this.props.theme}
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
          theme={this.props.theme}
        />
      </div>
    );
  }
}

renderChildMembers.propTypes = {
  theme: PropTypes.object,
  fields: PropTypes.object,
  isUpdate: PropTypes.bool,
};

class renderMembers extends React.PureComponent {
  componentWillMount() {
    const { fields } = this.props;
    if (fields.length === 0)
      fields.push({
        name: '',
        category: '',
        search_space: {
          mu: '',
          sigma: '',
          low: '',
          high: '',
          step: '',
          base: '',
          values: [],
          probabilities: [],
        },
      });
    this.getConditionalFields = this.getConditionalFields.bind(this);
  }

  getConditionalFields(param, index) {
    let toDisplay = '';
    const cat = this.props.allValues.parameters[index].category;
    if (['uniform', 'loguniform', 'normal', 'lognormal'].includes(cat)) {
      toDisplay = (
        <div className="non-categoricals">
          {['normal', 'lognormal'].includes(cat) ? (
            <div className="sigmu">
              <Field
                name={`${param}.search_space.mu`}
                parse={parser}
                type="number"
                step="0.1"
                component={Input}
                placeholder="Mu"
                theme={this.props.theme}
              />
              <Field
                name={`${param}.search_space.sigma`}
                parse={parser}
                type="number"
                step="0.1"
                component={Input}
                placeholder="Sigma"
                theme={this.props.theme}
              />
            </div>
          ) : (
            ''
          )}
          <Field
            name={`${param}.search_space.low`}
            parse={parser}
            type="number"
            step="0.1"
            component={Input}
            placeholder="Low"
            theme={this.props.theme}
          />
          <Field
            name={`${param}.search_space.high`}
            parse={parser}
            type="number"
            step="0.1"
            component={Input}
            placeholder="High"
            theme={this.props.theme}
          />
          <Field
            name={`${param}.search_space.step`}
            parse={parser}
            type="number"
            step="0.1"
            component={Input}
            placeholder="Step (def. continuous)"
            theme={this.props.theme}
          />
          {['loguniform', 'lognormal'].includes(cat) ? (
            <Field
              name={`${param}.search_space.base`}
              parse={parser}
              type="number"
              step="1"
              component={Input}
              placeholder="Base (def. 10)"
              theme={this.props.theme}
            />
          ) : (
            ''
          )}
        </div>
      );
    } else if (
      this.props.allValues.parameters[index].category === 'categorical'
    ) {
      toDisplay = (
        <div className="categoricals">
          <FieldArray
            name={`${param}.select`}
            component={renderChildMembers}
            isUpdate={this.props.isUpdate}
            theme={this.props.theme}
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
          <Label
            content="Hyper-Parameters"
            type="simple"
            size="normal"
            theme={this.props.theme}
          />
          <Button
            className={
              this.props.isUpdate ? 'create-algo-no-update spec' : 'spec'
            }
            type="round"
            icon="add_circle_outline"
            color="positive"
            onClick={e => {
              e.preventDefault();
              this.props.fields.push({
                name: '',
                category: '',
                search_space: {
                  mu: '',
                  sigma: '',
                  low: '',
                  high: '',
                  step: '',
                  base: '',
                  values: [],
                  probabilities: [],
                },
              });
            }}
            theme={this.props.theme}
          />
          <Button
            style={{ margin: '-5px 0 0 10px', padding: '0 5px' }}
            content="See Documentation"
            onClick={() =>
              window.open(
                'https://bender-optimizer.readthedocs.io/en/latest/documentation/general.html#hyper-parameters',
                '_blank',
              )
            }
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
                theme={this.props.theme}
              />
            </div>
            <Field
              className={
                this.props.isUpdate ? 'input create-algo-no-update' : 'input'
              }
              name={`${param}.name`}
              type="text"
              component={Input}
              placeholder={`Hyper-Parameter ${index + 1}`}
              theme={this.props.theme}
            />
            {this.props.isUpdate ? (
              <Label
                type="important"
                size="tiny"
                content={
                  this.props.allValues.parameters[index]
                    ? this.props.allValues.parameters[index].name
                    : ''
                }
                theme={this.props.theme}
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
              name={`${param}.category`}
              selected=""
              component={Select}
              onSelectionChange={() => {}}
              values={[
                { id: '', label: 'Select category' },
                { id: 'categorical', label: 'Categorical' },
                { id: 'uniform', label: 'Uniform' },
                { id: 'loguniform', label: 'Log-Uniform' },
                { id: 'normal', label: 'Normal' },
                { id: 'lognormal', label: 'Log-Normal' },
              ]}
              label="VARIABLE TYPE"
              theme={this.props.theme}
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
  theme: PropTypes.object,
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
          theme={this.props.theme}
        />
        <FieldArray
          allValues={this.props.allValues}
          name="parameters"
          component={renderMembers}
          isUpdate={this.props.isUpdate}
          theme={this.props.theme}
        />
        <Button
          className="submit"
          content={this.props.isUpdate ? 'Update' : 'Create'}
          type="submit"
          disabled={this.props.submitting}
          theme={this.props.theme}
        />
      </form>
    );
  }
};

Form.propTypes = {
  theme: PropTypes.object,
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
      initialValues.parameters.push({
        category: p.category,
        name: p.name,
        search_space: p.search_space,
      });
    });
  }
  return (
    <StyledModalCreateAlgo className="modal-create-experiment" {...props}>
      <Label
        content={props.update ? 'Update Algo' : 'Create a new algo'}
        type="important"
        size="big"
        theme={props.theme}
      />
      <FormContainer
        onCreate={props.onValidate}
        isUpdate={props.update}
        values={initialValues}
        theme={props.theme}
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
