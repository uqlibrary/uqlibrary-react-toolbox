'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLOSED_ACCESS_ID = exports.OPEN_ACCESS_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OPEN_ACCESS_ID = exports.OPEN_ACCESS_ID = 9;
var CLOSED_ACCESS_ID = exports.CLOSED_ACCESS_ID = 8;

var FileUploadAccessSelector = function (_Component) {
    _inherits(FileUploadAccessSelector, _Component);

    function FileUploadAccessSelector(props) {
        _classCallCheck(this, FileUploadAccessSelector);

        var _this = _possibleConstructorReturn(this, (FileUploadAccessSelector.__proto__ || Object.getPrototypeOf(FileUploadAccessSelector)).call(this, props));

        _this._onChange = function (event, index, value) {
            _this.setState({ value: value });
            _this.props.onAccessChanged({ key: [_this.props.locale.fileMetaKey], value: value });
        };

        _this.state = {
            value: null
        };
        return _this;
    }

    _createClass(FileUploadAccessSelector, [{
        key: 'render',
        value: function render() {
            var _props$locale = this.props.locale,
                initialValue = _props$locale.initialValue,
                fieldName = _props$locale.fieldName,
                accessIds = _props$locale.accessIds;


            var accessOptions = accessIds.map(function (access, index) {
                return _react2.default.createElement(_MenuItem2.default, { value: access.id, primaryText: access.value, key: index });
            });

            return _react2.default.createElement(
                _SelectField2.default,
                {
                    name: fieldName,
                    autoWidth: true,
                    className: 'selectField',
                    hintText: initialValue,
                    maxHeight: 250,
                    onChange: this._onChange,
                    value: this.state.value },
                _react2.default.createElement(_MenuItem2.default, { value: null, primaryText: initialValue, key: -1 }),
                accessOptions
            );
        }
    }]);

    return FileUploadAccessSelector;
}(_react.Component);

FileUploadAccessSelector.propTypes = {
    onAccessChanged: _propTypes2.default.func,
    locale: _propTypes2.default.object
};
FileUploadAccessSelector.defaultProps = {
    locale: {
        fileMetaKey: 'access_condition_id',
        initialValue: 'Select access conditions',
        fieldName: 'accessDate',
        accessIds: [{
            id: CLOSED_ACCESS_ID,
            value: 'Closed Access'
        }, {
            id: OPEN_ACCESS_ID,
            value: 'Open Access'
        }]
    }
};
exports.default = FileUploadAccessSelector;