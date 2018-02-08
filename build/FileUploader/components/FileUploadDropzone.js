'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _Alert = require('../../Alert');

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

        _this.clearAccepted = function () {
            _this.accepted = new Map();
        };

        _this.difference = function (accepted, rejected) {
            return new Set([].concat(_toConsumableArray(accepted)).filter(function (file) {
                return !rejected.has(file);
            }));
        };

        _this.add = function (files) {
            [].concat(_toConsumableArray(files)).map(function (file) {
                return _this.accepted.set(file.name, file);
            });
        };

        _this.validate = function (file) {
            var twoPeriod = file.name.split('.').length > 2;
            if (twoPeriod) {
                _this.setError('fileName', file);
            }

            var length = file.name.length > 45;
            if (length) {
                _this.setError('fileNameLength', file);
            }

            var space = file.name.split(' ').length > 1;
            if (space) {
                _this.setError('fileName', file);
            }

            return length || twoPeriod || space;
        };

        _this.setError = function (errorType, file) {
            var files = void 0;
            if (!(file instanceof Array)) {
                files = [file];
            } else {
                files = file;
            }
            files.map(function (file) {
                return _this.errors.set(errorType, _this.errors.get(errorType) ? [].concat(_toConsumableArray(_this.errors.get(errorType)), [file]) : [file]);
            });
        };

        _this.processErrors = function (errors) {
            var _this$props$locale$va = _this.props.locale.validation,
                single = _this$props$locale$va.single,
                multiple = _this$props$locale$va.multiple;

            var errorMessages = [];
            var message = void 0;

            var _loop = function _loop(errorCode, files) {
                var fileNames = [];
                files.map(function (file) {
                    fileNames.push(file.name);
                });

                if (files.length > 1) {
                    message = multiple[errorCode].replace('[numberOfFiles]', files.length).replace('[filenames]', fileNames.join(', '));
                } else if (files.length === 1) {
                    message = single[errorCode].replace('[filename]', fileNames.join(', '));
                }

                if (errorCode === 'maxFiles') {
                    errorMessages.push(message.replace('[maxNumberOfFiles]', _this.props.maxFiles));
                } else {
                    errorMessages.push(message);
                }
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = errors.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = _slicedToArray(_ref, 2);

                    var errorCode = _ref2[0];
                    var files = _ref2[1];

                    _loop(errorCode, files);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _this.setState({
                errorMessage: errorMessages.join('; ')
            });

            _this.resetErrors();
        };

        _this.resetErrors = function () {
            _this.errors = new Map();
        };

        _this._onDrop = function (accepted, rejected, event) {
            /*
             * From droppedEvent dataTransfer items, determine which items are folders
             */
            var droppedFolders = !!event && Array.prototype.filter.call(event.dataTransfer.items, function (item) {
                return item.webkitGetAsEntry().isDirectory;
            }).map(function (item) {
                return item.webkitGetAsEntry().name;
            });

            /*
             * Set error for folder
             */
            if (droppedFolders.length > 0) {
                _this.setError('folder', accepted.filter(function (file) {
                    return droppedFolders.indexOf(file.name) >= 0;
                }));
            }

            /*
             * Set error for rejected files (maxFileSize rule)
             */
            if (rejected.length > 0) {
                _this.setError('maxFileSize', rejected);
            }

            /*
             * Folders are accepted by dropzone so remove folders from accepted list
             */
            var acceptedFiles = droppedFolders.length > 0 ? accepted.filter(function (file) {
                return droppedFolders.indexOf(file.name) === -1;
            }) : accepted;

            /*
             * Validate accepted files and get list of invalid files (check fileName, fileNameLength, folder)
             */
            var invalid = acceptedFiles.filter(function (file) {
                return _this.validate(file);
            });

            /*
             * Remove invalid files
             */
            var filtered = _this.difference(new Set(acceptedFiles), new Set(invalid));

            /*
             * Duplicates will be removed by setting up file.name as key
             */
            _this.add(filtered);

            /*
             * If max files uploaded, send max files and set error for ignored files
             */
            var maxFiles = _this.props.maxFiles;

            if (_this.accepted.size > maxFiles) {
                _this.props.onDropped([].concat(_toConsumableArray(_this.accepted.values())).slice(0, maxFiles));
                _this.setError('maxFiles', [].concat(_toConsumableArray(_this.accepted.values())).slice(maxFiles));
            } else {
                _this.props.onDropped([].concat(_toConsumableArray(_this.accepted.values())));
            }

            /*
             * Process any errors
             */
            _this.processErrors(_this.errors);
        };

        _this._onKeyPress = function () {
            _this.dropzoneRef.open();
        };

        _this.state = {
            errorMessage: []
        };
        _this.dropzoneRef = null;
        _this.accepted = new Map();
        _this.errors = new Map();

        _this._onDrop.bind(_this);
        _this._onKeyPress.bind(_this);
        return _this;
    }

    _createClass(FileUploadDropzone, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.clearAccepted();
            this.add(nextProps.uploadedFiles);
            this.resetErrors();

            if (nextProps.clearErrors) this.processErrors(this.errors);
        }

        /**
         * Clear accepted files
         */


        /**
         * Diff of two sets
         *
         * @param accepted
         * @param rejected
         * @returns {Set}
         * @private
         */


        /**
         * Add given files
         *
         * @param files
         * @private
         */


        /**
         * Validate file
         *
         * @param file
         * @returns {boolean}
         * @private
         */


        /**
         * Set file/s error for given errorType
         *
         * @param errorType
         * @param file
         * @private
         */


        /**
         * Process errors
         *
         * @private
         */


        /**
         * Reset errors
         *
         * @private
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
            var _this2 = this;

            var errorTitle = this.props.locale.errorTitle;
            var errorMessage = this.state.errorMessage;


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
                                maxSize: this.props.maxSize,
                                onDrop: this._onDrop,
                                style: { padding: '0px' },
                                disabled: this.props.disabled,
                                disableClick: this.props.disabled,
                                disablePreview: true },
                            _react2.default.createElement(_FileUploadDropzoneStaticContent2.default, { txt: this.props.locale })
                        )
                    )
                ),
                errorMessage.length > 0 && _react2.default.createElement(_Alert.Alert, { title: errorTitle, message: errorMessage, type: 'error' })
            );
        }
    }]);

    return FileUploadDropzone;
}(_react.PureComponent);

exports.default = FileUploadDropzone;