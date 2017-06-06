'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (inputProps) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TextField2.default, _extends({ id: 'async-auto-suggest-input',
            autoFocus: true,
            floatingLabelFixed: true,
            floatingLabelText: 'Start typing to filter',
            style: { marginTop: 0 },
            fullWidth: true
        }, inputProps))
    );
};