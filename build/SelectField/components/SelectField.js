'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectFieldWrapper = function SelectFieldWrapper(props) {
    var filteredProps = (0, _filterProps2.default)(props, _SelectField2.default.propTypes);
    filteredProps.onChange = function (event, index, value) {
        return props.input.onChange(value);
    };
    filteredProps.onBlur = function () {
        return props.input.onBlur(props.input.value);
    };
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%' } },
        _react2.default.createElement(_SelectField2.default, filteredProps),
        props.help && props.help.text && _react2.default.createElement(_HelpDrawer.HelpIcon, props.help)
    );
};

SelectFieldWrapper.defaultProps = {
    // TODO: investigate why disabling animation throws errors
    // disable animation to keep focus on the input element
    // dropDownMenuProps: {animated: false},
    maxHeight: 250
};

exports.default = SelectFieldWrapper;