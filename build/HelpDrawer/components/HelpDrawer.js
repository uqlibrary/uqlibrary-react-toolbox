'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    open: _propTypes2.default.bool.isRequired,
    title: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.any.isRequired,
    hide: _propTypes2.default.func.isRequired,
    buttonLabel: _propTypes2.default.string
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
            containerClassName: 'help-drawer',
            open: open,
            openSecondary: true,
            docked: false,
            disableSwipeToOpen: true,
            width: 320,
            onRequestChange: toggleDrawer },
        _react2.default.createElement(
            'div',
            { className: 'layout-fill side-drawer' },
            _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    'span',
                    { className: 'cardTitle' },
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'body-1' },
                    text
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'layout-padding' },
                _react2.default.createElement(_RaisedButton2.default, { secondary: true, label: buttonLabel, onTouchTap: toggleDrawer, className: 'is-pulled-right' })
            )
        )
    );
};

HelpDrawer.defaultProps = defaultProps;

exports.default = HelpDrawer;