'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _PartialDateForm = require('./PartialDateForm');

var _PartialDateForm2 = _interopRequireDefault(_PartialDateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PartialDateForm');

function setup(props) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_PartialDateForm2.default, props));
}

describe('PartialDateForm unit tests', function () {
    it('should return correct formatted date 1', function () {
        var props = {
            allowPartial: true,
            onChange: function onChange(value) {
                return expect(value).toBe('2015-01-01');
            }
        };

        var form = setup(props);
        form.instance()._onDateChanged('year')({ target: { value: '2015' } });
    });

    it('should return correct formatted date 2', function () {
        var expectToBe = function expectToBe(value) {
            expect(value).toBe(['', '2015-01-01', '', '2015-01-29', '', '2016-02-29', '2016-02-01'].shift());
            return expectToBe;
        };
        var props = {
            allowPartial: true,
            onChange: function onChange(value) {
                return expectToBe;
            }
        };

        var form = setup(props);
        form.instance()._onDateChanged('year')({ target: { value: NaN } });
        form.instance()._onDateChanged('year')({ target: { value: '2015' } });
        form.instance()._onDateChanged('month')({ target: { value: undefined } }, 0, -1);
        form.instance()._onDateChanged('day')({ target: { value: 29 } });
        form.instance()._onDateChanged('month')({ target: { value: undefined } }, 2, 1);
        form.instance()._onDateChanged('year')({ target: { value: '2016' } });
        form.instance()._onDateChanged('day')({ target: { value: NaN } });
    });

    it('should return correct formatted date 3', function () {
        var expectToBe = function expectToBe(value) {
            expect(value).toBe(['', '', '', '', '', '20/09/2016'].shift());
            return expectToBe;
        };

        var props = {
            allowPartial: false,
            dateFormat: 'DD/MM/YYYY',
            onChange: function onChange(value) {
                return expectToBe;
            }
        };

        var form = setup(props);
        form.instance()._onDateChanged('day')({ target: { value: NaN } });
        form.instance()._onDateChanged('day')({ target: { value: '20' } });
        form.instance()._onDateChanged('month')({ target: { value: undefined } }, 0, -1);
        form.instance()._onDateChanged('month')({ target: { value: undefined } }, 9, 8);
        form.instance()._onDateChanged('year')({ target: { value: NaN } });
        form.instance()._onDateChanged('year')({ target: { value: '2016' } });
    });
});