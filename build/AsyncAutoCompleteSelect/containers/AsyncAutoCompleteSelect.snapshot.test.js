'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _AsyncAutoComplete = require('./AsyncAutoComplete');

var _AsyncAutoComplete2 = _interopRequireDefault(_AsyncAutoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AsyncAutoComplete');

function setup() {
    var props = {
        helpTitle: 'title',
        helpText: 'text',
        disabled: false,
        label: 'test'
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_AsyncAutoComplete2.default, props));
}

describe('Add Journal article form snapshot tests', function () {
    it('renders default add journal article form', function () {
        var app = setup();
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});