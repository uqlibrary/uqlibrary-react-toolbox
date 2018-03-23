'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref2 = _react2.default.createElement(_keyboardArrowLeft2.default, null);

var _ref3 = _react2.default.createElement('div', { id: 'afterMenuDrawer', tabIndex: -1 });

var MenuDrawer = function (_Component) {
    _inherits(MenuDrawer, _Component);

    function MenuDrawer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuDrawer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuDrawer.__proto__ || Object.getPrototypeOf(MenuDrawer)).call.apply(_ref, [this].concat(args))), _this), _this.focusOnElementId = function (elementId) {
            if (document.getElementById(elementId)) {
                document.getElementById(elementId).focus();
            }
        }, _this.skipMenuItems = function () {
            _this.focusOnElementId('afterMenuDrawer');
        }, _this.navigateToLink = function (url) {
            var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_blank';

            if (!!url) {
                if (url.indexOf('http') === -1) {
                    // internal link
                    _this.props.history.push(url);
                } else {
                    // external link
                    window.open(url, target);
                }
            }

            if (!_this.props.docked) {
                _this.props.onToggleDrawer();
            }
        }, _this.renderMenuItems = function (items) {
            return items.map(function (menuItem, index) {
                return menuItem.divider ? _react2.default.createElement(_Divider2.default, { key: 'menu_item_' + index }) : _react2.default.createElement(
                    'span',
                    { className: 'menu-item-container', key: 'menu_item_' + index },
                    _react2.default.createElement(_List.ListItem, {
                        primaryText: menuItem.primaryText,
                        secondaryText: menuItem.secondaryText,
                        onTouchTap: _this.navigateToLink.bind(_this, menuItem.linkTo, menuItem.target),
                        leftIcon: menuItem.leftIcon ? menuItem.leftIcon : null })
                );
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuDrawer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.logoImage !== this.props.logoImage || nextProps.logoText !== this.props.logoText || nextProps.drawerOpen !== this.props.drawerOpen || nextProps.docked !== this.props.docked || JSON.stringify(nextProps.locale) !== JSON.stringify(this.props.locale) || JSON.stringify(nextProps.menuItems) !== JSON.stringify(this.props.menuItems);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                menuItems = _props.menuItems,
                onToggleDrawer = _props.onToggleDrawer,
                drawerOpen = _props.drawerOpen,
                docked = _props.docked,
                logoImage = _props.logoImage,
                logoText = _props.logoText,
                locale = _props.locale;


            if (drawerOpen && !docked) {
                // set focus on menu on mobile view if menu is opened
                setTimeout(this.focusOnElementId.bind(this, 'mainMenu'), 0);
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
                                onClick: this.skipMenuItems,
                                onKeyPress: this.skipMenuItems,
                                tabIndex: 1,
                                'aria-label': locale.skipNavAriaLabel },
                            _react2.default.createElement(_RaisedButton2.default, {
                                secondary: true,
                                onTouchTap: this.skipMenuItems,
                                className: 'skipNavButton',
                                label: locale.skipNavTitle,
                                tabIndex: -1 })
                        ),
                        this.renderMenuItems(menuItems)
                    ),
                    _ref3
                )
            );
        }
    }]);

    return MenuDrawer;
}(_react.Component);

exports.default = MenuDrawer;