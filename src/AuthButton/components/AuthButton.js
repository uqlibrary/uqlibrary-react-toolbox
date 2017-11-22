import React from 'react';
import IconButton from 'material-ui/IconButton';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import SocialPerson from 'material-ui/svg-icons/social/person';

export const AuthButton = ({isAuthorizedUser, signOutTooltipText = 'Log out', signInTooltipText = 'Log in', hoveredStyle, onClick}) => {
    return (
        <div className="auth-button-wrapper">
            <IconButton
                tooltipPosition="bottom-left"
                onClick={onClick}
                hoveredStyle={hoveredStyle}
                tooltip={isAuthorizedUser ? signOutTooltipText : signInTooltipText}
                className={isAuthorizedUser ? 'log-out-button' : 'log-in-button'}>
                {isAuthorizedUser ? <SocialPerson/> : <SocialPersonOutline/>}
            </IconButton>
        </div>
    );
};
