'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _FileUploadDropzoneStaticContent = require('./FileUploadDropzoneStaticContent');

var _FileUploadDropzoneStaticContent2 = _interopRequireDefault(_FileUploadDropzoneStaticContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploadDropzone = function (_PureComponent) {
    _inherits(FileUploadDropzone, _PureComponent);

    function FileUploadDropzone(props) {
        _classCallCheck(this, FileUploadDropzone);

        var _this = _possibleConstructorReturn(this, (FileUploadDropzone.__proto__ || Object.getPrototypeOf(FileUploadDropzone)).call(this, props));

        _this.readFile = function (file, errors, resolve) {
            var fileReader = new FileReader();
            fileReader.onerror = function () {
                errors.folder.push(file.name);
                return resolve(false);
            };
            fileReader.onload = function () {
                return resolve(file);
            };
            var slice = file.slice(0, 10);
            return fileReader.readAsDataURL(slice);
        };

        _this._onDrop = function (accepted, rejected) {
            var errors = {
                maxFileSize: rejected.map(function (file) {
                    return file.name;
                }),
                folder: [],
                fileName: []
            };

            /*
             * Remove folders from accepted files (async)
             */
            _this.removeDroppedFolders([].concat(_toConsumableArray(accepted)), errors).then(function (result) {
                var filtered = [].concat(_toConsumableArray(result)).filter(function (file) {
                    var valid = file && new RegExp(_this.props.fileNameRestrictions, 'gi').test(file.name);
                    file && !valid && errors.fileName.push(file.name);
                    return file && valid;
                });

                _this.props.onDrop([].concat(_toConsumableArray(filtered)), errors);
            });
        };

        _this._onKeyPress = function () {
            _this.dropzoneRef.open();
        };

        _this.dropzoneRef = null;
        return _this;
    }

    /**
     * Remove folders from the list
     *
     * @param accepted files and/or folders
     * @param errors
     * @returns {Promise.<*>}
     */


    _createClass(FileUploadDropzone, [{
        key: 'removeDroppedFolders',
        value: function removeDroppedFolders(accepted, errors) {
            var _this2 = this;

            var acceptedFilesAndFolders = [].concat(_toConsumableArray(accepted));
            return Promise.all(acceptedFilesAndFolders.map(function (file) {
                return new Promise(function (resolve) {
                    _this2.readFile(file, errors, resolve);
                });
            }));
        }

        /**
         * Try to read file and set error for a folder
         *
         * @param file
         * @param errors
         * @param resolve
         */


        /**
         * Handle accepted and rejected files on dropped in Dropzone
         *
         * @param accepted
         * @param rejected
         * @private
         */


        /**
         * Open dropzone on key pressed
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                maxSize = _props.maxSize,
                disabled = _props.disabled,
                locale = _props.locale;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column', tabIndex: '0', onKeyPress: this._onKeyPress },
                        _react2.default.createElement(
                            _reactDropzone2.default,
                            {
                                ref: function ref(node) {
                                    _this3.dropzoneRef = node;
                                },
                                maxSize: maxSize,
                                onDrop: this._onDrop,
                                style: { padding: '0px' },
                                disabled: disabled,
                                disableClick: disabled,
                                disablePreview: true },
                            _react2.default.createElement(_FileUploadDropzoneStaticContent2.default, { locale: locale })
                        )
                    )
                )
            );
        }
    }]);

    return FileUploadDropzone;
}(_react.PureComponent);

exports.default = FileUploadDropzone;