import React from 'react';
import IconButton from 'material-ui/IconButton';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import SocialPerson from 'material-ui/svg-icons/social/person';
import PropTypes from 'prop-types';

class AuthButton extends React.Component {
    static propTypes = {
        isAuthorizedUser: PropTypes.bool.isRequired,
        signOutTooltipText: PropTypes.string,
        signInTooltipText: PropTypes.string,
        hoveredStyle: PropTypes.object,
        onClick: PropTypes.func
    }

    static defaultProps = {
        signOutTooltipText: 'Log out',
        signInTooltipText: 'Log in'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="auth-button-wrapper">
                <IconButton tooltipPosition="bottom-left" onClick={this.props.onClick}
                    hoveredStyle={this.props.hoveredStyle}
                    tooltip={this.props.isAuthorizedUser ? this.props.signOutTooltipText : this.props.signInTooltipText}
                    className={this.props.isAuthorizedUser ? 'log-out-button' : 'log-in-button'}>
                    {this.props.isAuthorizedUser ? <SocialPerson /> : <SocialPersonOutline />}
                </IconButton>
            </div>
        );
    }
}

export default AuthButton;
