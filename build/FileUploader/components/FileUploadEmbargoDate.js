'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require('moment');

var FileUploadEmbargoDate = function (_Component) {
    _inherits(FileUploadEmbargoDate, _Component);

    function FileUploadEmbargoDate(props) {
        _classCallCheck(this, FileUploadEmbargoDate);

        var _this = _possibleConstructorReturn(this, (FileUploadEmbargoDate.__proto__ || Object.getPrototypeOf(FileUploadEmbargoDate)).call(this, props));

        _this._onChange = function (event, value) {
            var date = moment(value);
            _this.setState({ value: date.toDate() });
            _this.props.onDateChanged({ key: _this.props.defaultConfig.fileMetaKey, value: date.format() });
        };

        _this._onKeyPress = function () {
            _this.datePickerRef.openDialog();
        };

        _this.state = {
            value: new Date()
        };
        _this.minDate = new Date();
        _this.datePickerRef = null;
        return _this;
    }

    _createClass(FileUploadEmbargoDate, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var datePickerLocale = this.props.locale.datePickerLocale;
            var _props$defaultConfig = this.props.defaultConfig,
                dateTimeFormat = _props$defaultConfig.dateTimeFormat,
                fieldName = _props$defaultConfig.fieldName;

            return _react2.default.createElement(
                'div',
                { tabIndex: 0, onKeyPress: this._onKeyPress },
                _react2.default.createElement(_DatePicker2.default, {
                    className: 'embargo-date-picker requiredField',
                    DateTimeFormat: dateTimeFormat,
                    firstDayOfWeek: 0,
                    locale: datePickerLocale,
                    autoOk: true,
                    minDate: this.minDate,
                    value: this.state.value,
                    id: fieldName,
                    name: fieldName,
                    onChange: this._onChange,
                    disabled: this.props.disabled,
                    ref: function ref(datePicker) {
                        return _this2.datePickerRef = datePicker;
                    }
                })
            );
        }
    }]);

    return FileUploadEmbargoDate;
}(_react.Component);

FileUploadEmbargoDate.propTypes = {
    locale: _propTypes2.default.object,
    defaultConfig: _propTypes2.default.object,
    onDateChanged: _propTypes2.default.func,
    disabled: _propTypes2.default.bool
};
FileUploadEmbargoDate.defaultProps = {
    locale: {
        datePickerLocale: 'en-AU'
    },
    defaultConfig: {
        fileMetaKey: 'date',
        dateTimeFormat: global.Intl.DateTimeFormat,
        fieldName: 'accessDate'
    }
};
exports.default = FileUploadEmbargoDate;