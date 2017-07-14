'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/Alert');

function setup(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? 'This is the title' : _ref$title,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? 'This is the message' : _ref$message,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? 'error' : _ref$type;

    var props = { title: title, message: message, type: type };
    return (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, props));
}

describe('Alert snapshots test', function () {
    it('renders the title, message and icon as expected', function () {
        var wrapper = setup();
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });
});