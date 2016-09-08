import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import {findDOMNode} from 'react-dom';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


const TextField = React.createClass({
    render: function () {
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name : "";
        var value = (this.props.value != null) ? this.props.value : "";
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type="text"
                             placeholder={label}
                             name={name}
                             value={value}
                />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
});

const CheckBox = React.createClass({
    render: function () {
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name: "";
        var checked = (this.props.value != null) ? this.props.value: false;
        var is_checked = (checked) ? 'checked': '';
        return (
            <Checkbox checked={is_checked} name={name}>
                {label}
            </Checkbox>
        );
    }
});



var InductionMachineParams = React.createClass({

    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            fields: ["phase_number", "sealed", "model", "welded_cover", "current_rating", "threephase",
                "hp", "kva", "pf"

            ]
        }
    },

    componentDidMount: function () {
    },

    _create: function () {
        var fields = this.state.fields;
        var data = {test_result_id: this.props.testResultId};
        var url = '/api/v1.0/' + this.props.tableName + '/';
        var type = 'POST';
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            data[key] = this.state[key];
        }
        if ('id' in this.state) {
            url += this.state['id'];
            type = 'PUT';
        }
        return $.ajax({
            url: url,
            type: type,
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
        var errors = this._validate();
        if (Object.keys(errors).length != 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        var xhr = this._create();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        // this.setState(this.getInitialState());

    },

    _onError: function (data) {

        var message = "Failed to create";
        var res = data.responseJSON;
        if (res.message) {
            message = data.responseJSON.message;
        }
        if (res.error) {
            this.setState({
                errors: res.error
            });
        }
    },

    _onChange: function (e) {
        var state = {};
        state[e.target.name] = $.trim(e.target.value);
        this.setState(state);
    },

    _validate: function () {
        var errors = {};
        // if(this.state.created_by_id == "") {
        //   errors.created_by_id = "Create by field is required";
        // }
        // if(this.state.performed_by_id == "") {
        //     errors.performed_by_id = "Performed by field is required";
        // }
        return errors;
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-2">
                    <TextField label="Current Rating" name="current_rating" value={this.state.current_rating}/>
                </div>
                <div className="col-md-2">
                    <TextField label="Hp" name="hp" value={this.state.hp}/>
                </div>
                <div className="col-md-2">
                    <TextField label="Kva" name="kva" value={this.state.kva}/>
                </div>
                <div className="col-md-2">
                    <TextField label="Pf" name="pf" value={this.state.pf}/>
                </div>
                <div className="col-md-1 ">
                    <b>Sealed</b>  <CheckBox name="sealed" value={this.state.tank_winding_flag}/>
                </div>
                <div className="col-md-1">
                    <b>Welded Cover</b> <CheckBox name="welded_cover" value={this.state.welded_cover}/>
                </div>
            </div>
        )
    }
});



export default InductionMachineParams;