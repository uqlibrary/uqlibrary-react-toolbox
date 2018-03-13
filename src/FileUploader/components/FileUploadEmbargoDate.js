import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

export default class FileUploadEmbargoDate extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        locale: PropTypes.object,
        defaultConfig: PropTypes.object,
        disabled: PropTypes.bool,
        value: PropTypes.instanceOf(Date),
        minDate: PropTypes.instanceOf(Date)
    };

    static defaultProps = {
        locale: {
            datePickerLocale: 'en-AU'
        },
        defaultConfig: {
            dateTimeFormat: global.Intl.DateTimeFormat,
            fieldName: 'accessDate'
        },
        value: new Date(),
        minDate: new Date()
    };

    constructor(props) {
        super(props);
        this.datePickerRef = null;
    }

    _onChange = (event, value) => {
        if (this.props.onChange) this.props.onChange(value);
    };

    _onKeyPress = () => {
        this.datePickerRef.openDialog();
    };

    render() {
        const {datePickerLocale} = this.props.locale;
        const {dateTimeFormat, fieldName} = this.props.defaultConfig;
        return (
            <div tabIndex={0} onKeyPress={this._onKeyPress}>
                <DatePicker
                    className="embargo-date-picker requiredField"
                    DateTimeFormat={dateTimeFormat}
                    firstDayOfWeek={0}
                    locale={datePickerLocale}
                    autoOk
                    minDate={this.props.minDate}
                    value={this.props.value}
                    id={fieldName}
                    name={fieldName}
                    onChange={this._onChange}
                    disabled={this.props.disabled}
                    ref={(datePicker) => (this.datePickerRef = datePicker)}
                />
            </div>
        );
    }
}
