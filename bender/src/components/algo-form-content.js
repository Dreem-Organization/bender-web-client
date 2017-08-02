import React from 'react'
import update from 'react-addons-update';
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'
import InputNumber from 'antd/lib/input-number'
import Tag from 'antd/lib/tag'
import Tooltip from 'antd/lib/tooltip'
import _ from 'lodash'

const Option = Select.Option;
const OptGroup = Select.OptGroup;

const FormItem = Form.Item;
let uuid = 0;

const paramName = {
    type: "text",
    style: {
        width: '30%',
        float: 'left',
        marginTop: '1px'
    }
};

const category = {
    style: {
        width: '20%',
        marginLeft: '8px'
    }
};

const values = {
    style: {
        display: 'inline',
        marginLeft: '8px'
    }
};

const inputNumber = {
    style: {
        width: '10%'
    }
};

const deleteButton = {
    type: "minus-circle-o",
    style: {
        float: 'right',
        width: '8%'
    }
};

const submitButton = {
    type: 'primary',
    htmlType: 'submit',
    style: {
        float: 'right',
    }
};


class AlgoFormContent extends React.Component {
    constructor(props) {
        super(props);

        // Attributes for each hyper-parameter.

        this.state = {
            hyperparameters: {},
            input: {},
        };

        this.initParameter = this.initParameter.bind(this);
        this.initSpace = this.initSpace.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getSpace = this.getSpace.bind(this);
        this.getInput = this.getInput.bind(this);
        this.handleSpaceChange = this.handleSpaceChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);

    }

    // Hyper-parameter values: tag creation

    handleClose = (k, removed) => {
        let newValues = this.getSpace(k).values.filter(v => v !== removed);
        this.setState((prevState) => ({
            hyperparameters: update(prevState.hyperparameters,
                {
                    [k]: {
                        search_space: {
                            values: {$set: newValues}
                        }
                    }
                })
        }))
    };

    showInput = (k) => {
        this.setState((prevState) => ({
                input: update(prevState.input,
                    {
                        [k]: {
                            visible: {$set: true}
                        }
                    }),

            }),
            () => this.input.focus())
    };


    handleInputChange = (k, e) => {
        const value = e.target.value;
        this.setState((prevState) => ({
            input: update(prevState.input,
                {
                    [k]: {
                        value: {$set: value}
                    }
                })
        }));
    };

    handleInputConfirm = (k) => {
        const inputValue = this.getInput(k).value;
        let values = this.getSpace(k).values;

        if (inputValue && values.indexOf(inputValue) === -1) {
            values = [...values, inputValue];
        }

        this.setState((prevState) => ({
            hyperparameters: update(prevState.hyperparameters,
                {
                    [k]: {
                        search_space: {
                            values: {
                                $set: values,
                            }
                        }
                    }
                }),
            input: update(prevState.input,
                {
                    [k]: {
                        $merge: {
                            visible: false,
                            value: ''
                        }
                    }
                })
        }))
    };

    saveInputRef = input => this.input = input;

    // Hyper-parameter attributes: dynamic form

    handleSubmit = (e) => {
        e.preventDefault();
        let algoForm = {
            parameters: _.sortBy(this.state.hyperparameters,
                [function (p, value, key) {
                    return key;
                }])
        };

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                //TODO: Query attributes from a single source,
                //TODO: instead of state & values.

                algoForm.name = values.algoName;
                this.props.handleCreateAlgo(algoForm);

            }
        })
    };

    removeParameters = (p) => {
        const {form} = this.props;
        // can use data-binding to get
        const parameters = form.getFieldValue('parameters');
        // We need at least one hyper-parameter
        if (parameters.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            parameters: parameters.filter(param => param !== p),
        });
    };

    addParameters = () => {
        uuid++;
        this.initParameter(uuid);
        const {form} = this.props;
        // can use data-binding to get
        const parameters = form.getFieldValue('parameters');
        const nextParameters = parameters.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            parameters: nextParameters,
        });
    };

    handleNameChange(k) {
        this.setState((prevState, props) => ({
            hyperparameters: update(prevState.hyperparameters,
                {
                    [k]: {name: {$set: props.form.getFieldValue(`paramName-${k}`)}}
                })
        }));
    }

    initParameter(key) {
        if (!(key in this.state.hyperparameters)) {

            let hyperParam = this.state.hyperparameters;
            hyperParam[key] = {name: '', category: '', search_space: {}};

            this.setState((prevState) => ({
                hyperparameters: update(prevState.hyperparameters, {$merge: hyperParam})
            }))
        }
    }

    getCategory(k) {
        if (!(k in this.state.hyperparameters)) {
            return "uniform"
        }
        return this.state.hyperparameters[k].category;
    }

    handleCategoryChange(k, v) {
        this.initSpace(k, v);
        this.setState((prevState) => ({
            hyperparameters: update(prevState.hyperparameters,
                {
                    [k]: {category: {$set: v}}
                })
        }));
    }

    getSpace(k) {
        return this.state.hyperparameters[k].search_space;
    }

    handleSpaceChange(k, v, field) {
        this.setState((prevState) => ({
            hyperparameters: update(prevState.hyperparameters,
                {
                    [k]: {search_space: {$merge: {[field]: v}}}
                })
        }));
    }

    getInput(k) {
        return this.state.input[k];
    }

    initSpace(k, v) {
        if ((k in this.state.hyperparameters)
            && Object.keys(this.getSpace(k)).length === 0) {

            let search_space;
            let input = {visible: false, value: ''};

            if (v === 'categorical') {
                search_space = {values: []};
            } else {
                search_space = {min: null, max: null, step: null};
            }

            this.setState((prevState) => ({
                hyperparameters: update(prevState.hyperparameters,
                    {
                        [k]: {search_space: {$set: search_space}}
                    }),
                input: update(prevState.input,
                    {
                        [k]: {$set: input}
                    })
            }));
        }
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('parameters', {initialValue: []});
        const parameters = getFieldValue('parameters');

        const formItems = parameters.map((k, index) => {
            return (
                <FormItem
                    label={index === 0 ? 'Hyper-parameters' : ''}
                    required={false}
                    key={k}>
                    <div style={{overflow: 'hidden'}}>
                        {
                            getFieldDecorator(`paramName-${k}`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: "Please provide a hyper-parameter name.",
                                }],
                            })(<Input{...paramName}
                                     onChange={(n) => this.handleNameChange(k)}
                                     placeholder="Name"/>
                            )}
                        <Select
                            {...category}
                            id="category"
                            placeholder={'Category'}
                            defaultValue="uniform"
                            onChange={(e) => this.handleCategoryChange(k, e)}>
                            <OptGroup label="category">
                                <Option value="uniform">uniform</Option>
                                <Option value="loguniform">loguniform</Option>
                                <Option value="categorical">categorical</Option>
                            </OptGroup>
                        </Select>

                        {this.getCategory(k) === "categorical" ? (
                            <div {...values}>
                                {this.getSpace(k).values.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag key={tag}
                                             color="blue"
                                             closable={true}
                                             afterClose={() => this.handleClose(k, tag)}>
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                                })}

                                {this.getInput(k).visible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{width: "78px"}}
                                        value={this.getInput(k).value}
                                        onChange={(e) => this.handleInputChange(k, e)}
                                        onBlur={() => this.handleInputConfirm(k)}
                                        onPressEnter={() => this.handleInputConfirm(k)}
                                    />
                                )}
                                {!this.getInput(k).visible &&
                                <Button size="small" type="dashed"
                                        onClick={() => this.showInput(k)}>+ New Value</Button>}
                            </div>
                        ) : (
                            <div {...values}>
                                <InputNumber {...inputNumber} step={0.1}
                                             onChange={(v) => this.handleSpaceChange(k, v, "low")}
                                             placeholder="Low"/>

                                <InputNumber {...inputNumber} step={0.1}
                                             onChange={(v) => this.handleSpaceChange(k, v, "high")}
                                             placeholder="High"/>

                                <InputNumber {...inputNumber} step={0.1}
                                             onChange={(v) => this.handleSpaceChange(k, v, "step")}
                                             placeholder="Step"/>
                            </div>
                        )
                        }
                        {parameters.length > 1 ? (
                            <Icon
                                {...deleteButton}
                                className="dynamic-delete-button"
                                disabled={parameters.length === 1}
                                onClick={() => this.removeParameters(k)}
                            />
                        ) : null}
                    </div>
                </FormItem>
            );
        });

        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit}>
                <FormItem label='Algo Name'>
                    {getFieldDecorator('algoName', {
                        rules: [{required: true, message: 'Please provide an algo name.'}]
                    })(
                        <Input placeholder='Algo Name'/>
                    )}
                </FormItem>
                {formItems}
                <FormItem>
                    <Button type="dashed" onClick={this.addParameters} style={{width: '100%'}}>
                        <Icon type="plus"/> Add hyper-parameter
                    </Button>
                </FormItem>
                <FormItem>
                    <Button {...submitButton}>Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedAlgoFormContent = Form.create()(AlgoFormContent);
export default WrappedAlgoFormContent