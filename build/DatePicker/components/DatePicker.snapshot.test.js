'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./DatePicker');

function setup(props) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_DatePicker2.default, props));
}

describe('DatePickerWrapper snapshots tests', function () {
    it('renders DatePicker component', function () {
        var props = {
            name: 'test',
            type: 'text',
            fullWidth: true,
            floatingLabelText: 'This is a test date picker component'
        };

        var app = setup(props);
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});