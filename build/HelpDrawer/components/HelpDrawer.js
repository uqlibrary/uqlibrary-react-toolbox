'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

require('./HelpDrawer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    open: _propTypes.PropTypes.bool.isRequired,
    title: _propTypes.PropTypes.string.isRequired,
    text: _propTypes.PropTypes.any.isRequired,
    hide: _propTypes.PropTypes.func.isRequired,
    buttonLabel: _propTypes.PropTypes.string
};

var defaultProps = {
    buttonLabel: 'OK'
};

var HelpDrawer = function HelpDrawer(_ref) {
    var title = _ref.title,
        text = _ref.text,
        buttonLabel = _ref.buttonLabel,
        open = _ref.open,
        hide = _ref.hide;

    var toggleDrawer = function toggleDrawer() {
        hide();
    };

    return _react2.default.createElement(
        _Drawer2.default,
        {
            containerClassName: 'help-drawer flex',
            open: open,
            openSecondary: true,
            docked: false,
            disableSwipeToOpen: true,
            width: 380,
            onRequestChange: toggleDrawer },
        _react2.default.createElement(
            'div',
            { className: 'layout-fill side-drawer column align-stretch' },
            _react2.default.createElement(
                'div',
                { className: 'flex column content' },
                _react2.default.createElement(
                    'h1',
                    { className: 'headline' },
                    title
                ),
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'subhead' },
                    text
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'row justify-end layout-padding' },
                _react2.default.createElement(_RaisedButton2.default, { secondary: true, label: buttonLabel, onTouchTap: toggleDrawer })
            )
        )
    );
};

HelpDrawer.propTypes = propTypes;
HelpDrawer.defaultProps = defaultProps;

var _default = HelpDrawer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/HelpDrawer/components/HelpDrawer.js');

    __REACT_HOT_LOADER__.register(defaultProps, 'defaultProps', 'src/HelpDrawer/components/HelpDrawer.js');

    __REACT_HOT_LOADER__.register(HelpDrawer, 'HelpDrawer', 'src/HelpDrawer/components/HelpDrawer.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/HelpDrawer/components/HelpDrawer.js');
}();

;