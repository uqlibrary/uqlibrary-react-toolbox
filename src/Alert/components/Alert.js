import React from 'react';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Alert = ({title, message, type, action, actionButtonLabel, allowDismiss, dismissAction}) => {
    return (
        <div className="forAlerts">
            <div className={type + ' alertWrapper'}>
                <div className="columns is-multiline is-mobile">
                    <div className="column is-narrow alertIcon">
                        <FontIcon className="material-icons">{type}</FontIcon>
                    </div>
                    <div className="column alertText">
                        <div><b>{title}</b>&nbsp;-&nbsp;{message}</div>
                    </div>
                    {
                        action && actionButtonLabel &&
                        <div className="column is-narrow is-12-mobile">
                            <FlatButton
                                label={actionButtonLabel}
                                onTouchTap={action}
                                className="alertAction"/>
                        </div>
                    }
                    {
                        allowDismiss && dismissAction &&
                        <div className="column is-narrow is-hidden-mobile">
                            <IconButton onTouchTap={dismissAction}>
                                <NavigationClose className="alertDismiss"/>
                            </IconButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline', 'done']),
    action: PropTypes.func,
    actionButtonLabel: PropTypes.string,
    allowDismiss: PropTypes.bool,
    dismissAction: PropTypes.func,
};

Alert.defaultProps = {
    message: 'Unexpected error',
    title: 'Error',
    type: 'error',
    allowDismiss: false
};

export default Alert;
