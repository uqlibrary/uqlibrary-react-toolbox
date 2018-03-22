'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploadRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _ConfirmDialogBox = require('../../ConfirmDialogBox');

var _FileUploadAccessSelector = require('./FileUploadAccessSelector');

var _FileUploadAccessSelector2 = _interopRequireDefault(_FileUploadAccessSelector);

var _FileUploadEmbargoDate = require('./FileUploadEmbargoDate');

var _FileUploadEmbargoDate2 = _interopRequireDefault(_FileUploadEmbargoDate);

var _config = require('../config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons mobile-icon is-hidden-desktop is-hidden-tablet' },
    'attachment'
);

var _ref2 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons mobile-icon is-hidden-desktop is-hidden-tablet' },
    'lock_outline'
);

var _ref3 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons mobile-icon is-hidden-desktop is-hidden-tablet' },
    'date_range'
);

var _ref4 = _react2.default.createElement(
    _FontIcon2.default,
    { className: 'material-icons deleteIcon' },
    'delete'
);

var _ref5 = _react2.default.createElement(
    'div',
    { className: 'upload-progress' },
    _react2.default.createElement(
        _FontIcon2.default,
        { className: 'material-icons green-tick' },
        'done'
    )
);

var FileUploadRow = exports.FileUploadRow = function (_Component) {
    _inherits(FileUploadRow, _Component);

    function FileUploadRow(props) {
        _classCallCheck(this, FileUploadRow);

        var _this = _possibleConstructorReturn(this, (FileUploadRow.__proto__ || Object.getPrototypeOf(FileUploadRow)).call(this, props));

        _this._showConfirmation = function () {
            _this.confirmationBox.showConfirmation();
        };

        _this._deleteFile = function () {
            if (_this.props.onDelete) _this.props.onDelete(_this.props.uploadedFile, _this.props.index);
        };

        _this.calculateFilesizeToDisplay = function (size) {
            var exponent = Math.floor(Math.log(size) / Math.log(config.SIZE_BASE));
            return '' + (size / Math.pow(config.SIZE_BASE, exponent)).toFixed(1) + config.SIZE_UNITS[exponent];
        };

        _this._updateAccessCondition = function (newValue) {
            _this.props.onAccessConditionChange(_this.props.uploadedFile, _this.props.index, newValue);
        };

        _this._updateEmbargoDate = function (newValue) {
            _this.props.onEmbargoDateChange(_this.props.uploadedFile, _this.props.index, newValue);
        };

        return _this;
    }

    _createClass(FileUploadRow, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var indexToFocus = this.props.focusOnIndex;
            if (this.refs.hasOwnProperty('accessConditionSelector' + indexToFocus)) {
                _reactDom2.default.findDOMNode(this.refs['accessConditionSelector' + indexToFocus]).getElementsByTagName('button').item(0).focus();
            } else if (this.refs.hasOwnProperty('fileName' + indexToFocus)) {
                // if access condition is not required, then scroll into filename
                this.refs['fileName' + indexToFocus].scrollIntoView();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                deleteRecordConfirmation = _props$locale.deleteRecordConfirmation,
                filenameColumn = _props$locale.filenameColumn,
                fileAccessColumn = _props$locale.fileAccessColumn,
                embargoDateColumn = _props$locale.embargoDateColumn,
                embargoDateClosedAccess = _props$locale.embargoDateClosedAccess,
                uploadInProgressText = _props$locale.uploadInProgressText,
                deleteHint = _props$locale.deleteHint;
            var _props = this.props,
                progress = _props.progress,
                uploadedFile = _props.uploadedFile,
                index = _props.index,
                requireOpenAccessStatus = _props.requireOpenAccessStatus,
                disabled = _props.disabled,
                isUploadInProgress = _props.isUploadInProgress;


            var accessConditionId = uploadedFile[config.FILE_META_KEY_ACCESS_CONDITION];
            var embargoDate = uploadedFile[config.FILE_META_KEY_EMBARGO_DATE];

            var progressProps = progress > 0 ? { mode: 'determinate', value: progress } : {};

            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-multiline uploadedFileRow datalist datalist-row is-clearfix' },
                _react2.default.createElement(_ConfirmDialogBox.ConfirmDialogBox, {
                    onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this._deleteFile,
                    locale: deleteRecordConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text file-info is-6-desktop is-5-tablet is-12-mobile' },
                    _ref,
                    _react2.default.createElement(
                        'div',
                        { className: 'file-name', ref: 'fileName' + index },
                        _react2.default.createElement(
                            'span',
                            { className: 'truncated' },
                            uploadedFile.name,
                            ' (',
                            this.calculateFilesizeToDisplay(uploadedFile.size),
                            ')'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle' },
                            filenameColumn
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text is-3-desktop is-4-tablet is-12-mobile' },
                    requireOpenAccessStatus && _react2.default.createElement(
                        'div',
                        { className: 'file-access-selector' },
                        _ref2,
                        _react2.default.createElement(
                            'div',
                            { className: 'select-container' },
                            _react2.default.createElement(_FileUploadAccessSelector2.default, { value: accessConditionId, onChange: this._updateAccessCondition, disabled: disabled, ref: 'accessConditionSelector' + index }),
                            _react2.default.createElement(
                                'span',
                                { className: 'is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle' },
                                fileAccessColumn
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text is-2-desktop is-2-tablet is-three-quarters-mobile is-inline-block-mobile' },
                    _react2.default.createElement(
                        'div',
                        { className: 'embargo-date-info' },
                        requireOpenAccessStatus && _ref3,
                        requireOpenAccessStatus && accessConditionId !== config.OPEN_ACCESS_ID && _react2.default.createElement(
                            'div',
                            { className: 'no-embargo-date' },
                            _react2.default.createElement(
                                'span',
                                null,
                                embargoDateClosedAccess
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle' },
                                embargoDateColumn
                            )
                        ),
                        requireOpenAccessStatus && accessConditionId === config.OPEN_ACCESS_ID && _react2.default.createElement(
                            'div',
                            { className: 'embargo-date-selector' },
                            _react2.default.createElement(_FileUploadEmbargoDate2.default, { value: new Date(embargoDate), onChange: this._updateEmbargoDate, disabled: disabled }),
                            _react2.default.createElement(
                                'span',
                                { className: 'is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle' },
                                embargoDateColumn
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-1-desktop is-1-tablet is-one-quarter-mobile is-inline-block-mobile is-centered is-vcentered' },
                    !isUploadInProgress && _react2.default.createElement(
                        'div',
                        { className: 'datalist-buttons' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            { tooltip: deleteHint, onTouchTap: this._showConfirmation, disabled: disabled },
                            _ref4
                        )
                    ),
                    isUploadInProgress && progress !== 100 && _react2.default.createElement(
                        'div',
                        { className: 'upload-progress-info' },
                        _react2.default.createElement(
                            'div',
                            { className: 'upload-progress' },
                            _react2.default.createElement(_CircularProgress2.default, _extends({}, progressProps, {
                                size: 20,
                                thickness: 4
                            }))
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'upload-progress-number' },
                            _react2.default.createElement(
                                'span',
                                { 'aria-label': progress > 0 ? progress + '%' : uploadInProgressText },
                                progress > 0 ? progress + '%' : uploadInProgressText
                            )
                        )
                    ),
                    isUploadInProgress && progress === 100 && _ref5
                )
            );
        }
    }]);

    return FileUploadRow;
}(_react.Component);

FileUploadRow.defaultProps = {
    locale: {
        deleteHint: 'Remove this file',
        deleteRecordConfirmation: {
            confirmationTitle: 'Delete file',
            confirmationMessage: 'Are you sure you want to remove this file from the uploaded queue?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        },
        filenameColumn: 'File name',
        fileAccessColumn: 'File access',
        embargoDateColumn: 'Embargo date',
        embargoDateClosedAccess: 'No date required',
        uploadInProgressText: 'Uploading...'
    }
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        progress: state.get('fileUpload')[ownProps.uploadedFile.name] || 0,
        isUploadInProgress: state.get('fileUpload').isUploadInProgress
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileUploadRow);