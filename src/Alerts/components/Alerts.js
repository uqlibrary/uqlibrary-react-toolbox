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

        // TODO: Get these valid types externally - they match with material icon names
        const validAlertTypes = ['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline'];
        const validStateTypes = ['hidden', 'visible'];
        const validAlertType = validAlertTypes.find(type => type === alertType) || 'help';
        const validAlertState = validStateTypes.find(type => type === alertState) || 'visible';

        return (
            <div className={validAlertType + ' ' + validAlertState + ' alertWrapper columns'}>
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
