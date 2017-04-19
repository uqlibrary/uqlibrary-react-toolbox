'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncAutoCompleteSelect = function (_Component) {
    _inherits(AsyncAutoCompleteSelect, _Component);

    function AsyncAutoCompleteSelect(props) {
        _classCallCheck(this, AsyncAutoCompleteSelect);

        var _this = _possibleConstructorReturn(this, (AsyncAutoCompleteSelect.__proto__ || Object.getPrototypeOf(AsyncAutoCompleteSelect)).call(this, props));

        _this.updateSearch = function (e, value) {
            if (_this.state.pendingBounce) {
                clearTimeout(_this.state.pendingBounce);
            }

            var valid = _this.validateSearchInput(value);
            _this.setState({
                searchText: value,
                pendingBounce: valid ? setTimeout(_this.updateAutocomplete, 500) : null,
                filterLoading: valid,
                filteredItems: []
            }, _this.focusSearchInput);
        };

        _this.validateSearchInput = function (value) {
            return value.length >= _this.props.minLength;
        };

        _this.updateAutocomplete = function () {
            Promise.resolve(_this.props.filterItems(_this.state.searchText)).then(function (data) {
                _this.setState({
                    filteredItems: data,
                    filterLoading: false
                }, _this.focusSearchInput);
            }).catch(function () {
                _this.setState({
                    filteredItems: [],
                    filterLoading: false
                }, _this.focusSearchInput);
            });
        };

        _this.togglePopover = function () {
            _this.setState({
                isOpen: !_this.state.isOpen,
                filterLoading: false,
                filteredItems: [],
                searchText: ''
            }, _this.focusSearchInput);
        };

        _this.selectItem = function (e, item) {
            _this.props.onChange(item);
            _this.togglePopover();
        };

        _this.focusSearchInput = function () {
            (0, _reactDom.findDOMNode)(_this.state.searchElement).getElementsByTagName('input')[0].focus();
        };

        _this.receivesFocus = function () {
            _this.setState({ isFocused: true });
        };

        _this.receivesBlur = function () {
            _this.setState({ isFocused: false });
        };

        _this.setAnchorElement = function (input) {
            _this.setState({ anchorElement: input });
        };

        _this.setSearchElement = function (input) {
            _this.setState({ searchElement: input });
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
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                                primaryText: item[_this2.props.labelField] });
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
    debounceDuration: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    emptySearchText: _propTypes2.default.string,
    error: _propTypes2.default.bool,
    label: _propTypes2.default.string.isRequired,
    labelField: _propTypes2.default.string,
    noResultsText: _propTypes2.default.string,
    popoverFloatingLabelText: _propTypes2.default.string,
    minLength: _propTypes2.default.number,
    value: _propTypes2.default.object,
    filterItems: _propTypes2.default.func,
    onChange: _propTypes2.default.func
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
    muiTheme: _propTypes2.default.object.isRequired
};
exports.default = AsyncAutoCompleteSelect;