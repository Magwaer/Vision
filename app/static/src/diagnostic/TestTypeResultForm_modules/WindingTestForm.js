import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {NotificationContainer, NotificationManager} from 'react-notifications';


var TapTestPanel = React.createClass({
    _onChange: function (e) {
        this.props.onChange(this.props.testId, e.target.name, e.target.value);
    },
    render: function () {
        var data = (this.props.data != null) ? this.props.data : {};
        var errors = this.props.errors;
        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.test_kv1) ? 'error' : null}>
                            <ControlLabel>Test KV</ControlLabel>
                            <FormControl type='text'
                                         placeholder='0'
                                         name="test_kv1"
                                         value={data.test_kv1}
                                         data-type="float"
                                         onChange={this._onChange}
                            />
                            <HelpBlock className="warning">{errors.test_kv1}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.m_meter1) ? 'error' : null}>
                            <ControlLabel>Reading</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         name="m_meter1"
                                         value={data.m_meter1}
                                         data-type="float"
                                         onChange={this._onChange}
                            />
                            <HelpBlock className="warning">{errors.m_meter1}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.m_multiplier1) ? 'error' : null}>
                            <ControlLabel>Mult.</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         name="m_multiplier1"
                                         value={data.m_multiplier1}
                                         data-type="float"
                                         onChange={this._onChange}
                            />
                            <HelpBlock className="warning">{errors.m_multiplier1}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.milliamperes) ? 'error' : null}>
                            <ControlLabel>Milliamperes</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         value={data.milliamperes}
                                         disabled
                            />
                            <HelpBlock className="warning">{errors.milliamperes}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.w_meter1) ? 'error' : null}>
                            <ControlLabel>Reading</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         name="w_meter1"
                                         value={data.w_meter1}
                                         data-type="float"
                                         onChange={this._onChange}
                            />
                            <HelpBlock className="warning">{errors.w_meter1}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.w_multiplier1) ? 'error' : null}>
                            <ControlLabel>Mult.</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         name="w_multiplier1"
                                         value={data.w_multiplier1}
                                         data-type="float"
                                         onChange={this._onChange}
                            />
                            <HelpBlock className="warning">{errors.w_multiplier1}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.watts) ? 'error' : null}>
                            <ControlLabel>Watts</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         value={data.watts}
                                         disabled
                            />
                            <HelpBlock className="warning">{errors.watts}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.pf) ? 'error' : null}>
                            <ControlLabel>PF</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         value={data.pf}
                                         disabled
                            />
                            <HelpBlock className="warning">{errors.pf}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-1">
                        <FormGroup validationState={(errors.corr) ? 'error' : null}>
                            <ControlLabel>Corr 20C</ControlLabel>
                            <FormControl type="text"
                                         placeholder="0"
                                         value={data.corr}
                                         disabled
                            />
                            <HelpBlock className="warning">{errors.corr}</HelpBlock>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                </div>
            </div>
        )
    }
});

