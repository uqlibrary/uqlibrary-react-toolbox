import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

const moment = require('moment');

export default class FileUploadEmbargoDate extends Component {
    static propTypes = {
        locale: PropTypes.object,
        defaultConfig: PropTypes.object,
        onDateChanged: PropTypes.func
    };

    static defaultProps = {
        locale: {
            datePickerLocale: 'en-AU',
            errorMessage: 'This field is required'
        },
        defaultConfig: {
            fileMetaKey: 'date',
            dateFormat: global.Intl.DateTimeFormat,
            currentDateString: moment().format('DD/MM/YYYY'),
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
        this.props.onDateChanged({ key: [this.props.defaultConfig.fileMetaKey], value: date });
    };

    render() {
        const {datePickerLocale, errorMessage } = this.props.locale;
        const {dateFormat, currentDateString, fieldName} = this.props.defaultConfig;
        return (
            <DatePicker
                className="datepicker"
                DateTimeFormat={dateFormat}
                firstDayOfWeek={0}
                hintText={currentDateString}
                locale={datePickerLocale}
                errorText={this.state.value === null ? errorMessage : ''}
                name={fieldName}
                onChange={this._onChange}
            />
        );
    }
}
