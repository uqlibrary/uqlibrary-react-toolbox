import React from 'react';
import { PropTypes } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

const Alert = ({title, message, type}) => {
    return (
        <div className={type + ' alertWrapper is-multiline'}>
            <div className="columns">
                <div className="column is-narrow alertIcon">
                    <FontIcon className="material-icons">{type}</FontIcon>
                </div>
                <div className="column alertTitle">
                    <span className="alertTitle title is-4">{title}</span>
                </div>
            </div>
            <div className="columns">
                <div className="column alertText">
                    <div>{message}</div>
                </div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline'])
};

export default Alert;
