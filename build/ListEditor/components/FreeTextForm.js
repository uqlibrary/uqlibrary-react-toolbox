'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreeTextForm = function (_Component) {
    _inherits(FreeTextForm, _Component);

    function FreeTextForm(props) {
        _classCallCheck(this, FreeTextForm);

        var _this = _possibleConstructorReturn(this, (FreeTextForm.__proto__ || Object.getPrototypeOf(FreeTextForm)).call(this, props));

        _this.addItem = function (event) {
            // add item if user hits 'enter' key on input field
            if (_this.props.disabled || _this.props.isValid(_this.state.itemName) !== '' || event && event.key && (event.key !== 'Enter' || _this.state.itemName.length === 0)) {
                return;
            }

            // pass on the selected item
            _this.props.onAdd(_this.state.itemName);

            // reset internal state
            _this.setState({
                itemName: ''
            });

            // move focus to name as published text field after item was added
            if (_this.refs.itemName) _this.refs.itemName.focus();
        };

        _this.onNameChanged = function (event, newValue) {
            _this.setState({
                itemName: newValue
            });
        };

        _this.state = {
            itemName: ''
        };
        return _this;
    }

    _createClass(FreeTextForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    _react2.default.createElement(_TextField2.default, {
                        fullWidth: true,
                        ref: 'itemName',
                        floatingLabelText: this.props.locale.inputFieldLabel,
                        hintText: this.props.locale.inputFieldHint,
                        value: this.state.itemName,
                        onChange: this.onNameChanged,
                        onKeyPress: this.addItem,
                        errorText: this.props.isValid(this.state.itemName) || this.props.errorText ? (this.props.errorText || '') + ' ' + this.props.isValid(this.state.itemName) : null,
                        disabled: this.props.disabled })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow' },
                    _react2.default.createElement(_RaisedButton2.default, {
                        className: 'is-mui-spacing-button',
                        fullWidth: true,
                        primary: true,
                        label: this.props.locale.addButtonLabel,
                        disabled: this.props.disabled || this.props.isValid(this.state.itemName) !== '' || this.state.itemName.trim().length === 0,
                        onClick: this.addItem })
                )
            );
        }
    }]);

    return FreeTextForm;
}(_react.Component);

FreeTextForm.defaultProps = {
    isValid: function isValid() {
        return '';
    },
    locale: {
        inputFieldLabel: 'Item name',
        inputFieldHint: 'Please type the item name',
        addButtonLabel: 'Add'
    }
};
exports.default = FreeTextForm;