import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class LookupForm extends Component {
    static propTypes = {
        onAdd: PropTypes.func.isRequired,
        locale: PropTypes.object,
        disabled: PropTypes.bool,
        inputField: PropTypes.func,
        errorText: PropTypes.string
    };

    static defaultProps = {
        isValid: () => '',
        locale: {
            inputFieldLabel: 'Item name',
            inputFieldHint: 'Please type the item name, then select from the list',
        }
    }

    constructor(props) {
        super(props);
    }

    addKeyValueItem = (item) => {
        this.props.onAdd(item);
    }

    render() {
        console.log(this.props.errorText);
        return (
            <div className="columns">
                <div className="column">
                    {
                        this.props.inputField &&
                        <this.props.inputField
                            input={{onChange: this.props.onAdd}}
                            floatingLabelText={this.props.locale.inputFieldLabel}
                            hintText={this.props.locale.inputFieldHint}
                            disabled={this.props.disabled}
                            errorText={this.props.errorText} />
                    }
                </div>
            </div>
        );
    }
}
