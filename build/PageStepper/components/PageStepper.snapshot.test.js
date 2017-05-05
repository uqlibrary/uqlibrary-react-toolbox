'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageStepper = require('./PageStepper');

var _PageStepper2 = _interopRequireDefault(_PageStepper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PageStepper');

function setup() {
    var props = {
        formSections: ['Page 1 Test', 'Page 2 Test']
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(
        _PageStepper2.default,
        props,
        _react2.default.createElement(
            'div',
            { 'data-stepperIndex': '0' },
            'Page 1'
        ),
        _react2.default.createElement(
            'div',
            { 'data-stepperIndex': '1' },
            'Page 2'
        )
    ));
}

describe('PageStepper snapshots tests', function () {
    it('renders the stepper', function () {
        var app = setup();
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();

        // go to page 2
        app.setState({ stepIndex: 1 });
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});