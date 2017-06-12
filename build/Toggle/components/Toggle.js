'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ToggleWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToggleWrapper(props) {
    var filteredProps = (0, _filterProps2.default)(props, _Toggle2.default.propTypes);
    delete filteredProps.errorText;

    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%' } },
        _react2.default.createElement(_Toggle2.default, filteredProps),
        props.helpText && _react2.default.createElement(
            'div',
            { style: { position: 'absolute', top: '20px', right: 0 } },
            _react2.default.createElement(_HelpDrawer.HelpIcon, { title: props.helpTitle, text: props.helpText, buttonLabel: 'Ok' })
        )
    );
}

ToggleWrapper.propTypes = _extends({}, _Toggle2.default.propTypes, {
    helpTitle: _propTypes2.default.string,
    helpText: _propTypes2.default.any
});