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

        _this.difference = function (files1, files2) {
            var set1 = new Set(files1);
            var set2 = new Set(files2);

            var difference = new Set([].concat(_toConsumableArray(set1)).filter(function (file) {
                return !set2.has(file);
            }));

            return [].concat(_toConsumableArray(difference));
        };

        _this.filterFilesWithInvalidNames = function (files) {
            var filesToFilter = [].concat(_toConsumableArray(files));

            /*
             * Validate accepted files and get list of invalid files (check fileName, fileNameLength)
             */
            return filesToFilter.filter(function (file) {
                return new RegExp(_this.props.fileNameRestrictions, 'gi').test(file.name);
            });
        };

        _this.filterOnDrop = function (accepted, folders) {
            var filesWithoutFolders = folders.length > 0 ? accepted.filter(function (file) {
                return folders.indexOf(file.name) === -1;
            }) : accepted;

            var filesWithValidNames = _this.filterFilesWithInvalidNames([].concat(_toConsumableArray(filesWithoutFolders)));

            var invalidFiles = _this.difference(filesWithoutFolders, filesWithValidNames);

            _this.errors.set('folder', folders);
            _this.errors.set('fileName', invalidFiles.map(function (file) {
                return file.name;
            }));

            _this.props.onDrop([].concat(_toConsumableArray(filesWithValidNames)), _this.errors);

            _this.errors = new Map([]);
        };

        _this._onDrop = function (accepted, rejected, event) {
            _this.errors.set('maxFileSize', rejected.map(function (file) {
                return file.name;
            }));

            /*
             * From droppedEvent dataTransfer items, determine which items are folders
             *
             * Safari and IE doesn't support event.dataTransfer.items
             * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
             *
             * Using FileReader API async to read slice of file will throw an error if it's a folder
             */
            if (!!event && !!event.dataTransfer && !!event.dataTransfer.items) {
                var folders = [].concat(_toConsumableArray(event.dataTransfer.items)).filter(function (item) {
                    return item.webkitGetAsEntry().isDirectory;
                }).map(function (item) {
                    return item.webkitGetAsEntry().name;
                });

                _this.filterOnDrop([].concat(_toConsumableArray(accepted)), [].concat(_toConsumableArray(folders)));
            } else {
                _this.getDroppedFolders([].concat(_toConsumableArray(accepted))).then(function (result) {
                    var folders = result.filter(function (folder) {
                        return !!folder;
                    });

                    _this.filterOnDrop([].concat(_toConsumableArray(accepted)), [].concat(_toConsumableArray(folders)));
                });
            }
        };

        _this._onKeyPress = function () {
            _this.dropzoneRef.open();
        };

        _this.dropzoneRef = null;
        _this.errors = new Map([]);
        return _this;
    }

    /**
     * Get the list of folders using FileReader API
     *
     * @param accepted files and/or folders
     * @returns {Promise.<*>}
     */


    _createClass(FileUploadDropzone, [{
        key: 'getDroppedFolders',
        value: function getDroppedFolders(accepted) {
            var acceptedFilesAndFolders = [].concat(_toConsumableArray(accepted));
            return Promise.all(acceptedFilesAndFolders.map(function (file) {
                return new Promise(function (resolve) {
                    var fileReader = new FileReader();
                    fileReader.onerror = function () {
                        return resolve(file.name);
                    };
                    fileReader.onload = function () {
                        return resolve();
                    };
                    var slice = file.slice(0, 10);
                    fileReader.readAsDataURL(slice);
                });
            }));
        }

        /**
         * Diff of two array
         *
         * @param files1
         * @param files2
         * @returns Array
         * @private
         */


        /**
         * Filter accepted files from dropzone
         *  - Remove folders and set error for folders
         *  - Remove files with invalid names and set error
         *  - Hand over valid files only to file uploader
         *
         * @param accepted
         * @param folders
         */


        /**
         * Handle accepted and rejected files on dropped in Dropzone
         *
         * @param accepted
         * @param rejected
         * @param event
         * @private
         */


        /**
         * Open dropzone on key pressed
         */

    }, {
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
                                ref: function ref(node) {
                                    _this2.dropzoneRef = node;
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