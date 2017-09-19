'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function Alert(_ref) {
    var title = _ref.title,
        message = _ref.message,
        type = _ref.type,
        action = _ref.action,
        actionButtonLabel = _ref.actionButtonLabel,
        allowDismiss = _ref.allowDismiss,
        dismissAction = _ref.dismissAction;

    return _react2.default.createElement(
        'div',
        { className: 'forAlerts' },
        _react2.default.createElement(
            'div',
            { className: type + ' alertWrapper' },
            _react2.default.createElement(
                'div',
                { className: 'columns is-multiline is-mobile' },
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow alertIcon' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons' },
                        type
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column alertText' },
                    _react2.default.createElement(
                        'span',
                        { className: 'alertTitle' },
                        title,
                        ' - '
                    ),
                    message
                ),
                action && actionButtonLabel && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow is-12-mobile' },
                    _react2.default.createElement(_FlatButton2.default, {
                        label: actionButtonLabel,
                        onTouchTap: action,
                        className: 'alertAction' })
                ),
                allowDismiss && dismissAction && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow is-hidden-mobile' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { onTouchTap: dismissAction },
                        _react2.default.createElement(_close2.default, { className: 'alertDismiss' })
                    )
                )
            )
        )
    );
};

Alert.propTypes = {
    message: _propTypes.PropTypes.string.isRequired,
    title: _propTypes.PropTypes.string.isRequired,
    type: _propTypes.PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline', 'done']),
    action: _propTypes.PropTypes.func,
    actionButtonLabel: _propTypes.PropTypes.string,
    allowDismiss: _propTypes.PropTypes.bool,
    dismissAction: _propTypes.PropTypes.func
};

Alert.defaultProps = {
    message: 'Unexpected error',
    title: 'Error',
    type: 'error',
    allowDismiss: false
};

exports.default = Alert;