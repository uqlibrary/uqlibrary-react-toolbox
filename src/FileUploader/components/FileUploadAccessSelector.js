import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

export const OPEN_ACCESS_ID = 9;
export const CLOSED_ACCESS_ID = 8;

export default class FileUploadAccessSelector extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        locale: PropTypes.object,
        disabled: PropTypes.bool,
        value: PropTypes.number,
        fieldName: PropTypes.string
    };

    static defaultProps = {
        locale: {
            initialValue: 'Select access conditions',
            accessSelectOptionsText: {
                [OPEN_ACCESS_ID]: 'Open Access',
                [CLOSED_ACCESS_ID]: 'Closed Access'
            },
            errorMessage: 'This field is required'
        },
        fieldName: 'accessCondition',
        value: null
    };

    constructor(props) {
        super(props);
    }

    _onChange = (event, index, value) => {
        if (this.props.onChange) this.props.onChange(value);
    };

    render() {
        const {initialValue, accessSelectOptionsText, errorMessage} = this.props.locale;
        const {fieldName, value, disabled} = this.props;

        const accessOptions = Object.keys(accessSelectOptionsText).map((access, index) => (<MenuItem value={parseInt(access, 10)} primaryText={accessSelectOptionsText[access]} key={index} />));

        return (
            <SelectField
                id={fieldName}
                name={fieldName}
                className="selectField requiredField"
                hintText={initialValue}
                dropDownMenuProps={{animated: false}}
                maxHeight={250}
                onChange={this._onChange}
                errorText={value === null ? errorMessage : ''}
                floatingLabelFixed
                disabled={disabled}
                value={value}>
                {accessOptions}
            </SelectField>
        );
    }
}
