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

        _this._onDrop = function (accepted, rejected, event) {
            /*
             * From droppedEvent dataTransfer items, determine which items are folders
             *
             * Safari and IE doesn't support event.dataTransfer.items
             * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
             *
             * Using FileReader API async to read slice of file will throw an error if it's a folder
             */
            var droppedFolders = [];
            if (!!event && !!event.dataTransfer && !!event.dataTransfer.items) {
                droppedFolders = Array.prototype.filter.call(event.dataTransfer.items, function (item) {
                    return item.webkitGetAsEntry().isDirectory;
                }).map(function (item) {
                    return item.webkitGetAsEntry().name;
                });
                _this.props.onDropped([].concat(_toConsumableArray(accepted)), [].concat(_toConsumableArray(rejected)), [].concat(_toConsumableArray(droppedFolders)));
            } else {
                _this.getDroppedFolders([].concat(_toConsumableArray(accepted))).then(function (result) {
                    droppedFolders = result.filter(function (folder) {
                        return !!folder;
                    });
                    _this.props.onDropped([].concat(_toConsumableArray(accepted)), [].concat(_toConsumableArray(rejected)), [].concat(_toConsumableArray(droppedFolders)));
                });
            }
        };

        _this._onKeyPress = function () {
            _this.dropzoneRef.open();
        };

        _this.dropzoneRef = null;
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
                            _react2.default.createElement(_FileUploadDropzoneStaticContent2.default, { txt: locale })
                        )
                    )
                )
            );
        }
    }]);

    return FileUploadDropzone;
}(_react.PureComponent);

exports.default = FileUploadDropzone;