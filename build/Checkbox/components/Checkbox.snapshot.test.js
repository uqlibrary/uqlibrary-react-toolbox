'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./Checkbox');

function setup(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _Checkbox2.default.propTypes);
    return (0, _enzyme.shallow)(_react2.default.createElement(_Checkbox2.default, consolidatedProps));
}

describe('CheckboxWrapper snapshots tests', function () {
    it('renders Checkbox component', function () {
        var props = {
            label: 'This is a test checkbox component'
        };

        var app = setup(props);
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});