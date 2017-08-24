import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

export const OPEN_ACCESS_ID = 9;
export const CLOSED_ACCESS_ID = 8;

export default class FileUploadAccessSelector extends Component {
    static propTypes = {
        onAccessChanged: PropTypes.func,
        locale: PropTypes.object,
        defaultConfig: PropTypes.object
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
        defaultConfig: {
            fileMetaKey: 'access_condition_id',
            fieldName: 'accessCondition',
            accessIds: [
                CLOSED_ACCESS_ID,
                OPEN_ACCESS_ID
            ]
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    _onChange = (event, index, value) => {
        this.setState({ value: value });
        this.props.onAccessChanged({ key: this.props.defaultConfig.fileMetaKey, value: value });
    };

    render() {
        const {initialValue, accessSelectOptionsText, errorMessage} = this.props.locale;
        const {fieldName, accessIds} = this.props.defaultConfig;

        const accessOptions = accessIds.map((access, index) => (<MenuItem value={ access } primaryText={ accessSelectOptionsText[access] } key={ index } />));

        return (
            <SelectField
                id={ fieldName }
                name={ fieldName }
                className="selectField requiredField"
                hintText={ initialValue }
                maxHeight={ 250 }
                onChange={ this._onChange }
                errorText={ this.state.value === null ? errorMessage : '' }
                floatingLabelFixed
                value={ this.state.value }>
                <MenuItem value={ -1 } primaryText={ initialValue }  key={ -1 } disabled />
                { accessOptions }
            </SelectField>
        );
    }
}
