import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import DateTimeField from 'react-bootstrap-datetimepicker/lib/DateTimeField'
import Panel from 'react-bootstrap/lib/Panel';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Modal from 'react-bootstrap/lib/Modal';
import {findDOMNode} from 'react-dom';
import NewUserForm from './CampaignForm_modules/NewUserForm';
import ElectricalProfileForm from './ElectricalProfileForm';
import FluidProfileForm from './FluidProfileForm';
import NewMaterialForm from './NewTestForm_modules/NewMaterialForm';
import NewContractForm from './CampaignForm_modules/NewContractForm';
import NewLabForm from './CampaignForm_modules/NewLabForm';
import NewFluidForm from './NewTestForm_modules/NewFluidForm';
import NewSyringeForm from './NewTestForm_modules/NewSyringeForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

var items = [];

var TestProfileSelectField = React.createClass({

    getInitialState: function () {
        return {
            isVisible: true,
            value: this.props.value
        };
    },

    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {
            this.setState({
                items: result['result']
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    render: function () {
        var options = [];
        for (var key in this.state.items) {
            var index = Math.random() + '_' + this.state.items[key].id;
            options.push(<option key={index}
                                 value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <FormGroup>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.value}
                    onChange={this.handleChange}
                    name="profile_type_id">
                    <option value="select_prof">Choose profile from saved</option>
                    {options}
                </FormControl>
            </FormGroup>
        )
    }
});


var PerformedBySelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.performed_by_id ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.performed_by_id}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="performed_by_id"
                        required={this.props.required}>
                        <option key="0" value="">Performed by{this.props.required ? " *": ""}</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var MaterialSelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.material_id ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.material_id}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select material"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="material_id"
                        required={this.props.required}>
                        <option key="0" value="">Material{this.props.required ? " *" : ""}</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var FluidTypeSelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.fluid_type_id ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.fluid_type_id}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="fluid_type_id"
                    >
                        <option key="0" value="select">Fluid Type</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var LabAnalyserSelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.lab_id ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.lab_id}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="lab_id"
                        required={this.props.required}>
                        <option key="0" value="">Lab/On-Line Analyser{this.props.required ? " *" : ""}</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var LabContractSelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value,
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },


    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.lab_contract_id ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.lab_contract_id}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="lab_contract_id"
                        required={this.props.required}>
                        <option key="0" value="">Lab Contract{this.props.required ? " *" : ""}</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var SyringeNumberSelectField = React.createClass({

    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value,
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (data) {
        this.componentDidMount();
        this.setState({
            selected: data.result
        });
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].serial}`}</option>);
        }

        return (
            <div>
                <FormGroup validationState={this.props.errors.seringe_num ? 'error' : null}>
                    <HelpBlock className="warning">{this.props.errors.seringe_num}</HelpBlock>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        value={this.state.value}
                        name="seringe_num"
                        data-len={this.props["data-len"]}>
                        <option key="0" value="select">Syringe Number</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var TestReasonSelectField = React.createClass({

    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: this.props.value
        };
    },

    isVisible: function () {
        return this.state.isVisible;
    },

    componentDidMount: function () {

        this.serverRequest = $.get(this.props.source, function (result) {

            var items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    setSelected: function (selected) {
        this.setState({
            selected: selected
        })
    },

    render: function () {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <FormGroup validationState={this.props.errors.test_reason_id ? 'error' : null}>
                <HelpBlock className="warning">{this.props.errors.test_reason_id}</HelpBlock>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.value}
                    name="test_reason_id"
                    onChange={this.handleChange}
                    required={this.props.required}
                >
                    <option key="0" value="">Reason for Testing{this.props.required ? " *": ""}</option>
                    {menuItems}
                </FormControl>
            </FormGroup>
        );
    }
});


var NewTestForm = React.createClass({

    //test_sampling_card
    //test_status_id - should be set separate
    //test_recommendation

    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            showFluidProfileForm: false,
            showElectroProfileForm: false,
            showNewUserForm: false,
            showNewMaterialForm: false,
            showNewFluidForm: false,
            showNewContractForm: false,
            showNewLabForm: false,
            showNewSyringeForm: false,
            date_analyse: new Date().toISOString(),
            repair_date: new Date().toISOString(),
            fields: [
                'test_reason_id', 'status_id', 'equipment_id', 'date_analyse', 'test_type_id',
                'test_status_id', 'material_id', 'fluid_type_id',
                'performed_by_id', 'lab_id', 'lab_contract_id', 'analysis_number', 'mws',
                'temperature', 'seringe_num', 'transmission', 'charge', 'remark', 'repair_date', 'repair_description',
                'ambient_air_temperature'
            ],
            test_reason_id: '',
            changedFields: []
        }
    },

    componentDidMount: function () {
        if ((this.props.data != null) && (typeof this.props.data.id != 'undefined')) {
            this._edit(this.props.data.id);
        }
    },

    _edit: function (id) {
        // fill up form with data

        var url = '/api/v1.0/test_result/' + id; // edit
        this.serverRequest = $.get(url, function (result) {
            var data = (result['result']);

            var fields = this.state.fields;
            var form = {};
            for (var i = 0; i < fields.length; i++) {
                var key = fields[i];
                form[key] = data[key];
            }
            form['id'] = id;
            this.setState(form);

        }.bind(this), 'json');
    },

    _add: function () {
        var fields = this.state.fields;
        var form = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            form[key] = undefined;
        }
        form['id'] = '';

        // console.log("Add new test method");
        // console.log('props:', this.props.data);
        // console.log('state: ', this.state);
        form['campaign_id'] = this.props.data['campaign_id'];
        form['equipment_id'] = this.props.data['equipment_id'];

        // console.log(form);
        this.setState(form);
    },

    _save: function () {
        var fields = this.state.changedFields;
        var data = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            if (typeof this.state[key] != 'undefined'){
                data[key] = this.state[key];
            }
        }
        var url = '/api/v1.0/test_result/' + this.state.id; // edit when id is set
        delete data['analysis_number'];

        data['campaign_id'] = this.props.data['campaign_id'];
        data['equipment_id'] = this.props.data['equipment_id'];

        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    },

    _onSubmit: function (e) {
        e.preventDefault();
        if (!this.is_valid()){
			NotificationManager.error('Please correct the errors');
			return false;
		}
        var xhr = this._save();
        if (!xhr) {
            alert('Something went wrong.')
        }
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },

    is_valid: function () {
        return (Object.keys(this.state.errors).length <= 0);
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        this.setState({
            analysis_number: data['result']['analysis_number']
        });
        NotificationManager.success('Test saved', null, 4000);
        this.props.reloadList();
    },

    _onError: function (data) {
        var message = "Failed to create";
        var res = data.responseJSON;
        if (res.message) {
            message = data.responseJSON.message;
        }
        if (res.error) {
			// Join multiple error messages
			if (res.error instanceof Object){
				for (var field in res.error) {
					var errorMessage = res.error[field];
					if (Array.isArray(errorMessage)) {
						errorMessage = errorMessage.join(". ");
					}
					res.error[field] = errorMessage;
				}
				this.setState({
					errors: res.error
				});
			} else {
				message = res.error;
			}
		}
		NotificationManager.error(message);
    },

    _onChange: function (e) {
        var state = {};

        if (e.target.type == 'checkbox') {
            state[e.target.name] = e.target.checked;
        } else if (e.target.type == 'select-one') {
            state[e.target.name] = e.target.value;
        } else if (e.target.type == 'radio') {
            state[e.target.name] = e.target.value;
            // fluid
            if ('1' === e.target.value) {
                this.setState({
                    showFluidProfileForm: true,
                    showElectroProfileForm: false
                });
            //electrical
            } else if ('2' === e.target.value) {
                this.setState({
                    showElectroProfileForm: true,
                    showFluidProfileForm: false
                });
            }
        } else {
            state[e.target.name] = e.target.value;
        }

        state.changedFields = this.state.changedFields.concat([e.target.name]);
        var errors = this._validate(e);
        state = this._updateFieldErrors(e.target.name, state, errors);
        this.setState(state);
    },
    _validate: function (e) {
        var errors = [];
        var error;
        error = this._validateFieldType(e.target.value, e.target.getAttribute("data-type"));
        if (error){
            errors.push(error);
        }
        error = this._validateFieldLength(e.target.value, e.target.getAttribute("data-len"));
        if (error){
            errors.push(error);
        }
        return errors;
    },

    _validateFieldType: function (value, type){
        var error = "";
        if (type != undefined && value){
            var typePatterns = {
                "float": /^(-|\+?)[0-9]+(\.)?[0-9]*$/,
                "int": /^(-|\+)?(0|[1-9]\d*)$/
            };
            if (!typePatterns[type].test(value)){
                error = "Invalid " + type + " value";
            }
        }
        return error;
    },

    _validateFieldLength: function (value, length){
        var error = "";
        if (value && length){
            if (value.length > length){
                error = "Value should be maximum " + length + " characters long"
            }
        }
        return error;
    },

    _updateFieldErrors: function (fieldName, state, errors){
        // Clear existing errors related to the current field as it has been edited
        state.errors = this.state.errors;
        delete state.errors[fieldName];

        // Update errors with new ones, if present
        if (Object.keys(errors).length){
            state.errors[fieldName] = errors.join(". ");
        }
        return state;
    },

    setRepairDate: function (timestamp){
        //this.setState({repair_state: moment(timestamp)});
    },

    setDateAnalyse: function (timestamp){
        //this.setState({date_analyse: moment(timestamp)});
    },

    _formGroupClass: function (field) {
        var className = "form-group ";
        if (field) {
            className += " has-error"
        }
        return className;
    },

    closeElectricalProfileForm: function () {
        this.setState({
            showElectroProfileForm: false

        })
    },

    closeFluidProfileForm: function () {
        this.setState({
            showFluidProfileForm: false
        })
    },

    closeNewFluidForm: function () {
        this.setState({
            showNewFluidForm: false
        })
    },

    closeNewMaterialForm: function () {
        this.setState({
            showNewMaterialForm: false
        })
    },

    closeNewUserForm: function () {
        this.setState({
            showNewUserForm: false

        })
    },

    closeNewContractForm: function () {
        this.setState({
            showNewContractForm: false
        })
    },

    closeNewLabForm: function () {
        this.setState({
            showNewLabForm: false
        })
    },

    closeNewSyringeForm: function () {
        this.setState({
            showNewSyringeForm: false
        })
    },

    onContractCreate: function (response) {
        this.refs.contract.setSelected(response);
        this.closeNewContractForm();
        NotificationManager.success('Contract added', null, 2000);
    },

    onPerformerCreate: function (response) {
        this.refs.performed_by.setSelected(response);
        this.closeNewUserForm();
        NotificationManager.success('User added', null, 2000);
    },

    onLabCreate: function (response) {
        this.refs.lab.setSelected(response);
        this.closeNewLabForm();
        NotificationManager.success('Laboratory added', null, 2000);
    },

    onMaterialCreate: function (response) {
        this.refs.material.setSelected(response);
        this.closeNewMaterialForm();
        NotificationManager.success('Material added', null, 2000);
    },

    onFluidTypeCreate: function (response) {
        this.refs.fluid_type.setSelected(response);
        this.closeNewFluidForm();
        NotificationManager.success('Fluid type added', null, 2000);
    },

    onSyringeCreate: function (response) {
        this.refs.syringe.setSelected(response);
        this.closeNewSyringeForm();
        NotificationManager.success('Syringe added', null, 2000);
    },

    onNewButtonClick: function (e) {
        if (e.target.id === 'material') {
            this.setState({
                showNewMaterialForm: true,
                showNewFluidForm: false,
                showNewUserForm: false,
                showNewContractForm: false,
                showNewLabForm: false,
                showNewSyringeForm: false
            })
        }
        else if (e.target.id === 'fluid_type') {
            this.setState({
                showNewMaterialForm: false,
                showNewFluidForm: true,
                showNewUserForm: false,
                showNewContractForm: false,
                showNewLabForm: false,
                showNewSyringeForm: false
            })
        }
        else if (e.target.id === 'performed_by') {
            this.setState({
                showNewMaterialForm: false,
                showNewFluidForm: false,
                showNewUserForm: true,
                showNewContractForm: false,
                showNewLabForm: false,
                showNewSyringeForm: false
            })
        }
        else if (e.target.id === 'lab_analyser') {
            this.setState({
                showNewMaterialForm: false,
                showNewFluidForm: false,
                showNewUserForm: false,
                showNewContractForm: false,
                showNewLabForm: true,
                showNewSyringeForm: false
            })
        }
        else if (e.target.id === 'lab_contract') {
            this.setState({
                showNewMaterialForm: false,
                showNewFluidForm: false,
                showNewUserForm: false,
                showNewContractForm: true,
                showNewLabForm: false,
                showNewSyringeForm: false
            })
        }
        else if (e.target.id === 'syringe') {
            this.setState({
                showNewMaterialForm: false,
                showNewFluidForm: false,
                showNewUserForm: false,
                showNewContractForm: false,
                showNewLabForm: false,
                showNewSyringeForm: true
            })
        }
    },

    render: function () {

        var title = (this.state.id) ? "Edit test" : 'New test';
        return (
            this.props.show ?
                <div className="form-container">
                    <form method="post" action="#" onSubmit={this._onSubmit} onChange={this._onChange}>
                        <Panel header={title}>
                            <div className="maxwidth">
                                <div className="col-md-12">
                                    <div className="maxwidth">
                                        <FormGroup validationState={this.state.errors.analysis_number ? 'error' : null}>
                                            <HelpBlock className="warning">{this.state.errors.analysis_number}</HelpBlock>
                                            <FormControl type="text"
                                                         placeholder="Analysis Number"
                                                         name="analysis_number"
                                                         readOnly="readOnly"
                                                         value={this.state.analysis_number}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <TestReasonSelectField
                                                ref="test_reason"
                                                source="/api/v1.0/test_reason"
                                                handleChange={this.handleChange}
                                                value={this.state.test_reason_id}
                                                errors={this.state.errors}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-11">
                                            <MaterialSelectField
                                                ref="material"
                                                source="/api/v1.0/material/"
                                                handleChange={this.handleChange}
                                                value={this.state.material_id}
                                                errors={this.state.errors}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="material"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-11">
                                            <FluidTypeSelectField
                                                ref="fluid_type"
                                                source="/api/v1.0/fluid_type/"
                                                value={this.state.fluid_type_id}
                                                errors={this.state.errors}
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="fluid_type"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-11">
                                            <PerformedBySelectField
                                                ref="performed_by"
                                                source="/api/v1.0/user"
                                                handleChange={this.handleChange}
                                                value={this.state.performed_by_id}
                                                errors={this.state.errors}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="performed_by"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-11">
                                            <LabAnalyserSelectField
                                                ref="lab"
                                                source="/api/v1.0/lab/"
                                                value={this.state.lab_id}
                                                errors={this.state.errors}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="lab_analyser"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-11">
                                            <LabContractSelectField
                                                ref="contract"
                                                source="/api/v1.0/contract/"
                                                handleChange={this.handleChange}
                                                value={this.state.lab_contract_id}
                                                errors={this.state.errors}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="lab_contract"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.charge ? 'error' : null}>
                                                <HelpBlock className="warning">{this.state.errors.charge}</HelpBlock>
                                                <FormControl type="text"
                                                             placeholder="Charge"
                                                             name="charge"
                                                             value={this.state.charge}
                                                             data-type="float"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.remark ? 'error' : null}>
                                                <ControlLabel>Remark</ControlLabel>
                                                <HelpBlock className="warning">{this.state.errors.remark}</HelpBlock>
                                                <FormControl componentClass="textarea"
                                                             placeholder="remark"
                                                             name="remark"
                                                             value={this.state.remark}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="maxwidth">
                                        <div className="col-md-4 nopadding padding-right-xs">
                                            <Checkbox name="transmission"
                                                      checked={this.state.transmission ? "checked" :null}>
                                                Sent to Laboratory
                                            </Checkbox>
                                        </div>
                                    </div>


                                    <div className="maxwidth">
                                        <div className="datetimepicker input-group date col-md-3">
                                            <FormGroup validationState={this.state.errors.repair_date ? 'error' : null}>
                                                <ControlLabel>Repair Date</ControlLabel>
                                                <HelpBlock className="warning">{this.state.errors.repair_date}</HelpBlock>
                                                <DateTimeField name="repair_date"
                                                               datetime={this.state.repair_date}
                                                               onChange={this.setRepairDate}/>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.repair_description ? 'error' : null}>
                                                <ControlLabel>Repair Description</ControlLabel>
                                                <HelpBlock className="warning">{this.state.errors.repair_description}</HelpBlock>
                                                <FormControl componentClass="textarea"
                                                             placeholder="repair description"
                                                             name="repair_description"
                                                             value={this.state.repair_description}
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="maxwidth">
                                        <div className="datetimepicker input-group date col-md-3">
                                            <FormGroup validationState={this.state.errors.date_analyse ? 'error' : null}>
                                                <ControlLabel>Date Applied</ControlLabel>
                                                <HelpBlock className="warning">{this.state.errors.date_analyse}</HelpBlock>
                                                <DateTimeField name="date_analyse" datetime={this.state.date_analyse}
                                                               onChange={this.setDateAnalyse}
                                                               required/>
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.mws ? 'error' : null}>
                                                <HelpBlock className="warning">{this.state.errors.mws}</HelpBlock>
                                                <FormControl type="text"
                                                             placeholder="Equipment Load mW"
                                                             name="mws"
                                                             value={this.state.mws}
                                                             data-type="float"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.temperature ? 'error' : null}>
                                                <HelpBlock className="warning">{this.state.errors.temperature}</HelpBlock>
                                                <FormControl type="text"
                                                             placeholder="Temperature"
                                                             name="temperature"
                                                             value={this.state.temperature}
                                                             data-type="float"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-11">
                                            <SyringeNumberSelectField
                                                ref="syringe"
                                                source="/api/v1.0/syringe/"
                                                handleChange={this.handleChange}
                                                value={this.state.seringe_num}
                                                errors={this.state.errors}
                                                data-len="50"
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <a id="syringe"
                                               className="btn btn-primary"
                                               onClick={this.onNewButtonClick}
                                            >New</a>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup validationState={this.state.errors.ambient_air_temperature ? 'error' : null}>
                                                <HelpBlock className="warning">{this.state.errors.ambient_air_temperature}</HelpBlock>
                                                <FormControl type="text"
                                                             placeholder="Ambient Air Temperature"
                                                             name="ambient_air_temperature"
                                                             value={this.state.ambient_air_temperature}
                                                             data-type="float"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <fieldset className="scheduler-border">
                                        <legend className="scheduler-border">Choose test type</legend>
                                            <div className="maxwidth">
                                                <Radio name="test_type_id" value="1" required checked={this.state.test_type_id == 1}>
                                                    Fluid Profile
                                                </Radio>
                                                <Radio name="test_type_id" value="2" required checked={this.state.test_type_id == 2}>
                                                    Electrical Profile
                                                </Radio>
                                            </div>
                                    </fieldset>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Button bsStyle="success"
                                                    type="submit"
                                                    className="pull-right"
                                            >Save</Button>
                                            <Button bsStyle="danger"
                                                    className="pull-right margin-right-xs"
                                            >Cancel</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </form>

                    <Modal show={this.state.showElectroProfileForm}>
                        <ElectricalProfileForm data={this.state} handleClose={this.closeElectricalProfileForm}/>
                    </Modal>

                    <Modal show={this.state.showFluidProfileForm}>
                        <FluidProfileForm data={this.state} handleClose={this.closeFluidProfileForm}/>
                    </Modal>

                    <Modal show={this.state.showNewLabForm}>
                        <Modal.Header>
                            <Modal.Title>New Laboratory Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewLabForm handleClose={this.closeNewLabForm}
                                        onCreate={this.onLabCreate}
                            />
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showNewContractForm}>
                        <Modal.Header>
                            <Modal.Title>New Contract</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewContractForm onCreate={this.onContractCreate}
                                             handleClose={this.closeNewContractForm}/>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showNewMaterialForm}>
                        <Modal.Header>
                            <Modal.Title>New Material Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewMaterialForm handleClose={this.closeNewMaterialForm}
                                             onCreate={this.onMaterialCreate}/>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showNewFluidForm}>
                        <Modal.Header>
                            <Modal.Title>New Fluid Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewFluidForm handleClose={this.closeNewFluidForm}
                                          onCreate={this.onFluidTypeCreate}/>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showNewUserForm}>
                        <Modal.Header>
                            <Modal.Title>New User Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewUserForm data={this.props.data}
                                         handleClose={this.closeNewUserForm}
                                         onCreate={this.onPerformerCreate}
                            />
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showNewSyringeForm}>
                        <Modal.Header>
                            <Modal.Title>New Syringe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewSyringeForm handleClose={this.closeNewSyringeForm}
                                            onCreate={this.onSyringeCreate}
                            />
                        </Modal.Body>
                    </Modal>

                </div> : null
        );
    }
});


export default NewTestForm;


