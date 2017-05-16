'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    title: _propTypes2.default.string,
    text: _propTypes2.default.any.isRequired,
    buttonLabel: _propTypes2.default.string,
    tooltip: _propTypes2.default.string,
    tooltipIconColor: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    style: _propTypes2.default.object
};

var defaultProps = {
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
        style = _ref.style;

    var setDrawerContent = function setDrawerContent() {
        onClick(title, text, buttonLabel);
    };

    return _react2.default.createElement(
        _IconButton2.default,
        { tooltip: tooltip, tooltipPosition: 'bottom-left', onClick: setDrawerContent, style: style },
        _react2.default.createElement(
            _FontIcon2.default,
            { className: 'material-icons helpIcon', color: tooltipIconColor },
            'help_outline'
        )
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

exports.default = HelpIcon;