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

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require('moment');

var _ref = _react2.default.createElement(_MenuItem2.default, { key: -1, value: -1, primaryText: '' });

var PartialDateForm = function (_Component) {
    _inherits(PartialDateForm, _Component);

    function PartialDateForm(props) {
        _classCallCheck(this, PartialDateForm);

        var _this = _possibleConstructorReturn(this, (PartialDateForm.__proto__ || Object.getPrototypeOf(PartialDateForm)).call(this, props));

        _this._validate = function (state) {
            var valid = void 0;
            var day = state.day,
                month = state.month,
                year = state.year;


            if (_this.props.allowPartial) {
                valid = !isNaN(year) && year !== null && moment(state).isValid();
            } else {
                valid = moment(state).isValid() && !isNaN(day) && day !== null && !isNaN(year) && year !== null && month !== null;
            }

            return valid;
        };

        _this._displayErrors = function (state, valid) {
            var day = state.day,
                month = state.month,
                year = state.year;
            var locale = _this.props.locale;


            _this.errors.year = isNaN(year) ? locale.validationMessage.year : '';

            if (_this.props.allowPartial) {
                _this.errors.month = year && month < 0 ? locale.validationMessage.month : '';
                _this.errors.day = day && year && month > -1 && !valid ? locale.validationMessage.day : '';
            } else {
                _this.errors.month = month < 0 ? locale.validationMessage.month : '';
                _this.errors.day = isNaN(day) || (month !== null || month > -1) && year && !valid ? locale.validationMessage.day : '';
            }
        };

        _this._setDate = function (date) {
            var valid = _this._validate(date);

            _this._displayErrors(date, valid);

            if (valid) {
                if (_this.props.allowPartial) {
                    date.month = date.month < 0 ? 0 : date.month;
                }
                return moment(date).format(_this.props.dateFormat);
            }
            return '';
        };

        _this._isNumber = function (event) {
            if (event.charCode < _this.props.locale.minNumberCharCode || event.charCode > _this.props.locale.maxNumberCharCode) {
                event.preventDefault();
            }
        };

        _this._onDateChanged = function (key) {
            return function (event, index, value) {
                _this.setState(_defineProperty({}, key, parseInt(event.target.value === undefined ? value : event.target.value, 10)));
            };
        };

        _this.state = {
            day: null,
            month: null,
            year: null
        };
        _this.errors = {};
        return _this;
    }

    _createClass(PartialDateForm, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onChange) this.props.onChange(this._setDate(nextState));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                locale = _props.locale,
                months = _props.months,
                className = _props.className;

            var renderMonths = months.map(function (month, index) {
                return _react2.default.createElement(_MenuItem2.default, { key: index, value: index, primaryText: month });
            });
            return _react2.default.createElement(
                'div',
                { className: 'columns is-multiline is-gapless-mobile' },
                _react2.default.createElement(
                    'div',
                    { className: this.props.floatingTitleRequired ? 'column is-12 dateTitle required' : 'column is-12 dateTitle' },
                    this.props.floatingTitle
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    _react2.default.createElement(_TextField2.default, {
                        name: 'day',
                        type: 'text',
                        maxLength: '2',
                        className: !this.props.allowPartial && className ? className : null,
                        fullWidth: true,
                        disabled: this.props.disabled,
                        errorText: this.errors.day,
                        onKeyPress: this._isNumber,
                        onChange: this._onDateChanged('day'),
                        onBlur: !this.props.allowPartial ? this._onDateChanged('day') : undefined,
                        hintText: locale.dayLabel
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    _react2.default.createElement(
                        _SelectField2.default,
                        {
                            name: 'month',
                            dropDownMenuProps: { animated: false },
                            fullWidth: true,
                            disabled: this.props.disabled,
                            value: this.state.month,
                            className: !this.props.allowPartial && className ? className : null,
                            hintText: locale.monthLabel,
                            errorText: this.errors.month,
                            onChange: this._onDateChanged('month') },
                        _ref,
                        renderMonths
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    _react2.default.createElement(_TextField2.default, {
                        name: 'year',
                        type: 'text',
                        fullWidth: true,
                        className: className + ' mui-long-labels-fix',
                        maxLength: '4',
                        disabled: this.props.disabled,
                        hintText: locale.yearLabel,
                        errorText: this.errors.year,
                        onKeyPress: this._isNumber,
                        onChange: this._onDateChanged('year'),
                        onBlur: this._onDateChanged('year')
                    })
                )
            );
        }
    }]);

    return PartialDateForm;
}(_react.Component);

PartialDateForm.defaultProps = {
    locale: {
        dayLabel: 'Day',
        monthLabel: 'Month',
        yearLabel: 'Year',
        validationMessage: {
            day: 'Invalid day',
            month: 'Invalid month',
            year: 'Invalid year'
        },
        minNumberCharCode: 48,
        maxNumberCharCode: 57
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dateFormat: 'YYYY-MM-DD',
    allowPartial: false,
    floatingTitle: 'Enter a date',
    floatingTitleRequired: false,
    className: ''
};
exports.default = PartialDateForm;