'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _ = require('../..');

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

var FileUploadRow = function (_Component) {
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
            if (update.key === 'access_condition_id' && !_this._isOpenAccess(update.value) && _this.props.uploadedFile.hasOwnProperty('date')) {
                delete _this.props.uploadedFile.date;
            }

            _this.setState(_defineProperty({}, update.key, update.value));
            _this.props.uploadedFile[update.key] = update.value;
            if (_this.props.onAttributeChanged) _this.props.onAttributeChanged(_this.props.uploadedFile, _this.props.index);
        };

        _this._isOpenAccess = function (accessConditionId) {
            return accessConditionId === _FileUploadAccessSelector.OPEN_ACCESS_ID;
        };

        _this._calculateFilesizeToDisplay = function (size) {
            var exponent = Math.floor(Math.log(size) / Math.log(_FileUploader.sizeBase));
            return '' + (size / Math.pow(_FileUploader.sizeBase, exponent)).toFixed(1) + Object.keys(_FileUploader.sizeUnitText).map(function (key) {
                return _FileUploader.sizeUnitText[key];
            })[exponent];
        };

        _this.state = {
            access_condition_id: null,
            date: null
        };
        return _this;
    }

    _createClass(FileUploadRow, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var deleteRecordConfirmation = this.props.locale.deleteRecordConfirmation;
            var access_condition_id = this.state.access_condition_id;

            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-multiline uploadedFileRow datalist datalist-row is-clearfix' },
                _react2.default.createElement(_.ConfirmDialogBox, {
                    onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this._deleteFile,
                    locale: deleteRecordConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text file-info is-6-desktop is-6-tablet is-12-mobile' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons mobile-icon' },
                        'attachment'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'file-name' },
                        this.props.uploadedFile.name
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'datalist-text-subtitle secondary-info-mobile' },
                        this._calculateFilesizeToDisplay(this.props.uploadedFile.size)
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'is-mobile label' },
                        'File name'
                    )
                ),
                this.props.requireFileAccess && _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text file-access-selector is-3-desktop is-3-tablet is-12-mobile' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons mobile-icon' },
                        'lock_outline'
                    ),
                    _react2.default.createElement(_FileUploadAccessSelector2.default, { onAccessChanged: this._updateFileMetadata }),
                    _react2.default.createElement(
                        'span',
                        { className: 'is-mobile label' },
                        'File Access'
                    )
                ),
                this.props.requireFileAccess && !this._isOpenAccess(access_condition_id) && _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text no-embargo-date is-2-desktop is-2-tablet is-three-quarters-mobile is-inline-block-mobile' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons mobile-icon' },
                        'date_range'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        'No Date'
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'is-mobile label' },
                        'Embargo Date'
                    )
                ),
                this.props.requireFileAccess && this._isOpenAccess(access_condition_id) && _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text embargo-date-selector is-2-desktop is-2-tablet is-three-quarters-mobile is-inline-block-mobile' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons mobile-icon' },
                        'date_range'
                    ),
                    _react2.default.createElement(_FileUploadEmbargoDate2.default, { onDateChanged: this._updateFileMetadata }),
                    _react2.default.createElement(
                        'span',
                        { className: 'is-mobile label' },
                        'Embargo Date'
                    )
                ),
                this.props.progress === 0 && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow uploadedFileDelete datalist-buttons is-1-desktop is-1-tablet is-marginless' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: this.props.locale.deleteHint, onTouchTap: this._showConfirmation },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons deleteIcon' },
                            'delete'
                        )
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
                this.props.progress === 100 && _react2.default.createElement(
                    _FontIcon2.default,
                    { className: 'material-icons green-tick' },
                    'done'
                )
            );
        }
    }]);

    return FileUploadRow;
}(_react.Component);

FileUploadRow.propTypes = {
    index: _propTypes2.default.number.isRequired,
    uploadedFile: _propTypes2.default.object.isRequired,
    onDelete: _propTypes2.default.func.isRequired,
    onAttributeChanged: _propTypes2.default.func.isRequired,
    locale: _propTypes2.default.object,
    progress: _propTypes2.default.number,
    requireFileAccess: _propTypes2.default.bool.isRequired,
    fileSizeUnit: _propTypes2.default.string
};
FileUploadRow.defaultProps = {
    locale: {
        deleteHint: 'Remove this file',
        deleteRecordConfirmation: {
            confirmationTitle: 'Delete file',
            confirmationMessage: 'Are you sure you want to remove this file from the uploaded queue?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        }
    }
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        progress: state.get('fileUpload')[ownProps.uploadedFile.name] || 0
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileUploadRow);