'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploadRowHeader = function (_Component) {
    _inherits(FileUploadRowHeader, _Component);

    function FileUploadRowHeader(props) {
        _classCallCheck(this, FileUploadRowHeader);

        var _this = _possibleConstructorReturn(this, (FileUploadRowHeader.__proto__ || Object.getPrototypeOf(FileUploadRowHeader)).call(this, props));

        _this._showConfirmation = function () {
            _this.confirmationBox.showConfirmation();
        };

        return _this;
    }

    _createClass(FileUploadRowHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$locale = this.props.locale,
                filenameColumn = _props$locale.filenameColumn,
                fileAccessColumn = _props$locale.fileAccessColumn,
                embargoDateColumn = _props$locale.embargoDateColumn,
                deleteAllFiles = _props$locale.deleteAllFiles,
                deleteAllFilesConfirmation = _props$locale.deleteAllFilesConfirmation;


            return _react2.default.createElement(
                'div',
                { className: 'columns is-gapless is-mobile uploadedFileHeader datalist datalist-header headers is-hidden-mobile' },
                _react2.default.createElement(_.ConfirmDialogBox, { onRef: function onRef(ref) {
                        return _this2.confirmationBox = ref;
                    },
                    onAction: this.props.onDeleteAll,
                    locale: deleteAllFilesConfirmation }),
                _react2.default.createElement(
                    'div',
                    { className: 'column datalist-title is-6-desktop is-6-tablet is-12-mobile header' },
                    filenameColumn
                ),
                this.props.requireFileAccess && _react2.default.createElement(
                    'div',
                    { className: 'column datalist-title is-3-desktop is-3-tablet is-12-mobile header' },
                    fileAccessColumn
                ),
                this.props.requireFileAccess && _react2.default.createElement(
                    'div',
                    { className: 'column datalist-title is-2-desktop is-2-tablet is-12-mobile header' },
                    embargoDateColumn
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow buttons datalist-buttons is-1-desktop is-1-tablet is-12-mobile header' },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: deleteAllFiles, onTouchTap: this._showConfirmation, disabled: this.props.disabled },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons' },
                            'delete_forever'
                        )
                    )
                )
            );
        }
    }]);

    return FileUploadRowHeader;
}(_react.Component);

FileUploadRowHeader.propTypes = {
    onDeleteAll: _propTypes2.default.func.isRequired,
    locale: _propTypes2.default.object,
    requireFileAccess: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool
};
FileUploadRowHeader.defaultProps = {
    locale: {
        filenameColumn: 'Filename',
        fileAccessColumn: 'Access conditions',
        embargoDateColumn: 'Embargo release date',
        deleteAllFiles: 'Remove all files from the upload queue',
        deleteAllFilesConfirmation: {
            confirmationTitle: 'Delete all',
            confirmationMessage: 'Are you sure you want to delete all files?',
            cancelButtonLabel: 'No',
            confirmButtonLabel: 'Yes'
        }
    }
};
exports.default = FileUploadRowHeader;