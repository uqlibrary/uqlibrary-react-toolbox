import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

const moment = require('moment');

export default class FileUploadEmbargoDate extends Component {
    static propTypes = {
        locale: PropTypes.object,
        onDateChanged: PropTypes.func
    };

    static defaultProps = {
        locale: {
            fileMetaKey: 'date',
            dateFormat: global.Intl.DateTimeFormat,
            currentDateString: moment().format('DD/MM/YYYY'),
            fieldName: 'accessDate'
        }
    };

    constructor(props) {
        super(props);
    }

    _onChange = (event, value) => {
        this.props.onDateChanged({ key: [this.props.locale.fileMetaKey], value: moment(value).format('DD/MM/YYYY') });
    };

    render() {
        const {dateFormat, currentDateString, fieldName} = this.props.locale;
        return (
            <DatePicker
                className="datepicker"
                DateTimeFormat={dateFormat}
                firstDayOfWeek={0}
                hintText={currentDateString}
                locale="en-AU"
                name={ fieldName }
                onChange={ this._onChange }
            />
        );
    }
}
