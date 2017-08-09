'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _DonutChart = require('./DonutChart');

var _DonutChart2 = _interopRequireDefault(_DonutChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthorsPublicationsCount = function (_React$Component) {
    _inherits(AuthorsPublicationsCount, _React$Component);

    function AuthorsPublicationsCount(props) {
        _classCallCheck(this, AuthorsPublicationsCount);

        var _this = _possibleConstructorReturn(this, (AuthorsPublicationsCount.__proto__ || Object.getPrototypeOf(AuthorsPublicationsCount)).call(this, props));

        var series = _this.rawData;

        _this.state = {
            options: {
                chart: {
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
                    y: 0
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
                        dataLabels: {
                            connectorWidth: 2,
                            distance: 10,
                            overflow: 'none',
                            className: 'pieLabels ',
                            format: '{y}',
                            useHTML: true,
                            enabled: true
                        },
                        shadow: false,
                        center: ['50%', '40%'],
                        size: '75%',
                        innerSize: '70%',
                        borderColor: 'none'
                    }
                },
                series: series
                //     [{
                //     name: 'Document count by type',
                //     data: [
                //         ['Journal articles', 329],
                //         ['Conference papers', 112],
                //         ['Magazine articles', 106],
                //         ['Other', 12]
                //     ],
                // }]
            }
        };
        return _this;
    }

    // TODO: should be immutableJs data


    _createClass(AuthorsPublicationsCount, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_DonutChart2.default, { className: 'authors-publications-count', chartOptions: this.state.options });
        }
    }]);

    return AuthorsPublicationsCount;
}(_react2.default.Component);

AuthorsPublicationsCount.propTypes = {
    rawData: _propTypes.PropTypes.object.isRequired
};
exports.default = AuthorsPublicationsCount;