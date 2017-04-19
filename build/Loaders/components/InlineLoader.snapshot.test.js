'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InlineLoader = require('./InlineLoader');

var _InlineLoader2 = _interopRequireDefault(_InlineLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./InlineLoader');

function setup(message) {
    var props = { message: message };
    return (0, _enzyme.shallow)(_react2.default.createElement(_InlineLoader2.default, props));
}

describe('InlineLoader snapshots tests', function () {
    it('renders loader', function () {
        var wrapper = setup('Waiting to load...');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});