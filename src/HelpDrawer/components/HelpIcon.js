import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

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

    const classNames = `form-help-icon is-narrow is-pulled right ${inline ? 'inline' : ''}`;

    return (
        <div className={classNames} style={{...style}}>
            <IconButton tooltip={tooltip} tooltipPosition="bottom-left" onClick={setDrawerContent} className="is-pulled-right">
                <FontIcon className="material-icons helpIcon" color={tooltipIconColor}>help_outline</FontIcon>
            </IconButton>
        </div>
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

export default HelpIcon;
