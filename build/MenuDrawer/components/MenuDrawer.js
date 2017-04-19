'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MenuDrawer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactRouterDom = require('react-router-dom');

var _List = require('material-ui/List');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            containerClassName: 'main-drawer flex',
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
                    return _react2.default.createElement(
                        'span',
                        { className: 'menu-item-container', key: index },
                        menuItem.divider ? _react2.default.createElement(_Divider2.default, null) : _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: menuItem.linkTo },
                            _react2.default.createElement(_List.ListItem, { primaryText: menuItem.primaryText,
                                secondaryText: menuItem.secondaryText,
                                leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null
                            })
                        )
                    );
                })
            )
        )
    );
}

MenuDrawer.propTypes = {
    menuItems: _propTypes.PropTypes.array.isRequired,
    logoImage: _propTypes.PropTypes.string,
    logoText: _propTypes.PropTypes.string,
    drawerOpen: _propTypes.PropTypes.bool,
    docked: _propTypes.PropTypes.bool,
    toggleDrawer: _propTypes.PropTypes.func
};