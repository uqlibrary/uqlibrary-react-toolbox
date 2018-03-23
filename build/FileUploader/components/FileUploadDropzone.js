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
                errors.push(file.name);
                return resolve(false);
            };
            fileReader.onload = function () {
                return resolve(file);
            };
            var slice = file.slice(0, 10);
            return fileReader.readAsDataURL(slice);
        };

        _this.removeDuplicate = function (incomingFiles, filesInQueue) {
            // Ignore files from incomingFiles which are already in files queue
            var uniqueFiles = incomingFiles.filter(function (file) {
                return filesInQueue.indexOf(file.name) === -1;
            });
            var duplicateFiles = incomingFiles.filter(function (file) {
                return filesInQueue.indexOf(file.name) >= 0;
            }).map(function (file) {
                return file.name;
            });

            // Return unique files and errors with duplicate file names
            return { uniqueFiles: uniqueFiles, duplicateFiles: duplicateFiles };
        };

        _this.removeDroppedFolders = function (filesAndFolders, errors) {
            return Promise.all(filesAndFolders.map(function (file) {
                return new Promise(function (resolve) {
                    _this.readFile(file, errors, resolve);
                });
            }));
        };

        _this.removeInvalidFileNames = function (incomingFiles, fileNameRestrictions) {
            var validFiles = incomingFiles.filter(function (file) {
                return file && new RegExp(fileNameRestrictions, 'gi').test(file.name);
            });
            var invalidFileNames = incomingFiles.filter(function (file) {
                return file && !new RegExp(fileNameRestrictions, 'gi').test(file.name);
            }).map(function (file) {
                return file.name;
            });

            return { validFiles: validFiles, invalidFileNames: invalidFileNames };
        };

        _this.removeTooManyFiles = function (incomingFiles, maxAllowed) {
            var tooManyFiles = incomingFiles.slice(maxAllowed).map(function (file) {
                return file.name;
            });
            var limitedFiles = incomingFiles.slice(0, maxAllowed);

            return { limitedFiles: limitedFiles, tooManyFiles: tooManyFiles };
        };

        _this._onDrop = function (incomingFiles, rejectedFiles) {
            var _this$props = _this.props,
                fileNameRestrictions = _this$props.fileNameRestrictions,
                filesInQueue = _this$props.filesInQueue,
                fileUploadLimit = _this$props.fileUploadLimit;

            var notFiles = [];

            // Remove folders from accepted files (async)
            _this.removeDroppedFolders([].concat(_toConsumableArray(incomingFiles)), notFiles).then(function (onlyFiles) {
                // Remove invalid file names
                var _this$removeInvalidFi = _this.removeInvalidFileNames(onlyFiles, fileNameRestrictions),
                    validFiles = _this$removeInvalidFi.validFiles,
                    invalidFileNames = _this$removeInvalidFi.invalidFileNames;

                // Remove duplicate files from accepted files


                var _this$removeDuplicate = _this.removeDuplicate(validFiles, filesInQueue),
                    uniqueFiles = _this$removeDuplicate.uniqueFiles,
                    duplicateFiles = _this$removeDuplicate.duplicateFiles;

                // Remove files exceeding the max number of files allowed


                var _this$removeTooManyFi = _this.removeTooManyFiles(uniqueFiles, fileUploadLimit - filesInQueue.length),
                    limitedFiles = _this$removeTooManyFi.limitedFiles,
                    tooManyFiles = _this$removeTooManyFi.tooManyFiles;

                _this.props.onDrop(limitedFiles.map(function (file) {
                    return { fileData: file, name: file.name, size: file.size };
                }), {
                    tooBigFiles: rejectedFiles.map(function (file) {
                        return file.name;
                    }),
                    notFiles: notFiles,
                    invalidFileNames: invalidFileNames,
                    duplicateFiles: duplicateFiles,
                    tooManyFiles: tooManyFiles
                });
            });
        };

        _this._onKeyPress = function () {
            _this.dropzoneRef.open();
        };

        _this.dropzoneRef = null;
        return _this;
    }

    /**
     * Try to read file and set error for a folder
     *
     * @param file
     * @param errors
     * @param resolve
     */


    /**
     * Remove duplicate files from given accepted files
     *
     * @param incomingFiles
     * @param filesInQueue - list of names of files in queue
     * @returns Object
     */


    /**
     * Remove folders from the list
     *
     * @param filesAndFolders files and/or folders
     * @param errors
     * @returns {Promise.<*>}
     */


    /**
     * Remove invalid file names
     *
     * @param incomingFiles - array of files
     * @param fileNameRestrictions - RegExp
     * @returns Object
     */


    /**
     * Remove files if there are too many files
     *
     * @param incomingFiles - array of files
     * @param maxAllowed files to return
     * @returns Object
     */


    /**
     * Handle accepted and rejected files on dropped in Dropzone
     *
     * @param incomingFiles
     * @param rejectedFiles
     * @private
     */


    /**
     * Open dropzone on key pressed
     */


    _createClass(FileUploadDropzone, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                                ref: function ref(_ref) {
                                    _this2.dropzoneRef = _ref;
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

FileUploadDropzone.defaultProps = {
    fileUploadLimit: 10,
    filesInQueue: []
};
exports.default = FileUploadDropzone;