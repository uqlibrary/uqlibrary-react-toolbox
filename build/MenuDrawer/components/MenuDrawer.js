'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MenuDrawer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _List = require('material-ui/List');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement(_Divider2.default, null);

function MenuDrawer(_ref) {
    var menuItems = _ref.menuItems,
        toggleDrawer = _ref.toggleDrawer,
        drawerOpen = _ref.drawerOpen,
        docked = _ref.docked,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText;

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
                logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
            ),
            _react2.default.createElement(
                _List.List,
                { className: 'main-menu' },
                menuItems.map(function (menuItem, index) {
                    return menuItem.primaryText && menuItem.linkTo && _react2.default.createElement(
                        'span',
                        { className: 'menu-item-container', key: index },
                        menuItem.divider ? _ref2 : menuItem.target && menuItem.linkTo.indexOf('http') === -1 ? _react2.default.createElement(
                            'a',
                            { href: menuItem.linkTo, target: menuItem.target },
                            _react2.default.createElement(_List.ListItem, {
                                primaryText: menuItem.primaryText,
                                secondaryText: menuItem.secondaryText,
                                onClick: toggleDrawer,
                                leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null })
                        ) : _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: menuItem.linkTo },
                            _react2.default.createElement(_List.ListItem, {
                                primaryText: menuItem.primaryText,
                                secondaryText: menuItem.secondaryText,
                                onClick: toggleDrawer,
                                leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null })
                        )
                    );
                })
            )
        )
    );
}