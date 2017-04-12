'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactDom = require('react-dom');

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _TextFieldUnderline = require('material-ui/TextField/TextFieldUnderline');

var _TextFieldUnderline2 = _interopRequireDefault(_TextFieldUnderline);

var _TextFieldLabel = require('material-ui/TextField/TextFieldLabel');

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require('./AutoCompleteSelect.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncAutoCompleteSelect = function (_Component) {
    _inherits(AsyncAutoCompleteSelect, _Component);

    function AsyncAutoCompleteSelect(props) {
        _classCallCheck(this, AsyncAutoCompleteSelect);

        var _this = _possibleConstructorReturn(this, (AsyncAutoCompleteSelect.__proto__ || Object.getPrototypeOf(AsyncAutoCompleteSelect)).call(this, props));

        _this.updateSearch = function () {
            return _this.__updateSearch__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.validateSearchInput = function () {
            return _this.__validateSearchInput__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.updateAutocomplete = function () {
            return _this.__updateAutocomplete__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.togglePopover = function () {
            return _this.__togglePopover__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.selectItem = function () {
            return _this.__selectItem__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.focusSearchInput = function () {
            return _this.__focusSearchInput__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.receivesFocus = function () {
            return _this.__receivesFocus__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.receivesBlur = function () {
            return _this.__receivesBlur__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setAnchorElement = function () {
            return _this.__setAnchorElement__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setSearchElement = function () {
            return _this.__setSearchElement__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            searchText: '',
            filterLoading: false,
            pendingBounce: null,
            baseInputLabel: '',
            isOpen: false,
            isFocused: false,
            anchorElement: null,
            searchElement: null,
            filteredItems: []
        };
        return _this;
    }

    _createClass(AsyncAutoCompleteSelect, [{
        key: '__updateSearch__REACT_HOT_LOADER__',
        value: function __updateSearch__REACT_HOT_LOADER__(e, value) {
            if (this.state.pendingBounce) {
                clearTimeout(this.state.pendingBounce);
            }

            var valid = this.validateSearchInput(value);
            this.setState({
                searchText: value,
                pendingBounce: valid ? setTimeout(this.updateAutocomplete, 500) : null,
                filterLoading: valid,
                filteredItems: []
            }, this.focusSearchInput);
        }
    }, {
        key: '__validateSearchInput__REACT_HOT_LOADER__',
        value: function __validateSearchInput__REACT_HOT_LOADER__(value) {
            return value.length >= this.props.minLength;
        }
    }, {
        key: '__updateAutocomplete__REACT_HOT_LOADER__',
        value: function __updateAutocomplete__REACT_HOT_LOADER__() {
            var _this2 = this;

            Promise.resolve(this.props.filterItems(this.state.searchText)).then(function (data) {
                _this2.setState({
                    filteredItems: data,
                    filterLoading: false
                }, _this2.focusSearchInput);
            }).catch(function () {
                _this2.setState({
                    filteredItems: [],
                    filterLoading: false
                }, _this2.focusSearchInput);
            });
        }
    }, {
        key: '__togglePopover__REACT_HOT_LOADER__',
        value: function __togglePopover__REACT_HOT_LOADER__() {
            this.setState({
                isOpen: !this.state.isOpen,
                filterLoading: false,
                filteredItems: [],
                searchText: ''
            }, this.focusSearchInput);
        }
    }, {
        key: '__selectItem__REACT_HOT_LOADER__',
        value: function __selectItem__REACT_HOT_LOADER__(e, item) {
            this.props.onChange(item);
            this.togglePopover();
        }
    }, {
        key: '__focusSearchInput__REACT_HOT_LOADER__',
        value: function __focusSearchInput__REACT_HOT_LOADER__() {
            (0, _reactDom.findDOMNode)(this.state.searchElement).getElementsByTagName('input')[0].focus();
        }
    }, {
        key: '__receivesFocus__REACT_HOT_LOADER__',
        value: function __receivesFocus__REACT_HOT_LOADER__() {
            this.setState({ isFocused: true });
        }
    }, {
        key: '__receivesBlur__REACT_HOT_LOADER__',
        value: function __receivesBlur__REACT_HOT_LOADER__() {
            this.setState({ isFocused: false });
        }
    }, {
        key: '__setAnchorElement__REACT_HOT_LOADER__',
        value: function __setAnchorElement__REACT_HOT_LOADER__(input) {
            this.setState({ anchorElement: input });
        }
    }, {
        key: '__setSearchElement__REACT_HOT_LOADER__',
        value: function __setSearchElement__REACT_HOT_LOADER__(input) {
            this.setState({ searchElement: input });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var theme = this.context.muiTheme;

            var labelStyle = { color: 'rgb(224, 224, 224)', top: '12px', cursor: 'pointer' };
            var valueStyle = {
                color: this.props.disabled ? theme.textField.disabledTextColor : theme.textField.textColor
            };
            var baseContainerProps = {
                style: {
                    cursor: this.props.disabled ? 'not-allowed' : 'pointer'
                },
                onTouchTap: this.props.disabled ? null : this.togglePopover
            };

            return _react2.default.createElement(
                'div',
                { className: 'auto-complete-select row align-end' },
                _react2.default.createElement(
                    'div',
                    _extends({ className: 'base-input-container flex', ref: this.setAnchorElement }, baseContainerProps),
                    _react2.default.createElement(
                        _TextFieldLabel2.default,
                        { muiTheme: theme,
                            style: labelStyle,
                            shrink: this.props.value !== null },
                        this.props.label
                    ),
                    _react2.default.createElement(_TextFieldUnderline2.default, { focus: this.state.isFocused,
                        error: this.props.error,
                        muiTheme: theme,
                        disabled: this.props.disabled }),
                    this.props.value && _react2.default.createElement(
                        'span',
                        { className: 'value', style: valueStyle },
                        this.props.value[this.props.labelField]
                    ),
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: { right: 0, position: 'absolute' },
                            disabled: this.props.disabled,
                            onFocus: this.receivesFocus,
                            onTouchTap: this.togglePopover,
                            onBlur: this.receivesBlur },
                        _react2.default.createElement(_arrowDropDown2.default, { className: 'arrow' })
                    )
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    { open: this.state.isOpen,
                        className: 'auto-complete-select-popover',
                        style: { minWidth: 500 },
                        canAutoPosition: false,
                        useLayerForClickAway: true,
                        anchorEl: this.state.anchorElement,
                        onRequestClose: this.togglePopover },
                    _react2.default.createElement(
                        'div',
                        { className: 'search-input-container' },
                        _react2.default.createElement(_TextField2.default, { ref: this.setSearchElement,
                            name: 'auto-complete-select-filter-field',
                            fullWidth: true,
                            floatingLabelText: this.props.popoverFloatingLabelText,
                            value: this.state.searchText,
                            onChange: this.updateSearch }),
                        this.state.filterLoading === true && _react2.default.createElement(
                            'div',
                            { className: 'loading-indicator' },
                            _react2.default.createElement(_CircularProgress2.default, { size: 20 })
                        )
                    ),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(
                        _Menu2.default,
                        { onChange: this.selectItem, value: this.props.value },
                        this.state.filteredItems.map(function (item, index) {
                            return _react2.default.createElement(_MenuItem2.default, {
                                key: index,
                                tabIndex: index,
                                value: item,
                                primaryText: item[_this3.props.labelField] });
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'message-container' },
                        this.state.searchText === '' && _react2.default.createElement(
                            'span',
                            { className: 'body-1' },
                            this.props.emptySearchText
                        ),
                        this.state.searchText !== '' && this.state.filteredItems.length === 0 && this.state.filterLoading === false && _react2.default.createElement(
                            'span',
                            { className: 'body-1' },
                            this.props.noResultsText
                        )
                    )
                )
            );
        }
    }]);

    return AsyncAutoCompleteSelect;
}(_react.Component);

AsyncAutoCompleteSelect.propTypes = {
    debounceDuration: _propTypes.PropTypes.number,
    disabled: _propTypes.PropTypes.bool,
    emptySearchText: _propTypes.PropTypes.string,
    error: _propTypes.PropTypes.bool,
    label: _propTypes.PropTypes.string.isRequired,
    labelField: _propTypes.PropTypes.string,
    noResultsText: _propTypes.PropTypes.string,
    popoverFloatingLabelText: _propTypes.PropTypes.string,
    minLength: _propTypes.PropTypes.number,
    value: _propTypes.PropTypes.object,
    filterItems: _propTypes.PropTypes.func,
    onChange: _propTypes.PropTypes.func
};
AsyncAutoCompleteSelect.defaultProps = {
    debounceDuration: 300,
    disabled: false,
    error: false,
    minLength: 3,
    emptySearchText: 'Start typing to filter data...',
    noResultsText: 'No results found with those search details',
    popoverFloatingLabelText: 'Start typing to filter',
    value: null
};
AsyncAutoCompleteSelect.contextTypes = {
    muiTheme: _propTypes.PropTypes.object.isRequired
};
var _default = AsyncAutoCompleteSelect;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(AsyncAutoCompleteSelect, 'AsyncAutoCompleteSelect', 'src/AutoCompleteSelect/components/AsyncAutoCompleteSelect.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/AutoCompleteSelect/components/AsyncAutoCompleteSelect.js');
}();

;