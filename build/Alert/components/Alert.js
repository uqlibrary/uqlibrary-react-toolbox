'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function Alert(_ref) {
    var title = _ref.title,
        message = _ref.message,
        type = _ref.type,
        outsidelayout = _ref.outsidelayout;

    return _react2.default.createElement(
        'div',
        null,
        outsidelayout ? _react2.default.createElement(
            'div',
            { className: 'layout-card forAlerts' },
            _react2.default.createElement(
                'div',
                { className: type + ' alertWrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless is-multiline' },
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
                    )
                )
            )
        ) : _react2.default.createElement(
            'div',
            { className: type + ' alertWrapper' },
            _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-multiline' },
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
                )
            )
        )
    );
};

Alert.propTypes = {
    message: _propTypes.PropTypes.string.isRequired,
    title: _propTypes.PropTypes.string.isRequired,
    type: _propTypes.PropTypes.oneOf(['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']),
    outsidelayout: _propTypes.PropTypes.bool
};

exports.default = Alert;