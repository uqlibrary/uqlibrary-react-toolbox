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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement(_keyboardArrowLeft2.default, { color: 'white' });

var _ref3 = _react2.default.createElement(_Divider2.default, null);

function MenuDrawer(_ref) {
    var menuItems = _ref.menuItems,
        toggleDrawer = _ref.toggleDrawer,
        drawerOpen = _ref.drawerOpen,
        docked = _ref.docked,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        isMobile = _ref.isMobile;

    console.log('Is this mobile? : ' + isMobile);
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
                !isMobile ? logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText }) : _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless is-mobile' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-centered' },
                        logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow' },
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
                { className: 'main-menu' },
                menuItems.map(function (menuItem, index) {
                    return menuItem.primaryText && menuItem.linkTo && _react2.default.createElement(
                        'span',
                        { className: 'menu-item-container', key: index },
                        menuItem.divider ? _ref3 : menuItem.target && menuItem.linkTo.indexOf('http') === -1 ? _react2.default.createElement(
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