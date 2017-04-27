import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import 'HelpIcon.scss';

const propTypes = {
    title: PropTypes.string,
    text: PropTypes.any.isRequired,
    buttonLabel: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipIconColor: PropTypes.string,
    onClick: PropTypes.func,
    inline: PropTypes.bool,
    style: PropTypes.object
};

const defaultProps = {
    inline: false,
    style: {},
    tooltip: 'Click for more information',
    tooltipIconColor: '#CCCCCC'
};

const HelpIcon = ({title, text, buttonLabel, tooltip, tooltipIconColor, onClick, inline, style}) => {
    const setDrawerContent = () => {
        onClick(title, text, buttonLabel);
    };

    const classNames = `form-help-icon ${inline ? 'inline' : ''}`;

    return (
        <div className={classNames} style={{...style}}>
            <IconButton tooltip={tooltip} tooltipPosition="bottom-center" onClick={setDrawerContent}>
                <FontIcon className="material-icons" color={tooltipIconColor}>help_outline</FontIcon>
            </IconButton>
        </div>
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

export default HelpIcon;
