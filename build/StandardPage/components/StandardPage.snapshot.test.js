'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StandardPage = require('./StandardPage');

var _StandardPage2 = _interopRequireDefault(_StandardPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./StandardPage');

function setup(title) {
    var props = { title: title };
    return (0, _enzyme.shallow)(_react2.default.createElement(_StandardPage2.default, props));
}

describe('Snapshot tests for StandardPage component', function () {
    it('renders StandardPage with title', function () {
        var wrapper = setup('standard page title');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});