'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./Toggle');

function setup() {
    var muiTheme = (0, _getMuiTheme2.default)();
    var props = {
        helpTitle: 'title',
        helpText: 'text',
        label: 'test'
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_Toggle2.default, props), {
        context: { muiTheme: muiTheme },
        childContextTypes: { muiTheme: _propTypes2.default.object } });
}

describe('Add Toggle snapshot tests', function () {
    it('renders default toggle component', function () {
        var app = setup();
        expect((0, _enzymeToJson2.default)(app)).toMatchSnapshot();
    });
});