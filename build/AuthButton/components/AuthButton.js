'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _person = require('material-ui/svg-icons/social/person');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement(_person2.default, null);

var _ref3 = _react2.default.createElement(_personOutline2.default, null);

var AuthButton = exports.AuthButton = function AuthButton(_ref) {
    var isAuthorizedUser = _ref.isAuthorizedUser,
        _ref$signOutTooltipTe = _ref.signOutTooltipText,
        signOutTooltipText = _ref$signOutTooltipTe === undefined ? 'Log out' : _ref$signOutTooltipTe,
        _ref$signInTooltipTex = _ref.signInTooltipText,
        signInTooltipText = _ref$signInTooltipTex === undefined ? 'Log in' : _ref$signInTooltipTex,
        hoveredStyle = _ref.hoveredStyle,
        onClick = _ref.onClick;

    return _react2.default.createElement(
        'div',
        { className: 'auth-button-wrapper' },
        _react2.default.createElement(
            _IconButton2.default,
            {
                tooltipPosition: 'bottom-left',
                onClick: onClick,
                hoveredStyle: hoveredStyle,
                tooltip: isAuthorizedUser ? signOutTooltipText : signInTooltipText,
                className: isAuthorizedUser ? 'log-out-button' : 'log-in-button' },
            isAuthorizedUser ? _ref2 : _ref3
        )
    );
};