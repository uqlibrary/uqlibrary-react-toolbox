'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('./SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./SelectField');

function setup(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _SelectField2.default.propTypes);
    return (0, _enzyme.shallow)(_react2.default.createElement(_SelectField2.default, consolidatedProps));
}

describe('SelectfieldWrapper snapshots tests', function () {
    it('renders SelectField component', function () {
        var props = {
            name: 'selectfield',
            type: 'text',
            fullWidth: true,
            floatingLabelText: 'This is a test selectfield component'
        };

        var wrapper = setup(props);
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});