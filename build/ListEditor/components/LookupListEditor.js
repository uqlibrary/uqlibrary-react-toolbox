'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LookupListEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListEditor = require('./ListEditor');

var _ListEditor2 = _interopRequireDefault(_ListEditor);

var _LookupForm = require('./LookupForm');

var _LookupForm2 = _interopRequireDefault(_LookupForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LookupListEditor(fieldProps) {
    return _react2.default.createElement(_ListEditor2.default, _extends({ formComponent: _LookupForm2.default }, fieldProps));
}