'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

require('./Alerts.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alerts = function (_React$Component) {
    _inherits(Alerts, _React$Component);

    function Alerts() {
        _classCallCheck(this, Alerts);

        return _possibleConstructorReturn(this, (Alerts.__proto__ || Object.getPrototypeOf(Alerts)).apply(this, arguments));
    }

    _createClass(Alerts, [{
        key: 'render',
        value: function render() {
            var alertText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo commodo felis, et interdum ex tincidunt at. Donec arcu diam, pulvinar eget commodo non, congue ac erat. Nunc et molestie mi, at volutpat tortor. Proin molestie, lacus eu ullamcorper vehicula, elit turpis fermentum mi, sit amet ornare felis neque id neque. Morbi non ex porttitor, facilisis orci in, venenatis diam. Integer nec hendrerit orci, sit amet porttitor nibh. Nullam eleifend ut purus et mattis. Proin pellentesque velit et ante rhoncus, at tristique ipsum iaculis. Aliquam ante ligula, lacinia id vehicula sed, tristique quis metus. Proin neque eros, varius ut justo ullamcorper, condimentum molestie odio. In feugiat sit amet magna eget malesuada.';
            var alertState = ''; // hidden
            var alertType = 'info'; // info || warning || error

            return _react2.default.createElement(
                'div',
                { className: alertType + ' ' + alertState + ' alertWrapper columns' },
                _react2.default.createElement(
                    'div',
                    { className: 'column is-narrow alertIcon' },
                    _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons' },
                        alertType
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column alertText' },
                    _react2.default.createElement(
                        'div',
                        null,
                        alertText
                    )
                )
            );
        }
    }]);

    return Alerts;
}(_react2.default.Component);

exports.default = Alerts;