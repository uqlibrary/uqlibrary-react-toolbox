'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TextFieldUnderline = require('material-ui/TextField/TextFieldUnderline');

var _TextFieldUnderline2 = _interopRequireDefault(_TextFieldUnderline);

var _TextFieldLabel = require('material-ui/TextField/TextFieldLabel');

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _AsyncAutoSuggestInput = require('./AsyncAutoSuggestInput.component');

var _AsyncAutoSuggestInput2 = _interopRequireDefault(_AsyncAutoSuggestInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncAutoCompleteSelect = function (_React$PureComponent) {
    _inherits(AsyncAutoCompleteSelect, _React$PureComponent);

    function AsyncAutoCompleteSelect() {
        _classCallCheck(this, AsyncAutoCompleteSelect);

        var _this = _possibleConstructorReturn(this, (AsyncAutoCompleteSelect.__proto__ || Object.getPrototypeOf(AsyncAutoCompleteSelect)).call(this));

        _this.openModal = function () {
            if (!_this.props.disabled) {
                _this.setState({
                    isModalOpen: true,
                    searchValue: ''
                });
            }
        };

        _this.closeModal = function () {
            _this.setState({
                isModalOpen: false
            });
        };

        _this.onChange = function (event, _ref) {
            var newValue = _ref.newValue;

            _this.setState({
                searchValue: newValue
            });
        };

        _this.renderSuggestion = function (suggestion) {
            return suggestion[_this.props.dataSourceLabel];
        };

        _this.onSuggestionsFetchRequested = function (_ref2) {
            var value = _ref2.value;

            if (_this.state.pendingBounce) {
                clearTimeout(_this.state.pendingBounce);
            }

            if (_this.shouldRenderSuggestions(value)) {
                _this.setState({
                    suggestions: [],
                    pendingBounce: setTimeout(_this.updateSuggestions, 500),
                    isLoading: true
                });
            }
        };

        _this.updateSuggestions = function () {
            _this.props.dataSource(_this.state.searchValue).then(function (data) {
                _this.setState({ suggestions: data, isLoading: false });
            });
        };

        _this.onSuggestionSelected = function (event, _ref3) {
            var suggestion = _ref3.suggestion;

            _this.closeModal();
            _this.props.onChange(suggestion);
        };

        _this.onSuggestionsClearRequested = function () {
            if (!_this.props.alwaysRenderSuggestions) {
                _this.setState({
                    suggestions: []
                });
            }
        };

        _this.getSuggestionValue = function (suggestion) {
            return suggestion;
        };

        _this.shouldRenderSuggestions = function (value) {
            return typeof value === 'string' && value.trim().length >= _this.props.minLength;
        };

        _this.onFocus = function () {
            if (!_this.props.disabled) {
                _this.setState({ isFocused: true });
            }
        };

        _this.onBlur = function () {
            _this.setState({ isFocused: false });
        };

        _this.state = {
            isModalOpen: false,
            isLoading: false,
            isFocused: false,
            searchValue: '',
            suggestions: [],
            pendingBounce: null
        };
        return _this;
    }

    _createClass(AsyncAutoCompleteSelect, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                isModalOpen = _state.isModalOpen,
                searchValue = _state.searchValue,
                suggestions = _state.suggestions,
                isLoading = _state.isLoading;
            var _props = this.props,
                disabled = _props.disabled,
                label = _props.label,
                value = _props.value,
                dataSourceLabel = _props.dataSourceLabel,
                alwaysRenderSuggestions = _props.alwaysRenderSuggestions,
                errorText = _props.errorText;


            var inputProps = {
                placeholder: 'Type to filter',
                value: searchValue + '',
                onChange: this.onChange
            };

            var theme = this.context.muiTheme;
            var tabIndex = disabled ? -1 : 0;

            return _react2.default.createElement(
                'div',
                { className: 'auto-complete-select' },
                _react2.default.createElement(
                    'div',
                    { className: 'base-input-container', onTouchTap: this.openModal, onKeyDown: this.openModal, tabIndex: tabIndex, onFocus: this.onFocus, onBlur: this.onBlur },
                    _react2.default.createElement(
                        _TextFieldLabel2.default,
                        { muiTheme: theme,
                            style: { color: 'rgb(224, 224, 224)', top: '12px', cursor: 'pointer', fontSize: '16px' },
                            shrink: !!value },
                        label
                    ),
                    _react2.default.createElement(_TextFieldUnderline2.default, { error: !!errorText,
                        focus: this.state.isFocused,
                        muiTheme: theme,
                        disabled: false }),
                    value && _react2.default.createElement(
                        'span',
                        { className: 'value', style: { color: disabled ? theme.textField.disabledTextColor : theme.textField.textColor } },
                        value[dataSourceLabel]
                    ),
                    errorText && _react2.default.createElement(
                        'div',
                        { className: 'errorLabel' },
                        errorText
                    )
                ),
                _react2.default.createElement(
                    _reactModal2.default,
                    {
                        className: 'auto-complete-select-content',
                        overlayClassName: 'auto-complete-select-overlay',
                        isOpen: isModalOpen,
                        contentLabel: 'Modal',
                        onRequestClose: this.closeModal,
                        shouldCloseOnOverlayClick: true,
                        closeTimeoutMS: 1
                    },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_reactAutosuggest2.default, {
                            suggestions: suggestions,
                            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
                            onSuggestionSelected: this.onSuggestionSelected,
                            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
                            getSuggestionValue: this.getSuggestionValue,
                            inputProps: inputProps,
                            renderSuggestion: this.renderSuggestion,
                            renderInputComponent: _AsyncAutoSuggestInput2.default,
                            shouldRenderSuggestions: this.shouldRenderSuggestions,
                            alwaysRenderSuggestions: alwaysRenderSuggestions
                        })
                    ),
                    isLoading && _react2.default.createElement(
                        'div',
                        { className: 'has-text-centered', style: { padding: '80px 0 40px' } },
                        _react2.default.createElement(_CircularProgress2.default, null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { className: 'subhead' },
                            'Loading results...'
                        )
                    ),
                    !isLoading && suggestions.length === 0 && searchValue !== '' && _react2.default.createElement(
                        'span',
                        { className: 'subhead' },
                        'Could not find a result with the given search parameter'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'auto-complete-select-close' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            { onClick: this.closeModal },
                            _react2.default.createElement(
                                _FontIcon2.default,
                                { className: 'material-icons', color: '#999' },
                                'clear'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AsyncAutoCompleteSelect;
}(_react2.default.PureComponent);

AsyncAutoCompleteSelect.propTypes = {
    dataSource: _propTypes2.default.func,
    dataSourceLabel: _propTypes2.default.string,
    disabled: _propTypes2.default.bool.isRequired,
    errorText: _propTypes2.default.string,
    value: _propTypes2.default.any,
    label: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    alwaysRenderSuggestions: _propTypes2.default.bool,
    minLength: _propTypes2.default.number
};
AsyncAutoCompleteSelect.defaultProps = {
    dataSourceLabel: 'label',
    disabled: false,
    errorText: '',
    value: null,
    alwaysRenderSuggestions: false,
    minLength: 2
};
AsyncAutoCompleteSelect.contextTypes = {
    muiTheme: _propTypes2.default.object.isRequired
};
exports.default = AsyncAutoCompleteSelect;