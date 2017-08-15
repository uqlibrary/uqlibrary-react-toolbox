'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StandardCard = require('./StandardCard');

var _StandardCard2 = _interopRequireDefault(_StandardCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./StandardCard');

function setup(title, help) {
    var props = { title: title, help: help };
    return (0, _enzyme.shallow)(_react2.default.createElement(_StandardCard2.default, props));
}

describe('Snapshot tests for StandardCard component', function () {
    it('renders StandardCard with title and no help icon', function () {
        var wrapper = setup('card title');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders StandardCard with title and help button', function () {
        var wrapper = setup('card title', { title: 'help', text: 'help text', buttonLabel: 'OK' });
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});