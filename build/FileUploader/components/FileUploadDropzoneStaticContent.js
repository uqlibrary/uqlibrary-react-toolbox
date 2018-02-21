'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons' },
    'cloud_upload'
);

var FileUploadDropzoneStaticContent = function FileUploadDropzoneStaticContent(_ref) {
    var txt = _ref.txt;
    return _react2.default.createElement(
        'div',
        { className: 'columns file-instructions' },
        _react2.default.createElement(
            'div',
            { className: 'column' },
            txt.fileUploadRestrictionHeading,
            txt.fileUploadRestrictions
        ),
        _react2.default.createElement(
            'div',
            { className: 'column upload-instructions' },
            _ref2,
            txt.fileUploadInstruction
        )
    );
};

exports.default = FileUploadDropzoneStaticContent;