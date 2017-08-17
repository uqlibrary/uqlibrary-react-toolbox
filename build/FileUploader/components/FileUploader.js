'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploader = undefined;

var _sizeExponent, _sizeUnitText;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _FileUploadDropzone = require('./FileUploadDropzone');

var _FileUploadDropzone2 = _interopRequireDefault(_FileUploadDropzone);

var _FileUploadRowHeader = require('./FileUploadRowHeader');

var _FileUploadRowHeader2 = _interopRequireDefault(_FileUploadRowHeader);

var _FileUploadRow = require('./FileUploadRow');

var _FileUploadRow2 = _interopRequireDefault(_FileUploadRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploader = exports.FileUploader = function (_PureComponent) {
    _inherits(FileUploader, _PureComponent);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this.deleteFile = function (file, index) {
            _this.setState({
                uploadedFiles: _this.state.uploadedFiles.filter(function (_, i) {
                    return i !== index;
                }),
                clearErrors: true
            });
        };

        _this.replaceFile = function (file, index) {
            _this.setState({
                uploadedFiles: [].concat(_toConsumableArray(_this.state.uploadedFiles.slice(0, index)), [file], _toConsumableArray(_this.state.uploadedFiles.slice(index + 1))),
                clearErrors: true
            });
        };

        _this.deleteAllFiles = function () {
            _this.setState({ uploadedFiles: [], clearErrors: true });
        };

        _this.setUploadedFiles = function (files) {
            _this.setState({ uploadedFiles: [].concat(_toConsumableArray(files)), clearErrors: false });
        };

        _this._calculateMaxFileSize = function () {
            var sizeExponent = _this.props.locale.sizeExponent;
            var _this$props$defaultCo = _this.props.defaultConfig,
                maxFileSize = _this$props$defaultCo.maxFileSize,
                fileSizeUnit = _this$props$defaultCo.fileSizeUnit;

            return maxFileSize * Math.pow(1000, sizeExponent[fileSizeUnit] || 0);
        };

        _this.state = {
            uploadedFiles: [],
            clearErrors: false
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onChange) this.props.onChange(nextState.uploadedFiles);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                instructions = _props$locale.instructions,
                sizeUnitText = _props$locale.sizeUnitText;
            var _props$defaultConfig = this.props.defaultConfig,
                maxFileSize = _props$defaultConfig.maxFileSize,
                fileSizeUnit = _props$defaultConfig.fileSizeUnit,
                fileUploadLimit = _props$defaultConfig.fileUploadLimit;
            var requireFileAccess = this.props.requireFileAccess;


            var instructionsDisplay = instructions.replace('[fileUploadLimit]', fileUploadLimit).replace('[maxFileSize]', '' + maxFileSize).replace('[fileSizeUnit]', sizeUnitText[fileSizeUnit] || 'B');

            var uploadedFilesRow = this.state.uploadedFiles.map(function (file, index) {
                return _react2.default.createElement(_FileUploadRow2.default, {
                    key: index,
                    index: index,
                    uploadedFile: file,
                    onDelete: _this2.deleteFile,
                    onAttributeChanged: _this2.replaceFile,
                    requireFileAccess: requireFileAccess });
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
                    maxSize: this._calculateMaxFileSize(),
                    maxFiles: fileUploadLimit,
                    onDropped: this.setUploadedFiles,
                    uploadedFiles: this.state.uploadedFiles,
                    clearErrors: this.state.clearErrors }),
                this.state.uploadedFiles.length > 0 && _react2.default.createElement(_FileUploadRowHeader2.default, { onDeleteAll: this.deleteAllFiles, requireFileAccess: requireFileAccess }),
                uploadedFilesRow,
                this.props.overallProgress > 0 && _react2.default.createElement(_LinearProgress2.default, {
                    className: 'upload-overall',
                    mode: 'determinate',
                    value: this.props.overallProgress
                })
            );
        }
    }]);

    return FileUploader;
}(_react.PureComponent);

FileUploader.propTypes = {
    onChange: _propTypes2.default.func,
    locale: _propTypes2.default.object,
    defaultConfig: _propTypes2.default.object,
    overallProgress: _propTypes2.default.number,
    requireFileAccess: _propTypes2.default.bool
};
FileUploader.defaultProps = {
    overallProgress: 0,
    locale: {
        instructions: 'You may add up to [fileUploadLimit] files (max [maxFileSize][fileSizeUnit] each)',
        sizeExponent: (_sizeExponent = {}, _defineProperty(_sizeExponent, 'B', 0), _defineProperty(_sizeExponent, 'K', 1), _defineProperty(_sizeExponent, 'M', 2), _defineProperty(_sizeExponent, 'G', 3), _sizeExponent),
        sizeUnitText: (_sizeUnitText = {}, _defineProperty(_sizeUnitText, 'B', 'B'), _defineProperty(_sizeUnitText, 'K', 'KB'), _defineProperty(_sizeUnitText, 'M', 'MB'), _defineProperty(_sizeUnitText, 'G', 'GB'), _sizeUnitText)
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
        overallProgress: state.get('fileUpload').overall || 0
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileUploader);