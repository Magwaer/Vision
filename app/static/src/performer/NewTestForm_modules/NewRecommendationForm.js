import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {findDOMNode} from 'react-dom';
import Modal from 'react-bootstrap/lib/Modal';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import TestTypeSelectField from './TestTypeSelectField';

var items = [];


const TextArea = React.createClass({
    render: function () {
        let tooltip = <Tooltip id={this.props.label}>{this.props.label}</Tooltip>;
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name : "";
        var value = (this.props.value != null) ? this.props.value : "";
        var error = this.props.errors[name];
        return (
            <OverlayTrigger overlay={tooltip} placement="top">
                <FormGroup>
                    <FormControl componentClass="textarea"
                                 placeholder={label}
                                 name={name}
                                 value={value}
                                 onChange={this.props.onChange}
								 required={this.props.required}
                    />
                    <HelpBlock className="warning">{error}</HelpBlock>
                    <FormControl.Feedback />
                </FormGroup>
            </OverlayTrigger>
        );
    }
});

const TextField = React.createClass({
    _onChange: function (e) {
        this.props.onChange(e);
    },

    render: function () {
        let tooltip = <Tooltip id={this.props.label}>{this.props.label}</Tooltip>;
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name : "";
        var type = (this.props["data-type"] != null) ? this.props["data-type"]: undefined;
        var len = (this.props["data-len"] != null) ? this.props["data-len"]: undefined;
        var validationState = (this.props.errors[name]) ? 'error' : null;
        var error = this.props.errors[name];
        return (
            <OverlayTrigger overlay={tooltip} placement="top">
                <FormGroup validationState={validationState}>
                    <FormControl type="text"
                                 placeholder={label}
                                 name={name}
                                 data-type={type}
                                 data-len={len}
                                 onChange={this._onChange}
								 required={this.props.required}
                    />
                    <HelpBlock className="warning">{error}</HelpBlock>
                    <FormControl.Feedback />
                </FormGroup>
            </OverlayTrigger>
        );
    }
});


var NewRecommendationForm = React.createClass({

	getInitialState: function () {
		return {
			loading: false,
			errors: {},
			equipment_number: '',
			fields: [
				'name',
				'test_type_id',
				'code',
				'description'
			],
			changedFields: [],
			public_recommendation: false
		}
	},

	_create: function () {
		var fields = this.state.changedFields;
		var data = {};
		for (var i = 0; i < fields.length; i++){
			var key= fields[i];
			var value = this.state[key];
            if (value == ""){
                value = null;
            }
            data[key] = value;
		}
		delete data["public_recommendation"];	// For showing/hiding fields only
		if (!this.state.public_recommendation) {
			this._createTestRecommendation(data, this);
		} else {
			var that = this;
			return $.authorizedAjax({
				url: '/api/v1.0/recommendation/',
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(data),
				success: function (response, textStatus) {
					NotificationManager.success("Predefined recommendation has been successfully added");
					that.props.onSuccess(response.result, data.test_type_id, "predefined");
				},
				beforeSend: function () {
					this.setState({loading: true});
				}.bind(this)
			})
		}
	},

	_createTestRecommendation: function (data, that) {
		// Create test recommendation, do not save to all predefined recommendations
		data.recommendation_notes = data["description"];
		data.test_result_id = this.props.testResultId;
		data.recommendation_id = this.props.recommendationId;
		["code", "name", "description"].forEach(e => delete data[e]);
		return $.authorizedAjax({
			url: '/api/v1.0/test_recommendation/',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function (response, textStatus) {
				NotificationManager.success("Test recommendation has been successfully added");
				that.props.onSuccess(response.result, data.test_type_id, "test");
			},
			beforeSend: function () {
				this.setState({loading: true});
			}.bind(this)
		})
	},

	_onSubmit: function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (!this.is_valid()){
			NotificationManager.error('Please correct the errors');
			return false;
		}
		var xhr = this._create();
		if (xhr){
			xhr.done(this._onSuccess)
			.fail(this._onError)
			.always(this.hideLoading);
		}
	},
	hideLoading: function () {
		this.setState({loading: false});
	},
	_onSuccess: function (data) {
		//this.refs.eqtype_form.getDOMNode().reset();
		//this.setState(this.getInitialState());
	},
	_onError: function (data) {
		var message = "Failed to create";
		var res = data.responseJSON;
		if (res.message) {
			message = data.responseJSON.message;
		}
		if (res.error) {
			// We get list of errors
			if (data.status >= 500) {
				message = res.error.join(". ");
			} else if (res.error instanceof Object){
				// We get object of errors with field names as key
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
		// Do not propagate changes to the parent form
		// as they are local for this form's state
		e.stopPropagation();
		var state = {};
		if (e.target.type == 'checkbox') {
			state[e.target.name] = e.target.checked;
		} else if (e.target.type == 'select-one') {
			state[e.target.name] = e.target.value;
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

    is_valid: function () {
        return (Object.keys(this.state.errors).length <= 0);
    },

	_formGroupClass: function (field) {
		var className = "form-group ";
		if (field) {
			className += " has-error"
		}
		return className;
	},

	handleClick: function() {
		document.getElementById('test_prof').remove();
	},

	render: function () {
		return (
			<div className="form-container">
				<form method="post" action="#" onSubmit={this._onSubmit} onChange={this._onChange}>
						<div className="row">
							<div className="col-md-4">
								<TestTypeSelectField
									selectedSubtests={this.props.selectedSubtests}
									testType={this.props.testType}
									value={this.state.test_type_id}
									name="test_type_id"
									handleChange={this._onChange}
									errors={this.state.errors}
									required/>
							</div>
							<div className="col-md-1">
								<Checkbox checked={this.state.public_recommendation} name="public_recommendation">Public</Checkbox>
							</div>
							{this.state.public_recommendation ?
								<div className="col-md-4">
								 <TextField onChange={this._onChange}
                                           label="Name *"
                                           name="name"
                                           value={this.state.name}
                                           errors={this.state.errors}
                                           data-len="50"
									 	   required/>
								</div>
								: null
							}
							{this.state.public_recommendation ?
								<div className="col-md-3">
									<TextField onChange={this._onChange}
											   label="Code"
											   name="code"
											   value={this.state.code}
											   errors={this.state.errors}
											   data-len="50"/>
								</div>
								: null
							}

						</div>
						<div className="row">
							<div className="col-md-12">
								<TextArea label="Recommendations"
                                          name='description'
                                          value={this.state.description}
                                          onChange={this._onChange}
                                          errors={this.state.errors}/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 ">
								<Button bsStyle="success"
										className="btn btn-success pull-right"
										type="submit"
								>Add {this.state.public_recommendation ? "Predefined" : "Test"} Recommendation</Button>
								&nbsp;
								<Button bsStyle="danger"
										className="pull-right"
										onClick={this.props.handleClose}
										className="pull-right margin-right-xs"
								>Cancel</Button>
							</div>
						</div>
				</form>
			</div>
		);
	}
});


export default NewRecommendationForm;
