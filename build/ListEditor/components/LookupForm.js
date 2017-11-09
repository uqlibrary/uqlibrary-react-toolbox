'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LookupForm = function (_Component) {
    _inherits(LookupForm, _Component);

    function LookupForm(props) {
        _classCallCheck(this, LookupForm);

        var _this = _possibleConstructorReturn(this, (LookupForm.__proto__ || Object.getPrototypeOf(LookupForm)).call(this, props));

        _this.addKeyValueItem = function (item) {
            _this.props.onAdd(item);
        };

        return _this;
    }

    _createClass(LookupForm, [{
        key: 'render',
        value: function render() {
            console.log(this.props.errorText);
            return _react2.default.createElement(
                'div',
                { className: 'columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    this.props.inputField && _react2.default.createElement(this.props.inputField, {
                        input: { onChange: this.props.onAdd },
                        floatingLabelText: this.props.locale.inputFieldLabel,
                        hintText: this.props.locale.inputFieldHint,
                        disabled: this.props.disabled,
                        errorText: this.props.errorText })
                )
            );
        }
    }]);

    return LookupForm;
}(_react.Component);

LookupForm.defaultProps = {
    isValid: function isValid() {
        return '';
    },
    locale: {
        inputFieldLabel: 'Item name',
        inputFieldHint: 'Please type the item name, then select from the list'
    }
};
exports.default = LookupForm;