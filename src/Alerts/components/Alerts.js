import React from 'react';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

class Alerts extends React.PureComponent {

    static propTypes = {
        alertText: PropTypes.string.isRequired,
        alertType: PropTypes.string.isRequired,
        alertState: PropTypes.string
    };

    render() {
        const {alertType, alertText, alertState} = this.props;

        // Make sure the type is a valid option, or default to help
        const validAlertTypes = ['error', 'warning', 'info', 'help'];
        const validAlertType = validAlertTypes.find(alertType) || 'help';

        return (
            <div className={{validAlertType} + ' ' + {alertState} + ' alertWrapper columns'}>
                <div className="column is-narrow alertIcon">
                    <FontIcon className="material-icons">{validAlertType}</FontIcon>
                </div>
                <div className="column alertText">
                    <div>{alertText}</div>
                </div>
            </div>
        );
    }
}

export default Alerts;

