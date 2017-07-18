'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _AuthorsPublicationsPerYearChart = require('./AuthorsPublicationsPerYearChart');

var _AuthorsPublicationsPerYearChart2 = _interopRequireDefault(_AuthorsPublicationsPerYearChart);

var _publicationYears = require('./data/publicationYears');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AuthorsPublicationsPerYearChart');

function setup(_ref) {
    var rawData = _ref.rawData,
        yAxisTitle = _ref.yAxisTitle;

    var props = {
        rawData: rawData,
        yAxisTitle: yAxisTitle
    };
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthorsPublicationsPerYearChart2.default, props));
}

describe('AuthorsPublicationsPerYearChart snapshot tests', function () {
    it('it should render chart component', function () {
        var app = setup({ rawData: _publicationYears.publicationYearsBig, yAxisTitle: 'title' });
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});