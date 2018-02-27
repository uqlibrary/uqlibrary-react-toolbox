import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';

// Icons
import NavigationClose from 'material-ui/svg-icons/navigation/close'; // close
import AlertError from 'material-ui/svg-icons/alert/error'; // 'error'
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline'; // 'error_outline'
import AlertWarning from 'material-ui/svg-icons/alert/warning'; // 'warning'
import ActionInfo from 'material-ui/svg-icons/action/info'; // 'info'
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline'; // 'info_outline'
import ActionHelp from 'material-ui/svg-icons/action/help'; // 'help'
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline'; // 'help'
import ActionDone from 'material-ui/svg-icons/action/done'; // 'done'

export default class Alert extends PureComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline', 'done']),
        action: PropTypes.func,
        actionButtonLabel: PropTypes.string,
        allowDismiss: PropTypes.bool,
        dismissAction: PropTypes.func,
        showLoader: PropTypes.bool
    };

    static defaultProps = {
        message: 'Unexpected error',
        title: 'Error',
        type: 'error',
        allowDismiss: false,
        showLoader: false
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.message !== this.props.message
            || nextProps.title !== this.props.title
            || nextProps.type !== this.props.type
            || nextProps.action !== this.props.action
            || nextProps.actionButtonLabel !== this.props.actionButtonLabel
            || nextProps.allowDismiss !== this.props.allowDismiss
            || nextProps.dismissAction !== this.props.dismissAction;
    }

    _getIcon(type, showLoader) {
        console.log(type + showLoader);
        let thisIcon = null;
        if(!showLoader) {
            switch(type) {
                case 'help':
                    thisIcon = <ActionHelp className="material-icons" />;
                    break;
                case 'help_outline':
                    thisIcon = <ActionHelpOutline className="material-icons" />;
                    break;
                case 'error':
                    thisIcon = <AlertError className="material-icons" />;
                    break;
                case 'error_outline':
                    thisIcon = <AlertErrorOutline className="material-icons" />;
                    break;
                case 'warning':
                    thisIcon = <AlertWarning className="material-icons" />;
                    break;
                case 'info':
                    thisIcon = <ActionInfo className="material-icons" />;
                    break;
                case 'info_outline':
                    thisIcon = <ActionInfoOutline className="material-icons" />;
                    break;
                case 'done':
                    thisIcon = <ActionDone className="material-icons" />;
                    break;
                default:
                    break;
            }
        } else {
            thisIcon = <CircularProgress className="alertSpinner" size={32} thickness={4} />;
        }
        return thisIcon;
    }

    render() {
        return (
            <div className={this.props.type + ' alertWrapper '}>
                <div className="columns is-multiline is-mobile">
                    <div className={`column is-narrow alertIcon${this.props.action ? ' linked' : ''}`} onClick={this.props.action}
                        onKeyDown={this.props.action}>
                        {this._getIcon(this.props.type, this.props.showLoader)}
                    </div>
                    <div className={`column alertText${this.props.action ? ' linked' : ''}`} onClick={this.props.action} onKeyDown={this.props.action}>
                        <div><b>{this.props.title}</b>&nbsp;-&nbsp;{this.props.message}</div>
                    </div>
                    {
                        this.props.action && this.props.actionButtonLabel &&
                        <div
                            className={`column is-narrow-tablet is-12-mobile${(!this.props.allowDismiss && !this.props.dismissAction) ? ' noDismiss' : ''}`}>
                            <FlatButton
                                label={this.props.actionButtonLabel}
                                onTouchTap={this.props.action}
                                fullWidth
                                className="alertAction"/>
                        </div>
                    }
                    {
                        this.props.allowDismiss && this.props.dismissAction &&
                        <div className="column is-narrow-tablet is-hidden-mobile">
                            <IconButton onTouchTap={this.props.dismissAction} className="alertDismissButton">
                                <NavigationClose className="alertDismiss"/>
                            </IconButton>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

