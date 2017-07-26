import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const moment = require('moment');
class PartialDateForm extends Component {
    static propTypes = {
        locale: PropTypes.object,
        onChange: PropTypes.func,
        dateFormat: PropTypes.string,
        allowPartial: PropTypes.bool,
        months: PropTypes.array
    };

    static defaultProps = {
        locale: {
            dayLabel: 'Day',
            monthLabel: 'Month',
            yearLabel: 'Year',
            validationMessage: {
                day: 'Invalid day',
                month: 'Invalid month',
                year: 'Invalid year'
            },
            minNumberCharCode: 48,
            maxNumberCharCode: 57
        },
        months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        dateFormat: 'YYYY-MM-DD',
        allowPartial: false
    };

    constructor(props) {
        super(props);
        this.state = {
            day: null,
            month: null,
            year: null
        };
        this.errors = {};
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.onChange) this.props.onChange(this._setDate(nextState));
    }

    _validate = (state) => {
        let valid;
        const { day, month, year } = state;
        const { locale } = this.props;

        this.errors.year = isNaN(year) ? locale.validationMessage.year : '';

        if (this.props.allowPartial) {
            valid = !isNaN(year) && year !== null && moment(state).isValid();
            this.errors.month = (year && month < 0) ? locale.validationMessage.month : '';
            this.errors.day = (day && year && month > -1 && !valid) ? locale.validationMessage.day : '';
        } else {
            valid = moment(state).isValid() && !isNaN(day) && day !== null && !isNaN(year) && year !== null && month !== null;
            this.errors.month = month < 0  ? locale.validationMessage.month : '';
            this.errors.day = (isNaN(day) || ((month !== null || month > -1) && year && !valid))  ? locale.validationMessage.day : '';
        }

        return valid;
    };

    _setDate = (date) => {
        if (this._validate(date)) {
            if (this.props.allowPartial) {
                date.month = date.month < 0 ? 0 : date.month;
            }
            return moment(date).format(this.props.dateFormat);
        }
        return '';
    };

    _isNumber = (event) => ((event.charCode < this.props.locale.minNumberCharCode || event.charCode > this.props.locale.maxNumberCharCode) && event.preventDefault());

    _onDateChanged = (key) => (event, index, value) => this.setState({ [key]: parseInt(event.target.value === undefined ? value : event.target.value, 10)});

    render() {
        const { locale, months } = this.props;
        const renderMonths = months.map((month, index) =>
            <MenuItem
                key={index}
                value={index}
                primaryText={month}
            />
        );

        return (
            <div className="column">
                <div className="columns">
                    <div className="column">
                        <TextField
                            name="day"
                            type="text"
                            maxLength="2"
                            style={{ marginTop: '12px' }}
                            fullWidth
                            floatingLabelText={ locale.dayLabel }
                            floatingLabelFixed
                            errorText={ this.errors.day }
                            onKeyPress={ this._isNumber }
                            onChange={ this._onDateChanged('day') }
                            onBlur={ !this.props.allowPartial ? this._onDateChanged('day') : undefined }
                        />
                    </div>
                    <div className="form-spacer"/>
                    <div className="column">
                        <SelectField
                            name="month"
                            fullWidth
                            value={ this.state.month }
                            style={{ marginTop: '12px' }}
                            floatingLabelText={ locale.monthLabel }
                            floatingLabelFixed
                            errorText={ this.errors.month }
                            onChange={ this._onDateChanged('month') }>
                            <MenuItem key={-1} value={-1} primaryText=""/>
                            { renderMonths }
                        </SelectField>
                    </div>
                    <div className="form-spacer"/>
                    <div className="column">
                        <TextField
                            name="year"
                            type="text"
                            fullWidth
                            style={{ marginTop: '12px' }}
                            maxLength="4"
                            floatingLabelText={ locale.yearLabel }
                            floatingLabelFixed
                            errorText={ this.errors.year }
                            onKeyPress={ this._isNumber }
                            onChange={ this._onDateChanged('year') }
                            onBlur={ this._onDateChanged('year') }
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default PartialDateForm;
