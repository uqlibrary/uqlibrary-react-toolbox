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

var partialAllowedDateForm = new _PartialDateForm2.default({ allowPartial: true, locale: validationMessages });
var partialNotAllowedDateForm = new _PartialDateForm2.default({ allowPartial: false, locale: validationMessages });

describe('PartialDateForm unit tests', function () {
    /**
     * Test _displayErrors with allowPartial: true
     */
    it('should not display validation error if year is present and allowed partial', function () {
        partialAllowedDateForm._displayErrors({ day: null, month: null, year: 2015 }, true);
        expect(partialAllowedDateForm.errors).toMatchObject({});
    });

    it('should display validation message on month if invalid month is selected', function () {
        partialAllowedDateForm._displayErrors({ day: null, month: -1, year: 2015 }, false);
        expect(partialAllowedDateForm.errors).toMatchObject({ month: 'Invalid month' });
    });

    it('should not display validation message on day if it\'s invalid, month and year not touched and allowed partial', function () {
        partialAllowedDateForm._displayErrors({ day: 32, month: null, year: null }, false);
        expect(partialAllowedDateForm.errors).toMatchObject({});
    });

    it('should display validation message on day if it\'s invalid, year touched and allowed partial', function () {
        partialAllowedDateForm._displayErrors({ day: 32, month: null, year: NaN }, false);
        expect(partialAllowedDateForm.errors).toMatchObject({ day: '', month: '', year: 'Invalid year' });
    });

    it('should display validation message on year field touched if allowed partial', function () {
        partialAllowedDateForm._displayErrors({ day: 25, month: null, year: NaN }, false);
        expect(partialAllowedDateForm.errors).toMatchObject({ year: 'Invalid year' });
    });

    /**
     * Test _displayErrors with allowPartial: false
     */
    it('should not display any validation message on year present if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: null, month: null, year: 2015 }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({});
    });

    it('should display validation message on month if invalid month (-1) selected if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: null, month: -1, year: 2015 }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({ month: 'Invalid month' });
    });

    it('should not validate date on focus and blur on year field if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: 25, month: null, year: NaN }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({ year: 'Invalid year' });
    });

    it('should display validation message on day on touched day field if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: NaN, month: null, year: 2015 }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({ day: 'Invalid day' });
    });

    it('should display all validation messages on day, month and year if all fields are invalid if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: NaN, month: -1, year: NaN }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({ day: 'Invalid day', month: 'Invalid month', year: 'Invalid year' });
    });

    it('should not display any validation message if valid day, month, year present if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: 10, month: 2, year: 2015 }, true);
        expect(partialNotAllowedDateForm.errors).toMatchObject({});
    });

    it('should display validation message on day if invalid day and valid month, year present if not allowed partial', function () {
        partialNotAllowedDateForm._displayErrors({ day: 29, month: 1, year: 2015 }, false);
        expect(partialNotAllowedDateForm.errors).toMatchObject({ day: 'Invalid day' });
    });
});