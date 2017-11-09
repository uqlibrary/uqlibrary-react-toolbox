'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavigationPrompt = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * https://gist.github.com/bummzack/a586533607ece482475e0c211790dd50
 */
var NavigationPrompt = exports.NavigationPrompt = function (_React$Component) {
    _inherits(NavigationPrompt, _React$Component);

    function NavigationPrompt(props) {
        _classCallCheck(this, NavigationPrompt);

        var _this = _possibleConstructorReturn(this, (NavigationPrompt.__proto__ || Object.getPrototypeOf(NavigationPrompt)).call(this, props));

        _this.setNavigationConfirmation = function (ref) {
            _this.confirmationBox = ref;
        };

        _this._onCancel = function () {
            _this.setState({ nextLocation: null });
        };

        _this._onConfirm = function () {
            _this.navigateToNextLocation();
        };

        _this.navigateToNextLocation = function () {
            _this.unblock();
            _this.props.history.push(_this.state.nextLocation.pathname);
        };

        _this.state = { nextLocation: null };
        _this.confirmationBox = null;
        return _this;
    }

    _createClass(NavigationPrompt, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.unblock = this.props.history.block(function (nextLocation) {
                if (_this2.props.when) {
                    _this2.setState({
                        nextLocation: nextLocation
                    });
                    _this2.confirmationBox.showConfirmation();
                    return !_this2.props.when;
                }

                return _this2.props.when;
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unblock();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.children(this.setNavigationConfirmation, this._onConfirm, this._onCancel)
            );
        }
    }]);

    return NavigationPrompt;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(NavigationPrompt);