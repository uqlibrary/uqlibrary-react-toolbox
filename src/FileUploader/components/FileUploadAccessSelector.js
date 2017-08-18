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
            }
        },
        defaultConfig: {
            fileMetaKey: 'access_condition_id',
            fieldName: 'accessDate',
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
        this.props.onAccessChanged({ key: [this.props.defaultConfig.fileMetaKey], value: value });
    };

    render() {
        const {initialValue, accessSelectOptionsText} = this.props.locale;
        const {fieldName, accessIds} = this.props.defaultConfig;

        const accessOptions = accessIds.map((access, index) => (<MenuItem value={ access } primaryText={ accessSelectOptionsText[access] } key={ index } />));

        return (
            <SelectField
                id={ fieldName }
                name={ fieldName }
                autoWidth
                className="selectField"
                hintText={ initialValue }
                maxHeight={ 250 }
                onChange={ this._onChange }
                value={ this.state.value }>
                <MenuItem value={ null } primaryText={ initialValue } key={ -1 } disabled/>
                { accessOptions }
            </SelectField>
        );
    }
}
