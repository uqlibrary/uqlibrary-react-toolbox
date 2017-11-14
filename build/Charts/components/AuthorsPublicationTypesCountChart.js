'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthorsPublicationTypesCountChart = function (_React$Component) {
    _inherits(AuthorsPublicationTypesCountChart, _React$Component);

    function AuthorsPublicationTypesCountChart(props) {
        _classCallCheck(this, AuthorsPublicationTypesCountChart);

        var _this = _possibleConstructorReturn(this, (AuthorsPublicationTypesCountChart.__proto__ || Object.getPrototypeOf(AuthorsPublicationTypesCountChart)).call(this, props));

        _this.state = {
            options: {
                chart: {
                    height: 320,
                    plotShadow: false,
                    plotBorderWidth: 0,
                    spacingBottom: 10,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                legend: {
                    align: 'center',
                    symbolRadius: 0,
                    floating: true,
                    layout: 'vertical',
                    y: -110
                },
                tooltip: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        showInLegend: true,
                        startAngle: 90,
                        dataLabels: {
                            allowOverlap: false,
                            distance: 12,
                            className: 'pieLabels ',
                            format: '{y}',
                            useHTML: true,
                            enabled: true
                        },
                        shadow: false,
                        center: ['50%', '50%'],
                        size: '95%',
                        innerSize: '65%',
                        borderColor: 'none'
                    }
                },
                series: _this.props.series
            }
        };
        return _this;
    }

    _createClass(AuthorsPublicationTypesCountChart, [{
        key: 'render',
        value: function render() {
            console.log('DATA : ' + JSON.stringify(this.props.series));
            return _react2.default.createElement(_Chart2.default, { className: this.props.className + ' authors-publication-types-count-chart', chartOptions: this.state.options });
        }
    }]);

    return AuthorsPublicationTypesCountChart;
}(_react2.default.Component);

AuthorsPublicationTypesCountChart.defaultProps = {
    series: [{
        name: 'Publications count by type',
        data: [['Journal articles', 200], ['Conference papers', 150], ['Book chapters', 106], ['Books', 30], ['Other', 5]]
    }]
};
exports.default = AuthorsPublicationTypesCountChart;