'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _uqlibraryReactToolbox = require('uqlibrary-react-toolbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxWrapper = function CheckboxWrapper(props) {
    var filteredProps = (0, _filterProps2.default)(props, _Checkbox2.default.propTypes);
    filteredProps.onCheck = function (event, isInputChecked) {
        return props.input.onChange(isInputChecked);
    };
    delete filteredProps.errorText;

    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%' }, className: props.meta && props.meta.error ? 'error-checkbox' : {} },
        _react2.default.createElement(_Checkbox2.default, filteredProps),
        props.helpText && _react2.default.createElement(_uqlibraryReactToolbox.HelpIcon, { title: props.helpTitle, text: props.helpText, buttonLabel: 'Ok' })
    );
};

CheckboxWrapper.propTypes = _extends({}, _Checkbox2.default.propTypes, {
    helpTitle: _propTypes2.default.string,
    helpText: _propTypes2.default.any
});

exports.default = CheckboxWrapper;