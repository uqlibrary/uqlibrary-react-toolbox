import React from 'react';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

const Alert = ({title, message, type}) => {
        return (
            <div className={type + ' alertWrapper columns'}>
                <div className="column is-narrow alertIcon">
                    <FontIcon className="material-icons">{validAlertType}</FontIcon>
                </div>
                {title && <div className="column title is-4">{title}</div>}
                <div className="column alertText">
                    <div>{message}</div>
                </div>
            </div>
        );
    }

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline'])
};

export default Alert;