var WindingTestForm = React.createClass({
    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            tests: [],
            maxRowId: 0,
            deleteOnSubmit: [],
            keys: 1,
            testData: {'test_result_id': 1, 'taps': []},
            fields: [
                'id', 'type_doble', 'humidity', 'test_kv1',
                'w_multiplier1', 'w_meter1', 'm_multiplier1', 'm_meter1'
            ]
        }
    },
    getUniqueKey: function() {
        var maxRowId = this.state.maxRowId + 1;
        this.state.maxRowId += 1;
        return "key-" + maxRowId;
    },
    addResultToState: function (result) {
        var res = (result['result']);
        var fields = this.state.fields;
        var tests = [];
        for ( var i = 0; i < res.length; i++ ) {
            var test = { uniqueKey: this.getUniqueKey() };
            var data = res[i];
            for (var j = 0; j < fields.length; j++) {
                var key = fields[j];
                if (data.hasOwnProperty(key)) {
                    test[key] = data[key];
                }
            }
            tests[i] = test;
        }
        this.setState({tests: tests});
    },

    componentDidMount: function () {
        var source = '/api/v1.0/' + this.props.tableName + '/?test_result_id=' + this.props.testResultId;
        this.serverRequest = $.authorizedGet(source, this.addResultToState, 'json');
    },

    _create: function () {
        var fields = this.state.fields;
        var tests = this.state.tests;
        var data = [];
        for (var i = 0; i < tests.length; i++) {
            var test = {test_result_id: this.props.testResultId};
            var tap = tests[i.toString()];
            for (var j = 0; j < fields.length; j++) {
                var key = fields[j];
                test[key] = tap[key];
            }
            data.push(test)
        }
        return $.authorizedAjax({
            url: '/api/v1.0/test_result/multi/' + this.props.tableName,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    },
    _delete: function (id) {
        return $.authorizedAjax({
            url: '/api/v1.0/' + this.props.tableName + '/' + id,
            type: 'DELETE',
        })
    },
    _onSubmit: function (e) {
        e.preventDefault();
        // Do not propagate the submit event of the main form
        e.stopPropagation();
        if (!this.is_valid()){
			NotificationManager.error('Please correct the errors');
            e.stopPropagation();
			return false;
		}
        this.state.tests = this.refs.table.state.data;
        var xhr = this._create();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading);

        for (var i = 0; i < this.state.deleteOnSubmit.length; i++) {
            var xhr_del = this._delete(this.state.deleteOnSubmit[i]);
            xhr_del.done(this._onDeleteSuccess)
                   .fail(this._onError)
        }
        this.state.deleteOnSubmit = [];
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        // this.setState(this.getInitialState());
        this.addResultToState(data);
        NotificationManager.success('Test values have been saved successfully.');
    },
    _onDeleteSuccess: function (data) {
        NotificationManager.success('Test values have been deleted successfully.');
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
    _validate: function (e) {
        var errors = [];
        var error;
        error = this._validateFieldType(e.target.value, e.target.getAttribute("data-type"));
        if (error){
            errors.push(error);
        }
        return errors;
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

    _formGroupClass: function (field) {
        var className = "form-group ";
        if (field) {
            className += " has-error"
        }
        return className;
    },
    addToDeleteOnSubmit: function(el) {
        if (el.hasOwnProperty('id')) {
            this.state.deleteOnSubmit.push(el.id);
        }
    },
    addNewStringToTable: function() {
        var newRow = { uniqueKey: this.getUniqueKey() };
        this.refs.table.handleAddRow(newRow);
    },
    deleteStringsFromTable: function() {
        var selectedRowKeys = this.refs.table.state.selectedRowKeys;
        var table = this.refs.table.state.data;
        var selectedRows = table.filter(function(el){
            return selectedRowKeys.indexOf(el.uniqueKey) !== -1;
        });
        selectedRows.map(this.addToDeleteOnSubmit);
        var result = this.refs.table.handleDropRow(selectedRowKeys);
        if( result ) {
        }
    },
    dataFormatPosition: function(cell, row, formatExtraData, rowIdx){
        return rowIdx + 1;
    },
    _validateDict: {
        test_kv1: {data_type: "float", label: "Test KV"},
        m_meter1: {data_type: "float", label: "Reading (3d column)"},
        m_multiplier1: {data_type: "float", label: "Mult.(4th column)"},
        w_meter1: {data_type: "float", label: "Reading(6th column)"},
        w_multiplier1: {data_type: "float", label: "Mult.(7th column)"},
    },
    _validateFieldType: function (value, type){
        var error = "";
        if (type != undefined && value){
            var typePatterns = {
                "float": /^(-|\+?)[0-9]+(\.)?[0-9]*$/,
                "int": /^(-|\+)?(0|[1-9]\d*)$/,
            };
            if (!typePatterns[type].test(value)){
                error = "Invalid " + type + " value";
            }
        }
        return error;
    },
    is_valid: function () {
        if (Object.keys(this.state.errors).length > 0) {
            return false;
        }
        var fields = this.state.fields.slice();
        var index = fields.indexOf("id");
        if (index >= 0) {
            fields.splice( index, 1 );
        }
        var tests = this.state.tests;
        var is_valid = true;
        var msg = '';
        
        for (var i = 0; i < tests.length; i++) {
            var tap = tests[i];
            for (var j = 0; j < fields.length; j++) {
                var field_name = fields[j];
                if (tap.hasOwnProperty(field_name)) {
                    var value = tap[field_name];
                    if (value) {
                        var data_type = this._validateDict[field_name]['data_type'];
                        var label = this._validateDict[field_name]['label'];
                        var error = this._validateFieldType(value, data_type);
                        msg = 'Value of (' + label + ') in row N' + ( i + 1 )
                             + ' must be of type ' + data_type + '      \n\n';
                        if (error) {
                            is_valid = false;
                            NotificationManager.error(msg, 'Validation error', 20000);
                        }
                    }
                }
            }
        }
        return is_valid;
    },
    beforeSaveCell: function(row, name, value) {
        var data_type = this._validateDict[name]['data_type'];
        var label = this._validateDict[name]['label'];
        var error = this._validateFieldType(value, data_type);
        if (error) {
            NotificationManager.error('Value of (' + label + ') must by of type ' + data_type);
        }
        return true;
    },
    render: function () {
        return (
            <div className="form-container">
                <form method="post" action="#" onSubmit={this._onSubmit}>
                    <BootstrapTable data={this.state.tests}
                                    striped={true}
                                    hover={true}
                                    condensed={true}
                                    ignoreSinglePage={true}
                                    selectRow={{mode: "checkbox", clickToSelect: true, bgColor: "rgb(238, 193, 213)",}}
                                    cellEdit={{mode: "click", blurToSave:true, beforeSaveCell:this.beforeSaveCell}}
                                    ref="table"
                    >
                        <TableHeaderColumn dataField="id" hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="uniqueKey" isKey hidden>Key</TableHeaderColumn>
                        <TableHeaderColumn dataField="position"
                                           dataFormat={this.dataFormatPosition}
                        >N</TableHeaderColumn>
                        <TableHeaderColumn dataField="test_kv1">Test KV</TableHeaderColumn>
                        <TableHeaderColumn dataField="m_meter1">Reading</TableHeaderColumn>
                        <TableHeaderColumn dataField="m_multiplier1">Mult.</TableHeaderColumn>
                        <TableHeaderColumn editable={false}>Milliamperes</TableHeaderColumn>
                        <TableHeaderColumn dataField="w_meter1">Reading</TableHeaderColumn>
                        <TableHeaderColumn dataField="w_multiplier1">Mult.</TableHeaderColumn>
                        <TableHeaderColumn editable={false}>Watts</TableHeaderColumn>
                        <TableHeaderColumn editable={false}>PF</TableHeaderColumn>
                        <TableHeaderColumn editable={false}>Corr 20C</TableHeaderColumn>

                    </BootstrapTable>
                    <div className="row">
                        <div className="col-md-2">
                            <a href="javascript:void(0)"
                               className="glyphicon glyphicon-plus"
                               onClick={this.addNewStringToTable}
                               aria-hidden="true"
                            >Add new</a>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <a href="javascript:void(0)"
                                   className="glyphicon glyphicon-minus"
                                   onClick={this.deleteStringsFromTable}
                                   aria-hidden="true"
                                >Delete selected</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <Button bsStyle="success"
                                    className="pull-right"
                                    type="submit">Save</Button>
                            &nbsp;
                            <Button bsStyle="danger"
                                    className="pull-right margin-right-xs"
                                    onClick={this.props.handleClose}
                            >Cancel</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

export default WindingTestForm;
