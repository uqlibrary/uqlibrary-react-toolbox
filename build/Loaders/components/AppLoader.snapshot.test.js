'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppLoader = require('./AppLoader');

var _AppLoader2 = _interopRequireDefault(_AppLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AppLoader');

function setup(title, logoImage, logoText, progressColor) {
    var props = { title: title, logoImage: logoImage, logoText: logoText, progressColor: progressColor };
    return (0, _enzyme.shallow)(_react2.default.createElement(_AppLoader2.default, props));
}

describe('AppLoader snapshots tests', function () {
    it('renders loader without image', function () {
        var wrapper = setup('Fez frontend');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders loader with image', function () {
        var wrapper = setup('Fez frontend', 'http://image/image.svg', 'Fez logo', '#CCC');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});