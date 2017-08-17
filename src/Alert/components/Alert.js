import React from 'react';
import { PropTypes } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Alert = ({title, message, type, outsideLayout, action, actionButtonLabel, allowDismiss, dismissAction}) => {
    return (
      <div className={outsideLayout ? 'layout-card forAlerts' : ''}>
          <div className={type + ' alertWrapper'}>
              <div className="columns is-gapless is-multiline is-mobile">
                  <div className="column is-narrow alertIcon">
                      <FontIcon className="material-icons">{type}</FontIcon>
                  </div>
                  <div className="column alertText">
                      <span className="alertTitle">{title} - </span>{message}
                  </div>
                  {
                      action && actionButtonLabel &&
                      <div className="column is-narrow is-12-mobile">
                          <FlatButton label={actionButtonLabel}
                                      onTouchTap={action}
                                      className="alertAction"/>
                      </div>
                  }
                  {
                      allowDismiss && dismissAction &&
                      <div className="column is-narrow is-hidden-mobile">
                          <IconButton onTouchTap={dismissAction}>
                              <NavigationClose className="alertDismiss"/>
                          </IconButton>
                      </div>
                  }
              </div>
          </div>
      </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']),
    outsideLayout: PropTypes.bool,
    action: PropTypes.func,
    actionButtonLabel: PropTypes.string,
    allowDismiss: PropTypes.bool,
    dismissAction: PropTypes.func,
};

Alert.defaultProps = {
    message: 'Unexpected error',
    title: 'Error',
    type: 'error',
    outsideLayout: false,
    allowDismiss: false
};

export default Alert;
