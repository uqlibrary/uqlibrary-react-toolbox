'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploader = exports.sizeBase = exports.sizeUnitText = exports.sizeExponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sizeExponent, _sizeUnitText;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions');

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FileUploadDropzone = require('./FileUploadDropzone');

var _FileUploadDropzone2 = _interopRequireDefault(_FileUploadDropzone);

var _FileUploadRowHeader = require('./FileUploadRowHeader');

var _FileUploadRowHeader2 = _interopRequireDefault(_FileUploadRowHeader);

var _FileUploadRow = require('./FileUploadRow');

var _FileUploadRow2 = _interopRequireDefault(_FileUploadRow);

var _FileUploadAccessSelector = require('./FileUploadAccessSelector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sizeExponent = exports.sizeExponent = (_sizeExponent = {}, _defineProperty(_sizeExponent, 'B', 0), _defineProperty(_sizeExponent, 'K', 1), _defineProperty(_sizeExponent, 'M', 2), _defineProperty(_sizeExponent, 'G', 3), _sizeExponent);

var sizeUnitText = exports.sizeUnitText = (_sizeUnitText = {}, _defineProperty(_sizeUnitText, 'B', 'B'), _defineProperty(_sizeUnitText, 'K', 'KB'), _defineProperty(_sizeUnitText, 'M', 'MB'), _defineProperty(_sizeUnitText, 'G', 'GB'), _sizeUnitText);

var sizeBase = exports.sizeBase = 1000;

var FileUploader = exports.FileUploader = function (_PureComponent) {
    _inherits(FileUploader, _PureComponent);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this._deleteFile = function (file, index) {
            _this.setState({
                uploadedFiles: _this.state.uploadedFiles.filter(function (_, i) {
                    return i !== index;
                }),
                clearErrors: true
            });
        };

        _this._replaceFile = function (file, index) {
            _this.setState({
                uploadedFiles: [].concat(_toConsumableArray(_this.state.uploadedFiles.slice(0, index)), [file], _toConsumableArray(_this.state.uploadedFiles.slice(index + 1))),
                clearErrors: true
            });
        };

        _this._deleteAllFiles = function () {
            _this.setState({ uploadedFiles: [], clearErrors: true });
        };

        _this._setUploadedFiles = function (files) {
            if (!!_this.props.defaultQuickTemplateId && !_this.props.requireFileAccess) {
                files.map(function (file) {
                    return file.access_condition_id = _this.props.defaultQuickTemplateId;
                });
            }
            _this.setState({ uploadedFiles: [].concat(_toConsumableArray(files)), clearErrors: false });
        };

        _this._acceptTermsAndConditions = function (event, value) {
            _this.setState({ termsAndConditions: value });
        };

        _this.calculateMaxFileSize = function () {
            var _this$props$defaultCo = _this.props.defaultConfig,
                maxFileSize = _this$props$defaultCo.maxFileSize,
                fileSizeUnit = _this$props$defaultCo.fileSizeUnit;

            return maxFileSize * Math.pow(sizeBase, sizeExponent[fileSizeUnit] || 0);
        };

        _this.isOpenAccess = function (file) {
            return _this.hasAccess(file) && file.access_condition_id === _FileUploadAccessSelector.OPEN_ACCESS_ID;
        };

        _this.isAnyOpenAccess = function (files) {
            return files.filter(function (file) {
                return _this.isOpenAccess(file);
            }).length > 0;
        };

        _this.hasAccess = function (file) {
            return file.hasOwnProperty('access_condition_id');
        };

        _this.hasEmbargoDate = function (file) {
            return file.hasOwnProperty('date') && (file.date !== null || file.date !== undefined);
        };

        _this.isFileUploadValid = function (_ref) {
            var uploadedFiles = _ref.uploadedFiles,
                termsAndConditions = _ref.termsAndConditions;

            var isValid = true;

            if (_this.props.requireFileAccess) {
                if (uploadedFiles.filter(function (file) {
                    return !_this.hasAccess(file);
                }).length > 0) {
                    isValid = false;
                }

                if (uploadedFiles.filter(function (file) {
                    return _this.isOpenAccess(file);
                }).filter(function (file) {
                    return !(_this.hasEmbargoDate(file) && termsAndConditions);
                }).length > 0) {
                    isValid = false;
                }
            }

            return isValid;
        };

        _this.state = {
            uploadedFiles: [],
            clearErrors: false,
            termsAndConditions: false
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onChange) this.props.onChange({ queue: nextState.uploadedFiles, isValid: this.isFileUploadValid(nextState) });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.clearFileUpload();
        }

        /**
         * Delete file on a given index
         *
         * @param file
         * @param index
         * @private
         */


        /**
         * Replace file on a given index
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
         * Set uploaded files
         *
         * @param files
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
         * Calculate max file size allowed by dropzone
         *
         * @returns {number}
         */


        /**
         * Check if file is open access
         *
         * @param file
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
         * @param uploadedFiles
         * @param termsAndConditions
         * @returns {boolean}
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                instructions = _props$locale.instructions,
                accessTermsAndConditions = _props$locale.accessTermsAndConditions;
            var _props$defaultConfig = this.props.defaultConfig,
                maxFileSize = _props$defaultConfig.maxFileSize,
                fileSizeUnit = _props$defaultConfig.fileSizeUnit,
                fileUploadLimit = _props$defaultConfig.fileUploadLimit;
            var _props = this.props,
                requireFileAccess = _props.requireFileAccess,
                overallProgress = _props.overallProgress;
            var _state = this.state,
                uploadedFiles = _state.uploadedFiles,
                clearErrors = _state.clearErrors,
                termsAndConditions = _state.termsAndConditions;


            var instructionsDisplay = instructions.replace('[fileUploadLimit]', fileUploadLimit).replace('[maxFileSize]', '' + maxFileSize).replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

            var uploadedFilesRow = this.state.uploadedFiles.map(function (file, index) {
                return _react2.default.createElement(_FileUploadRow2.default, {
                    key: file.name,
                    index: index,
                    uploadedFile: file,
                    fileSizeUnit: fileSizeUnit,
                    onDelete: _this2._deleteFile,
                    onAttributeChanged: _this2._replaceFile,
                    requireFileAccess: requireFileAccess,
                    disabled: _this2.props.disabled
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
                    maxFiles: fileUploadLimit,
                    disabled: this.props.disabled || uploadedFiles.length === fileUploadLimit,
                    onDropped: this._setUploadedFiles,
                    uploadedFiles: uploadedFiles,
                    clearErrors: clearErrors }),
                _react2.default.createElement(
                    'div',
                    { className: 'metadata-container',
                        style: uploadedFilesRow.length === 0 ? { display: 'none' } : { display: 'block' }
                    },
                    uploadedFiles.length > 0 && _react2.default.createElement(_FileUploadRowHeader2.default, {
                        onDeleteAll: this._deleteAllFiles,
                        requireFileAccess: requireFileAccess,
                        disabled: this.props.disabled }),
                    uploadedFilesRow,
                    requireFileAccess && this.isAnyOpenAccess(uploadedFiles) && _react2.default.createElement(
                        'div',
                        { style: { position: 'relative', width: '100%' }, className: !termsAndConditions ? 'open-access-checkbox error-checkbox' : 'open-access-checkbox' },
                        _react2.default.createElement(_Checkbox2.default, { label: accessTermsAndConditions, onCheck: this._acceptTermsAndConditions, checked: termsAndConditions })
                    ),
                    overallProgress > 0 && _react2.default.createElement(_LinearProgress2.default, {
                        className: 'upload-overall',
                        mode: 'determinate',
                        value: overallProgress
                    })
                )
            );
        }
    }]);

    return FileUploader;
}(_react.PureComponent);

FileUploader.defaultProps = {
    overallProgress: 0,
    locale: {
        instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
        accessTermsAndConditions: 'I understand that the files indicated above as open access will be submitted as open access and will be made publicly available immediately or will be made available on the indicated embargo date.  All other files submitted will be accessible by UQ eSpace administrators.'
    },
    defaultConfig: {
        fileUploadLimit: 10,
        maxFileSize: 5,
        fileSizeUnit: 'G'
    },
    requireFileAccess: false
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        overallProgress: state && state.get('fileUpload') ? state.get('fileUpload').overall : 0
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        clearFileUpload: function clearFileUpload() {
            return dispatch((0, _actions.clearFileUpload)());
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileUploader);