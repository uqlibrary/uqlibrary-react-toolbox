'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

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
        props.help && props.help.text && _react2.default.createElement(_HelpDrawer.HelpIcon, props.help)
    );
};

CheckboxWrapper.propTypes = _extends({}, _Checkbox2.default.propTypes, {
    help: _propTypes2.default.shape({
        title: _propTypes2.default.string,
        text: _propTypes2.default.object,
        buttonLabel: _propTypes2.default.string
    })
});

exports.default = CheckboxWrapper;