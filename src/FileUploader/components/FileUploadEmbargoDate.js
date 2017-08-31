import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

const moment = require('moment');

export default class FileUploadEmbargoDate extends Component {
    static propTypes = {
        locale: PropTypes.object,
        defaultConfig: PropTypes.object,
        onDateChanged: PropTypes.func,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        locale: {
            datePickerLocale: 'en-AU'
        },
        defaultConfig: {
            fileMetaKey: 'date',
            dateFormat: global.Intl.DateTimeFormat,
            fieldName: 'accessDate'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: new Date()
        };
    }

    _onChange = (event, value) => {
        const date = moment(value);
        this.setState({ value: date });
        this.props.onDateChanged({ key: this.props.defaultConfig.fileMetaKey, value: date.format('DD/MM/YYYY') });
    };

    render() {
        const {datePickerLocale} = this.props.locale;
        const {dateFormat, fieldName} = this.props.defaultConfig;
        return (
            <DatePicker
                className="embargo-date-picker requiredField"
                DateTimeFormat={dateFormat}
                firstDayOfWeek={0}
                locale={datePickerLocale}
                autoOk
                value={this.state.value}
                id={fieldName}
                name={fieldName}
                onChange={this._onChange}
                disabled={ this.props.disabled }
            />
        );
    }
}
