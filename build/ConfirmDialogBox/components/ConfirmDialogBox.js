'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement('div', { className: 'column is-hidden-mobile' });

var _ref2 = _react2.default.createElement('div', { className: 'is-clearfix' });

var ConfirmDialogBox = function (_Component) {
    _inherits(ConfirmDialogBox, _Component);

    function ConfirmDialogBox(props) {
        _classCallCheck(this, ConfirmDialogBox);

        var _this = _possibleConstructorReturn(this, (ConfirmDialogBox.__proto__ || Object.getPrototypeOf(ConfirmDialogBox)).call(this, props));

        _this._onCancelAction = _this._onCancelAction.bind(_this);
        _this._hideConfirmation = _this._hideConfirmation.bind(_this);
        _this._onAction = _this._onAction.bind(_this);

        _this.state = {
            isDialogOpen: false
        };
        return _this;
    }

    _createClass(ConfirmDialogBox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onRef(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.onRef(undefined);
        }
    }, {
        key: 'showConfirmation',
        value: function showConfirmation() {
            this.setState({
                isDialogOpen: true
            });
        }
    }, {
        key: '_hideConfirmation',
        value: function _hideConfirmation() {
            this.setState({
                isDialogOpen: false
            });
        }
    }, {
        key: '_onAction',
        value: function _onAction() {
            this._hideConfirmation();
            this.props.onAction();
        }
    }, {
        key: '_onCancelAction',
        value: function _onCancelAction() {
            this._hideConfirmation();
            if (this.props.onCancelAction) {
                this.props.onCancelAction();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var actions = [_react2.default.createElement(
                'div',
                { className: 'columns dialog-actions ConfirmDialogBox-actions' },
                _ref,
                !this.props.hideCancelButton && _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow' },
                    _react2.default.createElement(_RaisedButton2.default, {
                        label: this.props.locale.cancelButtonLabel,
                        fullWidth: true,
                        className: 'ConfirmDialogBox-actions-cancel',
                        onTouchTap: this._onCancelAction })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow' },
                    _react2.default.createElement(_RaisedButton2.default, {
                        label: this.props.locale.confirmButtonLabel,
                        fullWidth: true,
                        className: 'ConfirmDialogBox-actions-confirm',
                        secondary: true,
                        keyboardFocused: true,
                        onTouchTap: this._onAction })
                ),
                _ref2
            )];

            return _react2.default.createElement(
                _Dialog2.default,
                {
                    title: this.props.locale.confirmationTitle,
                    actions: actions,
                    modal: true,
                    open: this.state.isDialogOpen },
                this.props.locale.confirmationMessage
            );
        }
    }]);

    return ConfirmDialogBox;
}(_react.Component);

ConfirmDialogBox.defaultProps = {
    hideCancelButton: false,
    locale: {
        confirmationTitle: 'Confirmation',
        confirmationMessage: 'Are you sure?',
        cancelButtonLabel: 'No',
        confirmButtonLabel: 'Yes'
    }
};
exports.default = ConfirmDialogBox;