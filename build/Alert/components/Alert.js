'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _error = require('material-ui/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _errorOutline = require('material-ui/svg-icons/alert/error-outline');

var _errorOutline2 = _interopRequireDefault(_errorOutline);

var _warning = require('material-ui/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _info = require('material-ui/svg-icons/action/info');

var _info2 = _interopRequireDefault(_info);

var _infoOutline = require('material-ui/svg-icons/action/info-outline');

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _help = require('material-ui/svg-icons/action/help');

var _help2 = _interopRequireDefault(_help);

var _helpOutline = require('material-ui/svg-icons/action/help-outline');

var _helpOutline2 = _interopRequireDefault(_helpOutline);

var _done = require('material-ui/svg-icons/action/done');

var _done2 = _interopRequireDefault(_done);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(_help2.default, { className: 'material-icons' });

var _ref2 = _react2.default.createElement(_helpOutline2.default, { className: 'material-icons' });

var _ref3 = _react2.default.createElement(_error2.default, { className: 'material-icons' });

var _ref4 = _react2.default.createElement(_errorOutline2.default, { className: 'material-icons' });

var _ref5 = _react2.default.createElement(_warning2.default, { className: 'material-icons' });

var _ref6 = _react2.default.createElement(_info2.default, { className: 'material-icons' });

var _ref7 = _react2.default.createElement(_infoOutline2.default, { className: 'material-icons' });

var _ref8 = _react2.default.createElement(_done2.default, { className: 'material-icons' });

var _ref9 = _react2.default.createElement(_CircularProgress2.default, { className: 'alertSpinner', size: 32, thickness: 4 });

var _ref10 = _react2.default.createElement(_close2.default, { className: 'alertDismiss' });

var Alert = function (_PureComponent) {
    _inherits(Alert, _PureComponent);

    function Alert(props) {
        _classCallCheck(this, Alert);

        return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));
    }

    _createClass(Alert, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.message !== this.props.message || nextProps.title !== this.props.title || nextProps.type !== this.props.type || nextProps.action !== this.props.action || nextProps.actionButtonLabel !== this.props.actionButtonLabel || nextProps.allowDismiss !== this.props.allowDismiss || nextProps.dismissAction !== this.props.dismissAction;
        }
    }, {
        key: '_getIcon',
        value: function _getIcon(type, showLoader) {
            var thisIcon = null;
            if (!showLoader) {
                switch (type) {
                    case 'help':
                        thisIcon = _ref;
                        break;
                    case 'help_outline':
                        thisIcon = _ref2;
                        break;
                    case 'error':
                        thisIcon = _ref3;
                        break;
                    case 'error_outline':
                        thisIcon = _ref4;
                        break;
                    case 'warning':
                        thisIcon = _ref5;
                        break;
                    case 'info':
                        thisIcon = _ref6;
                        break;
                    case 'info_outline':
                        thisIcon = _ref7;
                        break;
                    case 'done':
                        thisIcon = _ref8;
                        break;
                    default:
                        break;
                }
            } else {
                thisIcon = _ref9;
            }
            return thisIcon;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.type + ' alertWrapper ' },
                _react2.default.createElement(
                    'div',
                    { className: 'columns is-multiline is-mobile' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow alertIcon' + (this.props.action ? ' linked' : ''), onClick: this.props.action,
                            onKeyDown: this.props.action },
                        this._getIcon(this.props.type, this.props.showLoader)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column alertText' + (this.props.action ? ' linked' : ''), onClick: this.props.action, onKeyDown: this.props.action },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                this.props.title && this.props.title + ' - '
                            ),
                            this.props.message
                        )
                    ),
                    this.props.action && this.props.actionButtonLabel && _react2.default.createElement(
                        'div',
                        {
                            className: 'column is-narrow-tablet is-12-mobile' + (!this.props.allowDismiss && !this.props.dismissAction ? ' noDismiss' : '') },
                        _react2.default.createElement(_FlatButton2.default, {
                            label: this.props.actionButtonLabel,
                            onTouchTap: this.props.action,
                            fullWidth: true,
                            className: 'alertAction' })
                    ),
                    this.props.allowDismiss && this.props.dismissAction && _react2.default.createElement(
                        'div',
                        { className: 'column is-narrow-tablet is-hidden-mobile' },
                        _react2.default.createElement(
                            _IconButton2.default,
                            { onTouchTap: this.props.dismissAction, className: 'alertDismissButton' },
                            _ref10
                        )
                    )
                )
            );
        }
    }]);

    return Alert;
}(_react.PureComponent);

Alert.defaultProps = {
    message: 'Unexpected error',
    type: 'error',
    allowDismiss: false,
    showLoader: false
};
exports.default = Alert;