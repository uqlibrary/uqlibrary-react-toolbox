'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PartialDateForm = require('./PartialDateForm');

var _PartialDateForm2 = _interopRequireDefault(_PartialDateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PartialDateForm');

var locale = {
    minNumberCharCode: 48,
    maxNumberCharCode: 57
};

var partialDateForm = new _PartialDateForm2.default({ allowPartial: true, locale: locale });

describe('PartialDateForm unit tests', function () {
    it('should check if pressed key charCode 39 is numeric key or not and prevent default event', function () {
        var event = {
            charCode: 39,
            preventDefault: function preventDefault() {
                return expect(true).toBeTruthy();
            }
        };

        partialDateForm._isNumber(event);
    });

    it('should check if pressed key charCode 59 is numeric key or not and prevent default event', function () {
        var event = {
            charCode: 59,
            preventDefault: function preventDefault() {
                return expect(true).toBeTruthy();
            }
        };

        partialDateForm._isNumber(event);
    });
});