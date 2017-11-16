'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(_person2.default, null);

var _ref2 = _react2.default.createElement(_personOutline2.default, null);

var AuthButton = function (_React$Component) {
    _inherits(AuthButton, _React$Component);

    function AuthButton(props) {
        _classCallCheck(this, AuthButton);

        return _possibleConstructorReturn(this, (AuthButton.__proto__ || Object.getPrototypeOf(AuthButton)).call(this, props));
    }

    _createClass(AuthButton, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'auth-button-wrapper' },
                _react2.default.createElement(
                    _IconButton2.default,
                    { tooltipPosition: 'bottom-left', onClick: this.props.onClick,
                        hoveredStyle: this.props.hoveredStyle,
                        tooltip: this.props.isAuthorizedUser ? this.props.signOutTooltipText : this.props.signInTooltipText,
                        className: this.props.isAuthorizedUser ? 'log-out-button' : 'log-in-button' },
                    this.props.isAuthorizedUser ? _ref : _ref2
                )
            );
        }
    }]);

    return AuthButton;
}(_react2.default.Component);

AuthButton.defaultProps = {
    signOutTooltipText: 'Log out',
    signInTooltipText: 'Log in'
};
exports.default = AuthButton;