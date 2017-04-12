'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StaticPage = require('./StaticPage');

var _StaticPage2 = _interopRequireDefault(_StaticPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./StaticPage');

function setup(title, text, help) {
    var props = { title: title, text: text, help: help };
    return (0, _enzyme.shallow)(_react2.default.createElement(_StaticPage2.default, props));
}

describe('StaticPage snapshots tests', function () {
    it('renders StaticPage with title and text', function () {
        var wrapper = setup('about', 'this is about page');
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders StaticPage with title, text and help button', function () {
        var wrapper = setup('about', 'this is about page', { title: 'help', text: 'help text' });
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/StaticPage/components/StaticPage.snapshot.test.js');
}();

;