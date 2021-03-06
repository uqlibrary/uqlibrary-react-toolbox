'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _accessSelectOptionsT;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploadAccessSelector = function (_PureComponent) {
    _inherits(FileUploadAccessSelector, _PureComponent);

    function FileUploadAccessSelector() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FileUploadAccessSelector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUploadAccessSelector.__proto__ || Object.getPrototypeOf(FileUploadAccessSelector)).call.apply(_ref, [this].concat(args))), _this), _this._onChange = function (event, index, value) {
            if (_this.props.onChange) _this.props.onChange(value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FileUploadAccessSelector, [{
        key: 'render',
        value: function render() {
            var _props$locale = this.props.locale,
                initialValue = _props$locale.initialValue,
                accessSelectOptionsText = _props$locale.accessSelectOptionsText,
                errorMessage = _props$locale.errorMessage;
            var _props = this.props,
                value = _props.value,
                disabled = _props.disabled;

            var accessOptions = [_config.OPEN_ACCESS_ID, _config.CLOSED_ACCESS_ID].map(function (access, index) {
                return _react2.default.createElement(_MenuItem2.default, { value: parseInt(access, 10), primaryText: accessSelectOptionsText[access], key: 'access_option_key_' + index });
            });

            return _react2.default.createElement(
                _SelectField2.default,
                {
                    id: 'accessCondition',
                    className: 'selectField requiredField',
                    hintText: initialValue,
                    dropDownMenuProps: { animated: false },
                    maxHeight: 250,
                    onChange: this._onChange,
                    errorText: !value ? errorMessage : '',
                    floatingLabelFixed: true,
                    disabled: disabled,
                    value: value },
                accessOptions
            );
        }
    }]);

    return FileUploadAccessSelector;
}(_react.PureComponent);

FileUploadAccessSelector.defaultProps = {
    locale: {
        initialValue: 'Select access conditions',
        accessSelectOptionsText: (_accessSelectOptionsT = {}, _defineProperty(_accessSelectOptionsT, _config.OPEN_ACCESS_ID, 'Open Access'), _defineProperty(_accessSelectOptionsT, _config.CLOSED_ACCESS_ID, 'Closed Access'), _accessSelectOptionsT),
        errorMessage: 'This field is required'
    },
    value: null
};
exports.default = FileUploadAccessSelector;