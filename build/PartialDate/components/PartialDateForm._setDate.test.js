'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PartialDateForm = require('./PartialDateForm');

var _PartialDateForm2 = _interopRequireDefault(_PartialDateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PartialDateForm');

var validationMessages = {
    validationMessage: {
        day: 'Invalid day',
        month: 'Invalid month',
        year: 'Invalid year'
    }
};

var partialAllowedDateForm = new _PartialDateForm2.default({ allowPartial: true, locale: validationMessages, dateFormat: 'YYYY-MM-DD' });
var partialNotAllowedDateForm = new _PartialDateForm2.default({ allowPartial: false, locale: validationMessages, dateFormat: 'YYYY-MM-DD' });

var states = [{ day: null, month: null, year: 2015 }, { day: null, month: -1, year: 2015 }, { day: 25, month: null, year: null }, { day: 25, month: null, year: NaN }, { day: NaN, month: null, year: 2015 }, { day: 10, month: 2, year: 2015 }, { day: 32, month: 2, year: 2015 }];

var partialAllowedDateExpected = ['2015-01-01', '', '', '', '2015-01-01', '2015-03-10', ''];

var partialNotAllowedDateExpected = ['', '', '', '', '', '2015-03-10', ''];

describe('PartialDateForm unit tests', function () {
    it('should get formatted date from given state if allowed partial', function () {
        states.map(function (state, index) {
            expect(partialAllowedDateForm._setDate(state)).toBe(partialAllowedDateExpected[index]);
        });
    });

    it('should get formatted date from given state if not allowed partial', function () {
        states.map(function (state, index) {
            expect(partialNotAllowedDateForm._setDate(state)).toBe(partialNotAllowedDateExpected[index]);
        });
    });
});