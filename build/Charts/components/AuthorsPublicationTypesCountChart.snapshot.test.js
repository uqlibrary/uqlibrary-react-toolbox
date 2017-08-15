'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _AuthorsPublicationTypesCountChart = require('./AuthorsPublicationTypesCountChart');

var _AuthorsPublicationTypesCountChart2 = _interopRequireDefault(_AuthorsPublicationTypesCountChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AuthorsPublicationTypesCountChart');

function setup(_ref) {
    var series = _ref.series,
        categories = _ref.categories,
        yAxisTitle = _ref.yAxisTitle;

    var props = {
        series: series
    };
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthorsPublicationTypesCountChart2.default, props));
}

describe('AuthorsPublicationTypesCountChart snapshot tests', function () {
    it('it should render chart component', function () {
        var app = setup({ series: {} });
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});