'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploadRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _FileUploader = require('./FileUploader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require('moment');

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
    _FontIcon2.default,
    { className: 'material-icons green-tick' },
    'done'
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

        _this._updateFileMetadata = function (update) {
            if (update.key === 'access_condition_id' && !_this.isOpenAccess(update.value) && _this.props.uploadedFile.hasOwnProperty('date')) {
                delete _this.props.uploadedFile.date;
            }

            if (update.key === 'access_condition_id' && _this.isOpenAccess(update.value) && !_this.props.uploadedFile.hasOwnProperty('date')) {
                _this.props.uploadedFile.date = moment().format();
            }

            _this.setState(_defineProperty({}, update.key, update.value));
            _this.props.uploadedFile[update.key] = update.value;
            if (_this.props.onAttributeChanged) _this.props.onAttributeChanged(_this.props.uploadedFile, _this.props.index);
        };

        _this.isOpenAccess = function (accessConditionId) {
            return accessConditionId === _FileUploadAccessSelector.OPEN_ACCESS_ID;
        };

        _this.calculateFilesizeToDisplay = function (size) {
            var exponent = Math.floor(Math.log(size) / Math.log(_FileUploader.sizeBase));
            return '' + (size / Math.pow(_FileUploader.sizeBase, exponent)).toFixed(1) + Object.keys(_FileUploader.sizeUnitText).map(function (key) {
                return _FileUploader.sizeUnitText[key];
            })[exponent];
        };

        _this.state = {
            access_condition_id: props.defaultAccessConditionId || null,
            date: null
        };
        return _this;
    }

    _createClass(FileUploadRow, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                deleteRecordConfirmation = _props$locale.deleteRecordConfirmation,
                filenameColumn = _props$locale.filenameColumn,
                fileAccessColumn = _props$locale.fileAccessColumn,
                embargoDateColumn = _props$locale.embargoDateColumn,
                embargoDateClosedAccess = _props$locale.embargoDateClosedAccess;
            var access_condition_id = this.state.access_condition_id;

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
                        { className: 'file-name' },
                        _react2.default.createElement(
                            'span',
                            { className: 'truncated' },
                            this.props.uploadedFile.name,
                            ' (',
                            this.calculateFilesizeToDisplay(this.props.uploadedFile.size),
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
                    this.props.requireFileAccess && _react2.default.createElement(
                        'div',
                        { className: 'file-access-selector' },
                        _ref2,
                        _react2.default.createElement(
                            'div',
                            { className: 'select-container' },
                            _react2.default.createElement(_FileUploadAccessSelector2.default, { onAccessChanged: this._updateFileMetadata, disabled: this.props.disabled }),
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
                        _ref3,
                        this.props.requireFileAccess && !this.isOpenAccess(access_condition_id) && _react2.default.createElement(
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
                        this.props.requireFileAccess && this.isOpenAccess(access_condition_id) && _react2.default.createElement(
                            'div',
                            { className: 'embargo-date-selector' },
                            _react2.default.createElement(_FileUploadEmbargoDate2.default, { onDateChanged: this._updateFileMetadata, disabled: this.props.disabled }),
                            _react2.default.createElement(
                                'span',
                                { className: 'is-mobile label is-hidden-desktop is-hidden-tablet datalist-text-subtitle' },
                                embargoDateColumn
                            )
                        )
                    )
                ),
                this.props.progress === 0 && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow uploadedFileDelete datalist-buttons is-1-desktop is-1-tablet is-marginless' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: this.props.locale.deleteHint, onTouchTap: this._showConfirmation, disabled: this.props.disabled },
                        _ref4
                    )
                ),
                this.props.progress > 0 && this.props.progress !== 100 && _react2.default.createElement(
                    'div',
                    { className: 'upload-progress-wrapper' },
                    _react2.default.createElement(_CircularProgress2.default, {
                        className: 'upload-progress',
                        mode: 'determinate',
                        value: this.props.progress,
                        size: 20,
                        thickness: 4
                    })
                ),
                this.props.progress === 100 && _ref5
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
        embargoDateClosedAccess: 'No date required'
    }
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        progress: state.get('fileUpload')[ownProps.uploadedFile.name] || 0
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileUploadRow);