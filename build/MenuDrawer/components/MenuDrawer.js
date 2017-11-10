'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MenuDrawer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('material-ui/List');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {Link} from 'react-router-dom';
var _ref2 = _react2.default.createElement(_keyboardArrowLeft2.default, null);

var _ref3 = _react2.default.createElement(_Divider2.default, null);

function MenuDrawer(_ref) {
    var _this = this;

    var menuItems = _ref.menuItems,
        toggleDrawer = _ref.toggleDrawer,
        drawerOpen = _ref.drawerOpen,
        docked = _ref.docked,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        history = _ref.history,
        skipNavTitle = _ref.skipNavTitle,
        skipNavAriaLabel = _ref.skipNavAriaLabel,
        skipNavFocusElementId = _ref.skipNavFocusElementId;

    var focusOnElementId = function focusOnElementId(elementId) {
        return document.getElementById(elementId).focus();
    };

    var onSkipOrNavigate = function onSkipOrNavigate(url, target) {
        if (url && url.indexOf('http') === -1) {
            history.push(url);
        } else if (url && url.indexOf('http') !== -1 && target) {
            window.open(url, target);
        }
        if (skipNavFocusElementId) focusOnElementId(skipNavFocusElementId);
        if (!docked) toggleDrawer();
    };

    if (drawerOpen && !docked) {
        setTimeout(function () {
            return focusOnElementId('mainMenu');
        }, 0);
    }

    return _react2.default.createElement(
        _Drawer2.default,
        {
            containerClassName: 'main-drawer',
            open: drawerOpen,
            width: 320,
            onRequestChange: function onRequestChange() {
                return toggleDrawer(!drawerOpen);
            },
            docked: docked },
        _react2.default.createElement(
            'div',
            { className: 'layout-fill side-drawer' },
            _react2.default.createElement(
                'div',
                { className: 'logo-wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless is-mobile' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-centered' },
                        logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow is-hidden-tablet menuCloseButton' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            { onTouchTap: toggleDrawer },
                            _ref2
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _List.List,
                { className: 'main-menu', id: 'mainMenu', tabIndex: -1 },
                _react2.default.createElement(
                    'div',
                    { type: 'button',
                        className: 'skipNav',
                        id: 'skipNav',
                        tabIndex: docked ? 1 : -1,
                        onClick: onSkipOrNavigate.bind(this, null, null),
                        onKeyPress: onSkipOrNavigate.bind(this, null, null),
                        'aria-label': skipNavAriaLabel },
                    _react2.default.createElement(_RaisedButton2.default, {
                        secondary: true,
                        className: 'skipNavButton',
                        label: skipNavTitle,
                        onTouchTap: onSkipOrNavigate.bind(this, null, null),
                        tabIndex: -1
                    })
                ),
                drawerOpen && menuItems.map(function (menuItem, index) {
                    return menuItem.primaryText && menuItem.linkTo && _react2.default.createElement(
                        'span',
                        { className: 'menu-item-container', key: index },
                        menuItem.divider ? _ref3 : _react2.default.createElement(_List.ListItem, {
                            primaryText: menuItem.primaryText,
                            secondaryText: menuItem.secondaryText,
                            onTouchTap: onSkipOrNavigate.bind(_this, menuItem.linkTo, menuItem.target),
                            leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null,
                            tabIndex: 2
                        })
                    );
                })
            )
        )
    );
}