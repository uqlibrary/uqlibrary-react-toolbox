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
    var title = _ref.title,
        message = _ref.message,
        type = _ref.type;

    var props = {
        title: 'This is a title',
        message: 'This is a message',
        type: 'error'
    };
    return (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, props));
}

describe('Alert snapshots test', function () {
    it('renders Alert of error type', function () {
        var title = "This is a title";
        var message = "This is the message";
        var type = "error";

        var wrapper = setup(title, message, type);
        expect((0, _enzymeToJson2.default)(wrapper)).toMatchSnapshot();
    });
});