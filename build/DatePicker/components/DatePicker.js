'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DatePickerWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DatePickerWrapper(props) {
    var filteredProps = (0, _filterProps2.default)(props, _DatePicker2.default.propTypes);
    filteredProps.name = props.input ? props.input.name : props.name;
    filteredProps.floatingLabelText = props.floatingLabelText;
    filteredProps.floatingLabelFixed = props.floatingLabelFixed;

    filteredProps.value = filteredProps.value instanceof Date ? filteredProps.value : new Date();
    filteredProps.onChange = function (e, value) {
        return props.input.onChange(value);
    };
    delete filteredProps.onBlur;

    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%' } },
        _react2.default.createElement(_DatePicker2.default, filteredProps),
        props.help && props.help.text && _react2.default.createElement(
            'div',
            { style: { position: 'absolute', top: '20px', right: 0 } },
            _react2.default.createElement(_HelpDrawer.HelpIcon, props.help)
        )
    );
}

DatePickerWrapper.propTypes = _extends({}, _DatePicker2.default.propTypes, {
    help: _propTypes2.default.shape({
        title: _propTypes2.default.string,
        text: _propTypes2.default.object,
        buttonLabel: _propTypes2.default.string
    })
});