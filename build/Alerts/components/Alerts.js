'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alerts = function (_React$PureComponent) {
    _inherits(Alerts, _React$PureComponent);

    function Alerts() {
        _classCallCheck(this, Alerts);

        return _possibleConstructorReturn(this, (Alerts.__proto__ || Object.getPrototypeOf(Alerts)).apply(this, arguments));
    }

    _createClass(Alerts, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                alertType = _props.alertType,
                alertText = _props.alertText,
                alertState = _props.alertState;

            // TODO: Get these valid types externally - they match with material icon names

            var validAlertTypes = ['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline'];
            var validAlertType = validAlertTypes.find(function (type) {
                return type === alertType;
            }) || 'help';

            return _react2.default.createElement(
                'div',
                { className: validAlertType + ' ' + alertState + ' alertWrapper columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow alertIcon' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons' },
                        validAlertType
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column alertText' },
                    _react2.default.createElement(
                        'div',
                        null,
                        alertText
                    )
                )
            );
        }
    }]);

    return Alerts;
}(_react2.default.PureComponent);

Alerts.propTypes = {
    alertText: _propTypes.PropTypes.string.isRequired,
    alertType: _propTypes.PropTypes.string.isRequired,
    alertState: _propTypes.PropTypes.string
};
exports.default = Alerts;