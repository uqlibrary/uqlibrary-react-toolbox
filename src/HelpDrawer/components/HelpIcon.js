import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const propTypes = {
    title: React.PropTypes.string,
    text: React.PropTypes.any.isRequired,
    buttonLabel: React.PropTypes.string,
    onClick: React.PropTypes.func,
    displayType: React.PropTypes.bool,
    style: React.PropTypes.object
};

const defaultProps = {
    displayType: false,
    style: {}
};

const HelpIcon = ({title, text, buttonLabel, onClick, displayType, style}) => {
    const setDrawerContent = () => {
        onClick(title, text, buttonLabel);
    };

    const classNames = `form-help-icon ${displayType ? 'inline' : ''}`;

    return (
        <div className={classNames} style={{...style}}>
            <IconButton tooltip="Click for more information" tooltipPosition="bottom-center" onClick={setDrawerContent}>
                <FontIcon className="material-icons" color="rgba(0,0,0,1) !important">help_outline</FontIcon>
            </IconButton>
        </div>
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

export default HelpIcon;
