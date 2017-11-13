'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('material-ui/List');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {SkipNavigation} from './SkipNavigation';
var _ref2 = _react2.default.createElement(_keyboardArrowLeft2.default, null);

var _ref3 = _react2.default.createElement('div', { id: 'afterMenuDrawer', tabIndex: -1 });

var MenuDrawer = function MenuDrawer(_ref) {
    var menuItems = _ref.menuItems,
        onToggleDrawer = _ref.onToggleDrawer,
        drawerOpen = _ref.drawerOpen,
        docked = _ref.docked,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        history = _ref.history,
        locale = _ref.locale;

    var focusOnElementId = function focusOnElementId(elementId) {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).focus();
        }
    };
    var navigateToLink = function navigateToLink(url) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_blank';

        if (url && url.indexOf('http') === -1) {
            history.push(url);
        } else if (url && url.indexOf('http') !== -1) {
            window.open(url, target);
        }
        if (!docked) onToggleDrawer();
    };
    var skipMenuItems = function skipMenuItems() {
        focusOnElementId('afterMenuDrawer');
    };
    var renderMenuItems = function renderMenuItems(items) {
        return items.map(function (menuItem, index) {
            return menuItem.divider ? _react2.default.createElement(_Divider2.default, { key: 'menu_item_' + index }) : _react2.default.createElement(
                'span',
                { className: 'menu-item-container', key: 'menu_item_' + index },
                _react2.default.createElement(_List.ListItem, {
                    primaryText: menuItem.primaryText,
                    secondaryText: menuItem.secondaryText,
                    onTouchTap: navigateToLink.bind(undefined, menuItem.linkTo, menuItem.target),
                    leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null })
            );
        });
    };

    if (drawerOpen && !docked) {
        // set focus on menu on mobile view if menu is opened
        setTimeout(focusOnElementId.bind(undefined, 'mainMenu'), 0);
    }
    return _react2.default.createElement(
        _Drawer2.default,
        {
            containerClassName: 'main-drawer',
            open: drawerOpen,
            width: 320,
            onRequestChange: onToggleDrawer,
            docked: docked },
        drawerOpen && _react2.default.createElement(
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
                            { onTouchTap: onToggleDrawer, 'aria-label': locale.closeMenuLabel },
                            _ref2
                        )
                    )
                )
            ),
            _react2.default.createElement(
                _List.List,
                { className: 'main-menu', id: 'mainMenu', tabIndex: -1 },
                docked && _react2.default.createElement(
                    'div',
                    { className: 'skipNav', type: 'button',
                        id: 'skipNav',
                        onClick: skipMenuItems.bind(undefined),
                        onKeyPress: skipMenuItems.bind(undefined),
                        tabIndex: 1,
                        'aria-label': locale.skipNavAriaLabel },
                    _react2.default.createElement(_RaisedButton2.default, {
                        secondary: true,
                        onTouchTap: skipMenuItems.bind(undefined),
                        className: 'skipNavButton',
                        label: locale.skipNavTitle,
                        tabIndex: -1 })
                ),
                renderMenuItems(menuItems)
            ),
            _ref3
        )
    );
};

exports.default = MenuDrawer;