'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUploadDropzoneStaticContent = function FileUploadDropzoneStaticContent() {
    return _react2.default.createElement(
        'div',
        { className: 'columns file-instructions' },
        _react2.default.createElement(
            'div',
            { className: 'column' },
            _react2.default.createElement(
                'h3',
                null,
                'File upload restrictions'
            ),
            _react2.default.createElement(
                'div',
                null,
                'Please ensure your files:',
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        'begin with a letter and are less than 45 characters long'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'contain only upper and lowercase alphanumeric characters, and underscores'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'have only a single period which precedes the file extension: \u201C.pdf\u201D'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'are uploaded individually and not inside a folder'
                    )
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'column upload-instructions' },
            _react2.default.createElement(
                _FontIcon2.default,
                {
                    className: 'material-icons' },
                'cloud_upload'
            ),
            _react2.default.createElement(
                'p',
                null,
                'Click here to select files, or drag files into this area to upload'
            )
        )
    );
};

exports.default = FileUploadDropzoneStaticContent;