'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploader = exports.sizeBase = exports.sizeUnitText = exports.sizeExponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sizeExponent, _sizeUnitText, _validation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FileUploadDropzone = require('./FileUploadDropzone');

var _FileUploadDropzone2 = _interopRequireDefault(_FileUploadDropzone);

var _FileUploadRowHeader = require('./FileUploadRowHeader');

var _FileUploadRowHeader2 = _interopRequireDefault(_FileUploadRowHeader);

var _FileUploadRow = require('./FileUploadRow');

var _FileUploadRow2 = _interopRequireDefault(_FileUploadRow);

var _Alert = require('../../Alert');

var _FileUploadAccessSelector = require('./FileUploadAccessSelector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moment = require('moment');

var sizeExponent = exports.sizeExponent = (_sizeExponent = {}, _defineProperty(_sizeExponent, 'B', 0), _defineProperty(_sizeExponent, 'K', 1), _defineProperty(_sizeExponent, 'M', 2), _defineProperty(_sizeExponent, 'G', 3), _sizeExponent);

var sizeUnitText = exports.sizeUnitText = (_sizeUnitText = {}, _defineProperty(_sizeUnitText, 'B', 'B'), _defineProperty(_sizeUnitText, 'K', 'KB'), _defineProperty(_sizeUnitText, 'M', 'MB'), _defineProperty(_sizeUnitText, 'G', 'GB'), _sizeUnitText);

var sizeBase = exports.sizeBase = 1000;

var FileUploader = exports.FileUploader = function (_PureComponent) {
    _inherits(FileUploader, _PureComponent);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this._deleteFile = function (file, index) {
            var filesInQueue = [].concat(_toConsumableArray(_this.state.filesInQueue.slice(0, index)), _toConsumableArray(_this.state.filesInQueue.slice(index + 1)));

            _this.setState({
                filesInQueue: filesInQueue,
                errorMessage: '',
                isTermsAndConditionsAccepted: _this.state.isTermsAndConditionsAccepted && _this.isAnyOpenAccess(filesInQueue)
            });
        };

        _this._deleteAllFiles = function () {
            _this.setState({ filesInQueue: [], errorMessage: '', isTermsAndConditionsAccepted: false });
        };

        _this._updateFileAccessCondition = function (fileToUpdate, index, newValue) {
            var file = _extends({}, fileToUpdate);

            file[_FileUploadRow.FILE_META_KEY_ACCESS_CONDITION] = newValue;

            if (!_this.isOpenAccess(newValue) && file.hasOwnProperty(_FileUploadRow.FILE_META_KEY_EMBARGO_DATE)) {
                delete file[_FileUploadRow.FILE_META_KEY_EMBARGO_DATE];
            }

            if (_this.isOpenAccess(newValue) && !file.hasOwnProperty(_FileUploadRow.FILE_META_KEY_EMBARGO_DATE)) {
                file[_FileUploadRow.FILE_META_KEY_EMBARGO_DATE] = moment().format();
            }

            _this.replaceFile(file, index);
        };

        _this._updateFileEmbargoDate = function (fileToUpdate, index, newValue) {
            var file = _extends({}, fileToUpdate);

            file[_FileUploadRow.FILE_META_KEY_EMBARGO_DATE] = moment(newValue).format();

            _this.replaceFile(file, index);
        };

        _this._acceptTermsAndConditions = function (event, value) {
            _this.setState({ isTermsAndConditionsAccepted: value });
        };

        _this._handleDroppedFiles = function (accepted, errorsFromDropzone) {
            var errors = _extends({}, errorsFromDropzone);
            /*
             * Remove duplicate files from accepted which are already in queue
             */
            var uniqueFilesToQueue = _this.removeDuplicate(accepted);

            /*
             * If max files uploaded, send max files and set error for ignored files
             */
            var fileUploadLimit = _this.props.fileRestrictionsConfig.fileUploadLimit;


            if (uniqueFilesToQueue.size > fileUploadLimit) {
                // Set error for files which won't be uploaded
                errors.maxFiles = [].concat(_toConsumableArray(uniqueFilesToQueue)).slice(fileUploadLimit).map(function (file) {
                    return file.name;
                });

                _this.queueFiles([].concat(_toConsumableArray(uniqueFilesToQueue)).slice(0, fileUploadLimit));
            } else {
                _this.queueFiles([].concat(_toConsumableArray(uniqueFilesToQueue)));
            }

            /*
             * Process any errors
             */
            _this.processErrors(errors);
        };

        _this.replaceFile = function (file, index) {
            var filesInQueue = [].concat(_toConsumableArray(_this.state.filesInQueue.slice(0, index)), [file], _toConsumableArray(_this.state.filesInQueue.slice(index + 1)));

            _this.setState({
                filesInQueue: filesInQueue,
                errorMessage: '',
                isTermsAndConditionsAccepted: _this.state.isTermsAndConditionsAccepted && _this.isAnyOpenAccess(filesInQueue)
            });
        };

        _this.queueFiles = function (files) {
            _this.setState({
                filesInQueue: _this.props.defaultQuickTemplateId ? _this.setDefaultAccessConditionId(files) : [].concat(_toConsumableArray(files)).map(function (file) {
                    return _this.composeCustomFileObjectToUpload(file);
                }),
                focusOnIndex: _this.state.filesInQueue.length,
                errorMessage: ''
            });
        };

        _this.composeCustomFileObjectToUpload = function (file) {
            return { fileData: file, name: file.name, size: file.size };
        };

        _this.setDefaultAccessConditionId = function (files) {
            return [].concat(_toConsumableArray(files)).map(function (file) {
                return _extends({}, _this.composeCustomFileObjectToUpload(file), _defineProperty({}, _FileUploadRow.FILE_META_KEY_ACCESS_CONDITION, _this.props.defaultQuickTemplateId));
            });
        };

        _this.calculateMaxFileSize = function () {
            var _this$props$fileRestr = _this.props.fileRestrictionsConfig,
                maxFileSize = _this$props$fileRestr.maxFileSize,
                fileSizeUnit = _this$props$fileRestr.fileSizeUnit;

            return maxFileSize * Math.pow(sizeBase, sizeExponent[fileSizeUnit] || 0);
        };

        _this.isOpenAccess = function (value) {
            return value === _FileUploadAccessSelector.OPEN_ACCESS_ID;
        };

        _this.isAnyOpenAccess = function (files) {
            return files.filter(function (file) {
                return _this.hasAccess(file) && _this.isOpenAccess(file[_FileUploadRow.FILE_META_KEY_ACCESS_CONDITION]);
            }).length > 0;
        };

        _this.hasAccess = function (file) {
            return file.hasOwnProperty(_FileUploadRow.FILE_META_KEY_ACCESS_CONDITION);
        };

        _this.hasEmbargoDate = function (file) {
            return file.hasOwnProperty(_FileUploadRow.FILE_META_KEY_EMBARGO_DATE) && !!file[_FileUploadRow.FILE_META_KEY_EMBARGO_DATE];
        };

        _this.isFileUploadValid = function (_ref) {
            var filesInQueue = _ref.filesInQueue,
                isTermsAndConditionsAccepted = _ref.isTermsAndConditionsAccepted;

            var isValid = true;

            if (_this.props.requireOpenAccessStatus) {
                if (filesInQueue.filter(function (file) {
                    return !_this.hasAccess(file);
                }).length > 0) {
                    isValid = false;
                }
                if (filesInQueue.filter(function (file) {
                    return _this.isOpenAccess(file[_FileUploadRow.FILE_META_KEY_ACCESS_CONDITION]);
                }).filter(function (file) {
                    return !(_this.hasEmbargoDate(file) && isTermsAndConditionsAccepted);
                }).length > 0) {
                    isValid = false;
                }
            }

            return isValid;
        };

        _this.processErrors = function (errors) {
            var validation = _this.props.locale.validation;

            var errorMessages = [];
            var message = '';

            Object.keys(errors).map(function (errorCode) {
                var fileNames = errors[errorCode];
                if (fileNames.length > 0) {
                    message = validation[errorCode].replace('[numberOfFiles]', fileNames.length).replace('[filenames]', fileNames.join(', '));

                    if (errorCode === 'maxFiles') {
                        errorMessages.push(message.replace('[maxNumberOfFiles]', '' + _this.props.fileRestrictionsConfig.fileUploadLimit));
                    } else {
                        errorMessages.push(message);
                    }
                }
            });

            _this.setState({
                errorMessage: errorMessages.join('; ')
            });
        };

        _this.removeDuplicate = function (accepted) {
            // Get the file names already in queue
            var filesInQueue = new Set(_this.state.filesInQueue.map(function (file) {
                return file.name;
            }));

            // Ignore files from accepted files which are already in files queue
            var filteredDuplicates = new Set([].concat(_toConsumableArray(accepted)).filter(function (file) {
                return !filesInQueue.has(file.name);
            }));

            // Return new set of unique files
            return new Set([].concat(_toConsumableArray(_this.state.filesInQueue), _toConsumableArray(filteredDuplicates)));
        };

        _this.state = {
            filesInQueue: [],
            isTermsAndConditionsAccepted: false,
            errorMessage: '',
            successMessage: ''
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onChange) this.props.onChange({ queue: nextState.filesInQueue, isValid: this.isFileUploadValid(nextState) });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.clearFileUpload();
        }

        /*
         * File uploader's callback functions
         */

        /**
         * Delete file on a given index
         *
         * @param file
         * @param index
         * @private
         */


        /**
         * Delete all files
         *
         * @private
         */


        /**
         * Update file's access condition and/or embargo date based on selected value
         *
         * @param fileToUpdate
         * @param index
         * @param newValue
         * @private
         */


        /**
         * Update file's embargo date
         *
         * @param fileToUpdate
         * @param index
         * @param newValue
         * @private
         */


        /**
         * Accept terms and conditions
         *
         * @param event
         * @param value
         * @private
         */


        /**
         * Handle accepted, rejected and dropped folders and display proper alerts
         *
         * @param accepted
         * @param errorsFromDropzone
         */


        /*
         * File uploader's internal functions
         */

        /**
         * Replace file on a given index
         *
         * @param file
         * @param index
         * @private
         */


        /**
         * Set uploaded files
         *
         * @param files
         * @private
         */


        /**
         * Tran
         * @param file
         */


        /**
         * Set default access condition if defaultQuickTemplateId is provided
         *
         * @param files
         */


        /**
         * Calculate max file size allowed by dropzone
         *
         * @returns {number}
         */


        /**
         * Check if file is open access
         *
         * @param value
         * @returns {boolean}
         */


        /**
         * Check if any file is open access
         *
         * @param files
         * @returns {boolean}
         */


        /**
         * Check if file as access conditions field
         *
         * @param file
         * @returns {boolean}
         */


        /**
         * Check if file has embargo date field
         *
         * @param file
         * @returns {boolean}
         */


        /**
         * Check if entire file uploader is valid including access conditions, embargo date and t&c
         *
         * @param filesInQueue
         * @param isTermsAndConditionsAccepted
         * @returns {boolean}
         */


        /**
         * Process errors
         *
         * @private
         */


        /**
         * Remove duplicate files from filtered files
         * @param accepted
         * @returns {Set}
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                instructions = _props$locale.instructions,
                accessTermsAndConditions = _props$locale.accessTermsAndConditions;
            var _props$fileRestrictio = this.props.fileRestrictionsConfig,
                maxFileSize = _props$fileRestrictio.maxFileSize,
                fileSizeUnit = _props$fileRestrictio.fileSizeUnit,
                fileUploadLimit = _props$fileRestrictio.fileUploadLimit,
                fileNameRestrictions = _props$fileRestrictio.fileNameRestrictions;
            var requireOpenAccessStatus = this.props.requireOpenAccessStatus;
            var _state = this.state,
                filesInQueue = _state.filesInQueue,
                isTermsAndConditionsAccepted = _state.isTermsAndConditionsAccepted,
                errorMessage = _state.errorMessage;
            var _props$locale2 = this.props.locale,
                errorTitle = _props$locale2.errorTitle,
                successTitle = _props$locale2.successTitle,
                successMessage = _props$locale2.successMessage;


            var instructionsDisplay = instructions.replace('[fileUploadLimit]', fileUploadLimit).replace('[maxFileSize]', '' + maxFileSize).replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

            var filesInQueueRow = filesInQueue.map(function (file, index) {
                return _react2.default.createElement(_FileUploadRow2.default, {
                    key: file.name,
                    index: index,
                    uploadedFile: file,
                    fileSizeUnit: fileSizeUnit,
                    onDelete: _this2._deleteFile,
                    onAccessConditionChange: _this2._updateFileAccessCondition,
                    onEmbargoDateChange: _this2._updateFileEmbargoDate,
                    defaultAccessCondition: _this2.props.defaultQuickTemplateId,
                    requireOpenAccessStatus: requireOpenAccessStatus && !_this2.props.defaultQuickTemplateId,
                    disabled: _this2.props.disabled,
                    focusOnIndex: _this2.state.focusOnIndex
                });
            });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h4',
                    { className: 'sub-title' },
                    instructionsDisplay
                ),
                _react2.default.createElement(_FileUploadDropzone2.default, {
                    locale: this.props.locale,
                    maxSize: this.calculateMaxFileSize(),
                    disabled: this.props.disabled,
                    fileNameRestrictions: fileNameRestrictions,
                    onDrop: this._handleDroppedFiles }),
                filesInQueue.length > 0 && _react2.default.createElement(_Alert.Alert, { title: successTitle, message: successMessage.replace('[numberOfFiles]', filesInQueue.length), type: 'done' }),
                errorMessage.length > 0 && _react2.default.createElement(_Alert.Alert, { title: errorTitle, message: errorMessage, type: 'error' }),
                filesInQueue.length > 0 && _react2.default.createElement(
                    'div',
                    { className: 'metadata-container' },
                    _react2.default.createElement(_FileUploadRowHeader2.default, {
                        onDeleteAll: this._deleteAllFiles,
                        requireOpenAccessStatus: requireOpenAccessStatus && !this.props.defaultQuickTemplateId,
                        disabled: this.props.disabled }),
                    filesInQueueRow,
                    requireOpenAccessStatus && this.isAnyOpenAccess(filesInQueue) && _react2.default.createElement(
                        'div',
                        { className: 'open-access-checkbox' + (!isTermsAndConditionsAccepted ? ' error-checkbox' : '') },
                        _react2.default.createElement(_Checkbox2.default, { label: accessTermsAndConditions, onCheck: this._acceptTermsAndConditions, checked: isTermsAndConditionsAccepted, disabled: this.props.disabled })
                    )
                )
            );
        }
    }]);

    return FileUploader;
}(_react.PureComponent);

FileUploader.defaultProps = {
    locale: {
        instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
        accessTermsAndConditions: 'I understand that the files indicated above as open access will be submitted as open access and will be made publicly available immediately or will be made available on the indicated embargo date.  All other files submitted will be accessible by UQ eSpace administrators.',
        validation: (_validation = {}, _defineProperty(_validation, 'folder', 'Invalid files ([filenames])'), _defineProperty(_validation, 'fileName', 'File(s) ([filenames]) have invalid file name'), _defineProperty(_validation, 'maxFileSize', 'File(s) ([filenames]) exceed maximum allowed upload file size'), _defineProperty(_validation, 'maxFiles', 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) ([filenames]) will not be uploaded'), _validation),
        errorTitle: 'Upload Errors',
        successTitle: 'Success',
        successMessage: 'Successfully added [numberOfFiles] file(s) to upload queue.',
        fileUploadRestrictionHeading: _react2.default.createElement(
            'h3',
            null,
            'File upload restrictions'
        ),
        fileUploadRestrictions: _react2.default.createElement(
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
        ),
        fileUploadInstruction: _react2.default.createElement(
            'p',
            null,
            'Click here to select files, or drag files into this area to upload'
        )
    },
    fileRestrictionsConfig: {
        fileUploadLimit: 10,
        maxFileSize: 5,
        fileSizeUnit: 'G',
        fileNameRestrictions: /^(?=^\S*$)(?=^[^\.]+\.[^\.]+$)(?=.{1,45}$)(?!(web_|preview_|thumbnail_|stream_|fezacml_|presmd_))[a-z][a-z\d\-_\.]+/
    },
    requireOpenAccessStatus: false
};


var mapStateToProps = function mapStateToProps() {
    return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        clearFileUpload: function clearFileUpload() {
            return dispatch((0, _actions.clearFileUpload)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileUploader);