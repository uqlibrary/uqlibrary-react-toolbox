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

var _ref2 = _react2.default.createElement(_close2.default, { className: 'alertDismiss' });

var _ref3 = _react2.default.createElement('div', { className: 'column is-narrow noDismiss is-hidden-mobile' });

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
                    'div',
                    null,
                    _react2.default.createElement(
                        'b',
                        null,
                        title
                    ),
                    '\xA0-\xA0',
                    message
                )
            ),
            action && actionButtonLabel && _react2.default.createElement(
                'div',
                { className: 'column is-narrow-tablet is-12-mobile' },
                _react2.default.createElement(_FlatButton2.default, {
                    label: actionButtonLabel,
                    onTouchTap: action,
                    fullWidth: true,
                    className: 'alertAction' })
            ),
            allowDismiss && dismissAction && _react2.default.createElement(
                'div',
                { className: 'column is-narrow-tablet is-hidden-mobile' },
                _react2.default.createElement(
                    _IconButton2.default,
                    { onTouchTap: dismissAction, className: 'alertDismissButton' },
                    _ref2
                )
            ),
            action && actionButtonLabel && !allowDismiss && !dismissAction && _ref3
        )
    );
};

Alert.defaultProps = {
    message: 'Unexpected error',
    title: 'Error',
    type: 'error',
    allowDismiss: false
};

exports.default = Alert;