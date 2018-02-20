'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoSuggestField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSuggestField = exports.AutoSuggestField = function (_Component) {
    _inherits(AutoSuggestField, _Component);

    function AutoSuggestField(props) {
        _classCallCheck(this, AutoSuggestField);

        var _this = _possibleConstructorReturn(this, (AutoSuggestField.__proto__ || Object.getPrototypeOf(AutoSuggestField)).call(this, props));

        _this.updateSelectedValue = function (value) {
            _this.setState({
                selectedValue: value
            }, function () {
                if (_this.props.async && _this.props.loadSuggestions && _this.state.selectedValue && _this.state.selectedValue.trim().length > 0) {
                    if (_this.bounce) {
                        clearTimeout(_this.bounce);
                    }
                    _this.bounce = setTimeout(_this.props.loadSuggestions, _this.props.debounceDelay, _this.props.category, _this.state.selectedValue);
                }
            });
        };

        _this.textUpdated = function (searchText) {
            _this.setState({
                searchText: searchText
            });

            if (_this.props.allowFreeText) {
                _this.updateSelectedValue(searchText);
            }
        };

        _this.valueSelected = function (value, index) {
            if (index >= 0) {
                _this.updateSelectedValue(_this.props.itemsList[index]);
            } else if (_this.props.allowFreeText) {
                _this.updateSelectedValue(value);
            }

            // clean up input field
            if (!_this.props.allowFreeText) {
                _this.setState({
                    searchText: ''
                });
            }
            // refocus on the field after selection
            if (_this.state.input) {
                _this.state.input.focus();
            }
        };

        _this.setAutoCompleteInput = function (input) {
            return _this.setState({ input: input });
        };

        _this.state = {
            searchText: props.selectedValue,
            selectedValue: null
        };
        _this.bounce = null;
        return _this;
    }

    _createClass(AutoSuggestField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.async && this.props.loadSuggestions) {
                this.props.loadSuggestions(this.props.category);
            }
            if (this.props.selectedValue !== null) {
                this.updateSelectedValue(this.props.selectedValue);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.selectedValue !== this.props.selectedValue) {
                this.setState({
                    selectedValue: newProps.selectedValue,
                    searchText: newProps.selectedValue
                });
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onChange && !!nextState.selectedValue && nextState.selectedValue !== this.state.selectedValue) {
                this.props.onChange(nextState.selectedValue);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_AutoComplete2.default, {
                id: 'textField',
                ref: this.setAutoCompleteInput,
                searchText: this.state.searchText,
                disabled: this.props.disabled,
                listStyle: { maxHeight: 200, overflow: 'auto' },
                filter: !this.props.async ? this.props.filter || _AutoComplete2.default.caseInsensitiveFilter : function () {
                    return true;
                },
                maxSearchResults: this.props.maxResults,
                floatingLabelText: this.props.floatingLabelText,
                hintText: this.props.hintText,
                dataSource: this.props.itemsList,
                fullWidth: true,
                onUpdateInput: this.textUpdated,
                onNewRequest: this.valueSelected,
                className: this.props.className,
                dataSourceConfig: this.props.dataSourceConfig,
                errorText: this.props.errorText,
                menuProps: { menuItemStyle: { whiteSpace: 'normal', lineHeight: '18px', padding: '8px 0', minHeight: '18px', height: 'auto' } }
            });
        }
    }]);

    return AutoSuggestField;
}(_react.Component);

AutoSuggestField.defaultProps = {
    maxResults: 7,
    allowFreeText: false,
    floatingLabelText: 'Enter text',
    hintText: 'Please type text',
    debounceDelay: 150
};