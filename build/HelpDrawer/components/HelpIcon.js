'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

require('./HelpIcon.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    title: _propTypes2.default.string,
    text: _propTypes2.default.any.isRequired,
    buttonLabel: _propTypes2.default.string,
    tooltip: _propTypes2.default.string,
    tooltipIconColor: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    inline: _propTypes2.default.bool,
    style: _propTypes2.default.object
};

var defaultProps = {
    inline: false,
    style: {},
    tooltip: 'Click for more information',
    tooltipIconColor: '#CCCCCC'
};

var HelpIcon = function HelpIcon(_ref) {
    var title = _ref.title,
        text = _ref.text,
        buttonLabel = _ref.buttonLabel,
        tooltip = _ref.tooltip,
        tooltipIconColor = _ref.tooltipIconColor,
        onClick = _ref.onClick,
        inline = _ref.inline,
        style = _ref.style;

    var setDrawerContent = function setDrawerContent() {
        onClick(title, text, buttonLabel);
    };

    var classNames = 'form-help-icon is-narrow is-pulled right ' + (inline ? 'inline' : '');

    return _react2.default.createElement(
        'div',
        { className: classNames, style: _extends({}, style) },
        _react2.default.createElement(
            _IconButton2.default,
            { tooltip: tooltip, tooltipPosition: 'bottom-left', onClick: setDrawerContent, className: 'is-pulled-right' },
            _react2.default.createElement(
                _FontIcon2.default,
                { className: 'material-icons helpIcon', color: tooltipIconColor },
                'help_outline'
            )
        )
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

exports.default = HelpIcon;