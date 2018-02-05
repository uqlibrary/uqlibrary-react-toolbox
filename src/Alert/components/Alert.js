import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Alert extends PureComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline', 'done']),
        action: PropTypes.func,
        actionButtonLabel: PropTypes.string,
        allowDismiss: PropTypes.bool,
        dismissAction: PropTypes.func
    };

    static defaultProps = {
        message: 'Unexpected error',
        title: 'Error',
        type: 'error',
        allowDismiss: false
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

    render() {
        return (
            <div className={this.props.type + ' alertWrapper '}>
                <div className="columns is-multiline is-mobile">
                    <div className={`column is-narrow alertIcon${this.props.action ? ' linked' : ''}`} onClick={this.props.action}
                        onKeyDown={this.props.action}>
                        <FontIcon className="material-icons">{this.props.type}</FontIcon>
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

