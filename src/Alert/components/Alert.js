import React from 'react';
import { PropTypes } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
const Alert = ({title, message, type, outsideLayout}) => {
    return (
      <div className={outsideLayout ? 'layout-card forAlerts' : ''}>
          <div className={type + ' alertWrapper'}>
              <div className="columns is-gapless is-multiline">
                  <div className="column is-narrow alertIcon">
                      <FontIcon className="material-icons">{type}</FontIcon>
                  </div>
                  <div className="column alertText">
                      <span className="alertTitle">{title} - </span>{message}
                  </div>
              </div>
          </div>
      </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']),
    outsidelayout: PropTypes.bool
};

export default Alert;
