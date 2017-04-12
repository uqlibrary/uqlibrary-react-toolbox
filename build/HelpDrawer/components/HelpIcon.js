'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    title: _propTypes.PropTypes.string,
    text: _propTypes.PropTypes.any.isRequired,
    buttonLabel: _propTypes.PropTypes.string,
    tooltip: _propTypes.PropTypes.string,
    tooltipIconColor: _propTypes.PropTypes.string,
    onClick: _propTypes.PropTypes.func,
    inline: _propTypes.PropTypes.bool,
    style: _propTypes.PropTypes.object
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

    var classNames = 'form-help-icon ' + (inline ? 'inline' : '');

    return _react2.default.createElement(
        'div',
        { className: classNames, style: _extends({}, style) },
        _react2.default.createElement(
            _IconButton2.default,
            { tooltip: tooltip, tooltipPosition: 'bottom-center', onClick: setDrawerContent },
            _react2.default.createElement(
                _FontIcon2.default,
                { className: 'material-icons', color: tooltipIconColor },
                'help_outline'
            )
        )
    );
};

HelpIcon.propTypes = propTypes;
HelpIcon.defaultProps = defaultProps;

var _default = HelpIcon;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/HelpDrawer/components/HelpIcon.js');

    __REACT_HOT_LOADER__.register(defaultProps, 'defaultProps', 'src/HelpDrawer/components/HelpIcon.js');

    __REACT_HOT_LOADER__.register(HelpIcon, 'HelpIcon', 'src/HelpDrawer/components/HelpIcon.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/HelpDrawer/components/HelpIcon.js');
}();

;