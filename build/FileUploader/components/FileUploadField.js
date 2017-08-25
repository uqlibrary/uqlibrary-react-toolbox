'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FileUploadField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FileUploader = require('./FileUploader');

var _FileUploader2 = _interopRequireDefault(_FileUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FileUploadField(fieldProps) {
    return _react2.default.createElement(_FileUploader2.default, _extends({ onChange: fieldProps.input.onChange }, fieldProps));
}