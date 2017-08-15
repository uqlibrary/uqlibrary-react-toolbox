'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./Chart');

function setup(chartOptions) {
    var props = {
        chartOptions: chartOptions
    };
    return (0, _enzyme.shallow)(_react2.default.createElement(_Chart2.default, { chartOptions: chartOptions }));
}

describe('Chart snapshot tests', function () {
    it('it should render empty chart component', function () {
        var app = setup({
            options: {
                title: {
                    text: null
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: [],
                    labels: {
                        rotation: -45,
                        y: 18
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Title'
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
                tooltip: {},
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{ "name": "Journal Article", "data": [] }, { "name": "Conference Paper", "data": [] }, { "name": "Book Chapter", "data": [] }, { "name": "Book", "data": [] }, { "name": "Other", "data": [] }]
            }
        });

        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});