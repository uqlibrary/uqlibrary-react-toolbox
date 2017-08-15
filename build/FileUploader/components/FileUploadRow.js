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

var _uqlibraryReactToolbox = require('uqlibrary-react-toolbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        return _this;
    }

    _createClass(FileUploadRow, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var deleteRecordConfirmation = this.props.locale.deleteRecordConfirmation;

            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-mobile uploadedFileRow datalist datalist-row' },
                _react2.default.createElement(_uqlibraryReactToolbox.ConfirmDialogBox, {
                    onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this._deleteFile,
                    locale: deleteRecordConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-text filename' },
                    _react2.default.createElement(
                        'span',
                        { className: 'filename-label' },
                        this.props.uploadedFile.name
                    )
                ),
                this.props.progress === 0 && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow uploadedFileDelete datalist-buttons' },
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
                this.props.progress > 0 && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow uploadedFileProgress datalist-buttons' },
                    _react2.default.createElement(_CircularProgress2.default, {
                        className: 'upload-progress',
                        mode: 'determinate',
                        value: this.props.progress,
                        size: 20,
                        thickness: 4
                    })
                )
            );
        }
    }]);

    return FileUploadRow;
}(_react.Component);

FileUploadRow.propTypes = {
    index: _propTypes2.default.number.isRequired,
    uploadedFile: _propTypes2.default.object.isRequired,
    onDelete: _propTypes2.default.func,
    locale: _propTypes2.default.object,
    progress: _propTypes2.default.number
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