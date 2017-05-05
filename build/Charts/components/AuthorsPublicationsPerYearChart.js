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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: chart doesn't look good on mobile view if there's a lot of years/publications - update styles for mobile view - display last 5 years on mobile view?
// TODO: possible feature: cache processed data in browser (per user)

var AuthorsPublicationsPerYearChart = function (_React$Component) {
    _inherits(AuthorsPublicationsPerYearChart, _React$Component);

    // TODO: should be immutableJs data
    function AuthorsPublicationsPerYearChart(props) {
        _classCallCheck(this, AuthorsPublicationsPerYearChart);

        // TODO: cache/retrieve data if available...

        var _this = _possibleConstructorReturn(this, (AuthorsPublicationsPerYearChart.__proto__ || Object.getPrototypeOf(AuthorsPublicationsPerYearChart)).call(this, props));

        _initialiseProps.call(_this);

        var data = _this.props.rawData !== null && _this.props.rawData.hasOwnProperty('facet_counts') && _this.props.rawData.facet_counts.hasOwnProperty('facet_pivot') ? _this.props.rawData.facet_counts.facet_pivot['date_year_t,display_type_i_lookup_exact'] : [];

        var categories = _this.getCategories([].concat(_toConsumableArray(data)));
        var series = _this.getSeries([].concat(_toConsumableArray(data)));

        _this.state = {
            options: {
                title: {
                    text: null
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: categories,
                    labels: {
                        rotation: -45,
                        y: 18
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: _this.props.yAxisTitle
                    },
                    stackLabels: {
                        enabled: true
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -30,
                    y: -10,
                    floating: true,
                    shadow: false
                },
                tooltip: {
                    // TODO: fix formatter display of tooltip - this.x is no longer in the correct scope
                    // formatter: () => {
                    //     return '<b>' + this.x + '</b><br/>' +
                    //         this.series.name + ': ' + this.y + '<br/>' +
                    //         'Total: ' + this.point.stackTotal;
                    // }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: series
            }
        };
        return _this;
    }

    /**
     * getCategories - transforms raw academic publication years data into categories, eg years
     * eg [1977, 1980, 1982]
     * @returns {Array}
     */


    /**
     * getSeries - transforms raw academic publication years data into series formatted data, eg publication type and publications count per year
     * eg [{ 'name': 'Journal Article', 'data': [1, 1, 3]}]
     * @returns {Array}
     */


    _createClass(AuthorsPublicationsPerYearChart, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Chart2.default, { className: 'authors-publications-per-year-chart', chartOptions: this.state.options });
        }
    }]);

    return AuthorsPublicationsPerYearChart;
}(_react2.default.Component);

AuthorsPublicationsPerYearChart.propTypes = {
    rawData: _propTypes.PropTypes.object.isRequired,
    yAxisTitle: _propTypes.PropTypes.string
};
AuthorsPublicationsPerYearChart.defaultProps = {
    yAxisTitle: 'Total publications'
};

var _initialiseProps = function _initialiseProps() {
    this.getCategories = function (rawData) {
        // extract years and parse year value into int
        var categories = rawData.map(function (yearData) {
            return parseInt(yearData.value, 10);
        });

        // sort years in ascending order
        categories.sort(function (yearFirst, yearNext) {
            return yearFirst - yearNext;
        });
        return categories;
    };

    this.getSeries = function (rawData) {
        // initialise data structure
        var initialValues = new Array(rawData.length).fill(0);
        var fields = {
            'Journal Article': [].concat(_toConsumableArray(initialValues)),
            'Conference Paper': [].concat(_toConsumableArray(initialValues)),
            'Book Chapter': [].concat(_toConsumableArray(initialValues)),
            'Book': [].concat(_toConsumableArray(initialValues)),
            'Other': [].concat(_toConsumableArray(initialValues))
        };

        // sort all data by year
        rawData.sort(function (yearFirst, yearNext) {
            return parseInt(yearFirst.value, 10) - parseInt(yearNext.value, 10);
        });

        // for each year/publication type - extract publication type count
        rawData.map(function (yearData, yearIndex) {
            yearData.pivot.map(function (publicationType) {
                if (fields[publicationType.value]) {
                    fields[publicationType.value][yearIndex] = publicationType.count;
                } else {
                    fields.Other[yearIndex] += publicationType.count;
                }
            });
        });

        var series = [];

        // construct final data structure
        Object.keys(fields).map(function (publicationType) {
            series.push({
                name: publicationType,
                data: fields[publicationType]
            });
        });

        return series;
    };
};

exports.default = AuthorsPublicationsPerYearChart;