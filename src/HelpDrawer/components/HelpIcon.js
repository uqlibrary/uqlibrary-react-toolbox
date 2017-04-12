import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const propTypes = {
    title: React.PropTypes.string,
    text: React.PropTypes.any.isRequired,
    buttonLabel: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    onClick: React.PropTypes.func,
    inline: React.PropTypes.bool,
    style: React.PropTypes.object
};

const defaultProps = {
    inline: false,
    style: {},
    tooltip: 'Click for more information'
};

const HelpIcon = ({title, text, buttonLabel, tooltip, onClick, inline, style}) => {
    const setDrawerContent = () => {
        onClick(title, text, buttonLabel);
    };

    const classNames = `form-help-icon ${inline ? 'inline' : ''}`;

    return (
        <div className={classNames} style={{...style}}>
            <IconButton tooltip={tooltip} tooltipPosition="bottom-center" onClick={setDrawerContent}>
                <FontIcon className="material-icons" color="#CCCCCC">help_outline</FontIcon>
            </IconButton>
        </div>
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

export default HelpIcon;
