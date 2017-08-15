'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _uqlibraryReactToolbox = require('uqlibrary-react-toolbox');

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _immutable = require('redux-form/immutable');

var _config = require('config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// custom components


var fileUploadProgress = [];

var FileMetadata = function (_Component) {
    _inherits(FileMetadata, _Component);

    function FileMetadata(props) {
        _classCallCheck(this, FileMetadata);

        var _this = _possibleConstructorReturn(this, (FileMetadata.__proto__ || Object.getPrototypeOf(FileMetadata)).call(this, props));

        _this.buildDatePicker = function (id) {
            var DateTimeFormat = global.Intl.DateTimeFormat;
            var currentDate = new Date();
            var currentDateStr = currentDate.getUTCDate() + '/' + (currentDate.getUTCMonth() + 1) + '/' + currentDate.getUTCFullYear();
            var fileInformation = _config.locale.sharedComponents.files;
            var datepickerFieldName = '' + fileInformation.fields.datepickerAccess + id;

            return _react2.default.createElement(_DatePicker2.default, {
                className: 'datepicker',
                DateTimeFormat: DateTimeFormat,
                firstDayOfWeek: 0,
                hintText: currentDateStr,
                locale: 'en-AU',
                name: datepickerFieldName,
                menuItemStyle: { width: '90px' }
            });
        };

        _this.buildSelectField = function (id) {
            var fileInformation = _config.locale.sharedComponents.files;
            var fieldName = '' + fileInformation.fields.fileAccess + id;
            var accessIds = fileInformation.constants;
            var selectFieldValues = fileInformation.fields.selectField;

            return _react2.default.createElement(
                _immutable.Field,
                {
                    autoWidth: true,
                    component: _uqlibraryReactToolbox.SelectField,
                    className: 'selectField',
                    hintText: selectFieldValues.initialValue,
                    key: fieldName,
                    name: fieldName,
                    onChange: _this.updateLocalState(fieldName),
                    value: _this.state.accessFields[fieldName] || null,
                    validate: [_config.validation.required]
                },
                _react2.default.createElement(_MenuItem2.default, { value: null, primaryText: selectFieldValues.initialValue }),
                _react2.default.createElement(_MenuItem2.default, { value: accessIds.openAccessId, primaryText: selectFieldValues.openAccessValue }),
                _react2.default.createElement(_MenuItem2.default, { value: accessIds.closedAccessId, primaryText: selectFieldValues.closedAccessValue })
            );
        };

        _this.buildInterface = function () {
            var _this$props = _this.props,
                acceptedFiles = _this$props.acceptedFiles,
                uploadError = _this$props.uploadError;

            var fileInformation = _config.locale.sharedComponents.files;
            var messages = fileInformation.messages;

            _this.isOpenAccess = false;

            return acceptedFiles.map(function (file, index) {
                console.log(file);
                var fieldName = '' + file + index;
                var selectFieldName = '' + fileInformation.fields.fileAccess + file.name;
                var accessIds = fileInformation.constants;

                if (index === 0) {
                    _this.firstRowTarget = fileInformation.formSectionPrefix + '.' + selectFieldName;
                }

                _this.isOpenAccess = _this.isOpenAccess || _this.state.accessFields[selectFieldName] === accessIds.openAccessId;

                return _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless data metadata-container', key: fieldName },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-6-desktop is-6-tablet is-12-mobile filename' },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons mobile-icon' },
                            'attachment'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'filename-label' },
                            file.name
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'label' },
                            'File name'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-3-desktop is-3-tablet is-8-mobile file-access' },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons mobile-icon' },
                            'lock_outline'
                        ),
                        _this.buildSelectField(file.name),
                        _react2.default.createElement(
                            'span',
                            { className: 'label' },
                            'File Access'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-2-desktop is-2-tablet is-8-mobile embargo-date' },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons mobile-icon' },
                            'date_range'
                        ),
                        _this.state.accessFields[selectFieldName] === accessIds.openAccessId && _this.buildDatePicker(file.name),
                        _this.state.accessFields[selectFieldName] !== accessIds.openAccessId && _react2.default.createElement(
                            'div',
                            { className: 'datepicker' },
                            messages.noDate
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'label' },
                            'Embargo Date'
                        ),
                        fileUploadProgress[file.name] && (fileUploadProgress[file.name] < _config.locale.sharedComponents.files.constants.completed || fileUploadProgress[file.name] === _config.locale.sharedComponents.files.constants.completed && uploadError.length > 0) && _react2.default.createElement(
                            'div',
                            { className: 'upload-progress-wrapper' },
                            _react2.default.createElement(_CircularProgress2.default, {
                                className: 'upload-progress',
                                mode: 'determinate',
                                value: fileUploadProgress[file.name],
                                size: 30,
                                thickness: 4
                            })
                        ),
                        fileUploadProgress[file.name] && fileUploadProgress[file.name] === _config.locale.sharedComponents.files.constants.completed && uploadError.length === 0 && _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons green-tick' },
                            'done'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-1-desktop is-1-tablet is-1-mobile delete-button' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                tooltip: messages.deleteFileToolTip,
                                tooltipPosition: 'bottom-left',
                                onClick: function onClick() {
                                    return _this.deleteFileConfirmation(index);
                                } },
                            _react2.default.createElement(
                                _FontIcon2.default,
                                { className: 'material-icons deleteIcon' },
                                'delete'
                            )
                        )
                    )
                );
            });
        };

        _this.deleteFileAction = function () {
            if (_this.state.deleteSingleFile) {
                _this.props.deleteFile(_this.state.deleteFileIndex);
            } else {
                _this.props.deleteAllFiles();
            }

            _this.handleClose();
        };

        _this.deleteAllFilesConfirmation = function () {
            var fileInformation = _config.locale.sharedComponents.files;
            var messages = fileInformation.messages;

            _this.setState({
                deleteSingleFile: false,
                deleteFileIndex: -1,
                deleteDialogOpen: true,
                deleteDialogContent: messages.deleteAllFilesDialogContent
            });
        };

        _this.deleteFileConfirmation = function (index) {
            var fileInformation = _config.locale.sharedComponents.files;
            var messages = fileInformation.messages;

            _this.setState({
                deleteSingleFile: true,
                deleteFileIndex: index,
                deleteDialogOpen: true,
                deleteDialogContent: messages.deleteFileDialogContent
            });
        };

        _this.focusOnFirstRow = function () {
            var firstRow = document.getElementsByName(_this.firstRowTarget)[0];
            firstRow.getElementsByTagName('button')[0].focus();
        };

        _this.handleClose = function () {
            _this.setState({
                deleteAction: '',
                deleteFileIndex: -1,
                deleteDialogOpen: false,
                deleteDialogContent: ''
            });
        };

        _this.isOpenAccessSelected = function () {
            var found = false;
            Object.keys(_this.state.accessFields).map(function (field) {
                if (_this.state.accessFields[field] === _config.locale.sharedComponents.files.constants.openAccessId) {
                    found = true;
                }
            });

            return found;
        };

        _this.updateLocalState = function (fieldName) {
            return function (event, value) {
                var data = _this.state.accessFields;
                data[fieldName] = value;

                _this.setState({ isOpenAccess: _this.isOpenAccessSelected() });
            };
        };

        _this.firstRowTarget = '';
        _this.state = {
            isOpenAccess: false,
            accessFields: [],
            completed: 0,
            deleteSingleFile: true,
            deleteFileIndex: -1,
            deleteDialogContent: '',
            deleteDialogOpen: false
        };

        fileUploadProgress = [];

        _this.isOpenAccess = false;
        return _this;
    }

    _createClass(FileMetadata, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.focusOnFirstRow();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            var uploadProgress = nextProps.uploadProgress;


            if (uploadProgress) {
                fileUploadProgress[uploadProgress.get('name')] = parseInt(uploadProgress.get('progress'), 10);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.focusOnFirstRow();
        }
    }, {
        key: 'render',
        value: function render() {
            var fileInformation = _config.locale.sharedComponents.files;
            var buttonLabels = _config.locale.global.labels.buttons;
            var messages = fileInformation.messages;

            var deleteActions = [_react2.default.createElement(_FlatButton2.default, {
                label: buttonLabels.cancel,
                onTouchTap: this.handleClose
            }), _react2.default.createElement(_RaisedButton2.default, {
                label: buttonLabels.delete,
                secondary: true,
                keyboardFocused: true,
                style: { marginLeft: '12px' },
                onTouchTap: this.deleteFileAction
            })];

            return _react2.default.createElement(
                'div',
                { className: 'metadata-container' },
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        actions: deleteActions,
                        modal: false,
                        open: this.state.deleteDialogOpen,
                        onRequestClose: this.handleClose
                    },
                    this.state.deleteDialogContent
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'columns is-gapless headers' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-6-desktop is-6-tablet is-12-mobile filename header', style: { textIndent: '12px' } },
                        fileInformation.list.filenameLabel
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-3-desktop is-3-tablet is-12-mobile file-access header' },
                        fileInformation.list.fileAccessLabel
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-2-desktop is-2-tablet is-12-mobile embargo-date header' },
                        fileInformation.list.embargoDateLabel
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-1-desktop is-1-tablet is-12-mobile delete-button header' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                tooltip: messages.deleteAllFilesToolTip,
                                tooltipPosition: 'bottom-left',
                                onClick: this.deleteAllFilesConfirmation },
                            _react2.default.createElement(
                                _FontIcon2.default,
                                { className: 'material-icons deleteIcon' },
                                'delete_forever'
                            )
                        )
                    )
                ),
                this.buildInterface(),
                this.isOpenAccess && _react2.default.createElement(_immutable.Field, {
                    component: _uqlibraryReactToolbox.Checkbox,
                    name: 'acceptOpenAccess',
                    className: 'open-access-checkbox',
                    label: messages.openAccessConfirmation,
                    validate: [_config.validation.required]
                })
            );
        }
    }]);

    return FileMetadata;
}(_react.Component);

FileMetadata.propTypes = {
    acceptedFiles: _propTypes2.default.object.isRequired,
    deleteAllFiles: _propTypes2.default.func,
    deleteFile: _propTypes2.default.func,
    setCheckboxState: _propTypes2.default.func,
    uploadError: _propTypes2.default.string
};
exports.default = FileMetadata;