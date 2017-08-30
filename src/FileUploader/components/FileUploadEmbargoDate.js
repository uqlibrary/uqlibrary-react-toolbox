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
            datePickerLocale: 'en-AU',
            errorMessage: 'This field is required',
            datePickerHint: 'Select embargo date'
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
            value: null
        };
    }

    _onChange = (event, value) => {
        const date = moment(value).format('DD/MM/YYYY');
        this.setState({ value: date });
        this.props.onDateChanged({ key: this.props.defaultConfig.fileMetaKey, value: date });
    };

    render() {
        const {datePickerLocale, errorMessage, datePickerHint } = this.props.locale;
        const {dateFormat, fieldName} = this.props.defaultConfig;
        return (
            <DatePicker
                className="embargo-date-picker requiredField"
                DateTimeFormat={dateFormat}
                firstDayOfWeek={0}
                hintText={datePickerHint}
                locale={datePickerLocale}
                autoOk
                errorText={this.state.value === null ? errorMessage : ''}
                id={fieldName}
                name={fieldName}
                onChange={this._onChange}
                disabled={ this.props.disabled }
            />
        );
    }
}
