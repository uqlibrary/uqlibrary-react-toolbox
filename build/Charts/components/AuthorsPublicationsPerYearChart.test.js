'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _AuthorsPublicationsPerYearChart = require('./AuthorsPublicationsPerYearChart');

var _AuthorsPublicationsPerYearChart2 = _interopRequireDefault(_AuthorsPublicationsPerYearChart);

var _publicationYears = require('./data/publicationYears');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AuthorsPublicationsPerYearChart');

function setup(_ref) {
    var rawData = _ref.rawData,
        yAxisTitle = _ref.yAxisTitle;

    var props = {};
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthorsPublicationsPerYearChart2.default, props));
}

describe('AuthorsPublicationsPerYearChart unit tests', function () {
    it('it should return empty data', function () {
        var chart = new _AuthorsPublicationsPerYearChart2.default({ rawData: _publicationYears.publicationYearsZero, yAxisTitle: 'title' });
        var categories = chart.getCategories([]);
        var series = chart.getSeries([]);

        expect(categories.length).toEqual(0);
        expect(series.length).toEqual(5);
        expect(JSON.stringify(series)).toEqual('[{"name":"Journal Article","data":[]},{"name":"Conference Paper","data":[]},{"name":"Book Chapter","data":[]},{"name":"Book","data":[]},{"name":"Other","data":[]}]');
    });

    it('it should return data for only one publication', function () {
        var chart = new _AuthorsPublicationsPerYearChart2.default({ rawData: {}, yAxisTitle: 'title' });
        var data = _publicationYears.publicationYearsTiny.facet_counts.facet_pivot['date_year_t,display_type_i_lookup_exact'];

        var categories = chart.getCategories(data);
        expect(categories.length).toEqual(1);
        expect(categories[0]).toEqual(2014);

        var series = chart.getSeries(data);
        expect(series.length).toEqual(5);
        expect(JSON.stringify(series)).toEqual('[{"name":"Journal Article","data":[0]},{"name":"Conference Paper","data":[0]},{"name":"Book Chapter","data":[0]},{"name":"Book","data":[0]},{"name":"Other","data":[1]}]');
    });

    it('it should return data for multiple publications', function () {
        var chart = new _AuthorsPublicationsPerYearChart2.default({ rawData: {}, yAxisTitle: 'title' });
        var data = _publicationYears.publicationYearsSmall.facet_counts.facet_pivot['date_year_t,display_type_i_lookup_exact'];

        var categories = chart.getCategories(data);
        expect(categories.length).toEqual(9);
        expect(categories.toString()).toEqual("2005,2007,2008,2009,2011,2012,2013,2014,2015");

        var series = chart.getSeries(data);
        expect(series.length).toEqual(5);
        expect(JSON.stringify(series)).toEqual('[{"name":"Journal Article","data":[1,1,2,2,2,1,1,3,2]},{"name":"Conference Paper","data":[0,0,0,0,1,0,0,0,0]},{"name":"Book Chapter","data":[0,0,0,0,0,0,0,0,0]},{"name":"Book","data":[0,0,0,0,0,0,0,0,0]},{"name":"Other","data":[0,1,0,0,0,0,0,0,0]}]');
    });
});