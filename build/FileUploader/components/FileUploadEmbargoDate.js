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

        return _possibleConstructorReturn(this, (FileUploadEmbargoDate.__proto__ || Object.getPrototypeOf(FileUploadEmbargoDate)).call(this, props));
    }

    _createClass(FileUploadEmbargoDate, [{
        key: 'render',
        value: function render() {
            var _props$locale = this.props.locale,
                dateFormat = _props$locale.dateFormat,
                currentDateString = _props$locale.currentDateString,
                fieldName = _props$locale.fieldName;
            var index = this.props.index;

            return _react2.default.createElement(_DatePicker2.default, {
                className: 'datepicker',
                DateTimeFormat: dateFormat,
                firstDayOfWeek: 0,
                hintText: currentDateString,
                locale: 'en-AU',
                name: fieldName + '@' + index,
                menuItemStyle: { width: '90px' }
            });
        }
    }]);

    return FileUploadEmbargoDate;
}(_react.Component);

FileUploadEmbargoDate.propTypes = {
    index: _propTypes2.default.number.isRequired,
    locale: _propTypes2.default.object,
    progress: _propTypes2.default.number
};
FileUploadEmbargoDate.defaultProps = {
    locale: {
        dateFormat: 'DD/MM/YYYY',
        currentDateString: moment().format('DD/MM/YYYY'),
        fieldName: 'accessDate'
    }
};
exports.default = FileUploadEmbargoDate;