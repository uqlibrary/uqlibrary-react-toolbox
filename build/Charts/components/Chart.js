'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactDom = require('react-dom');

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

require('highcharts-exporting');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_React$Component) {
    _inherits(Chart, _React$Component);

    function Chart(props) {
        _classCallCheck(this, Chart);

        var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

        _this.chart = null;
        return _this;
    }

    _createClass(Chart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.refs && this.refs.chart) {
                this.chart = new _highcharts2.default.Chart((0, _reactDom.findDOMNode)(this.refs.chart), this.props.chartOptions);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.chart) {
                this.chart.update(this.props.chartOptions);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.chart) {
                this.chart.destroy();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function () {
                    _this2.chart.reflow();
                });
            }
            return _react2.default.createElement('div', { className: this.props.className, ref: 'chart' });
        }
    }]);

    return Chart;
}(_react2.default.Component);

exports.default = Chart;