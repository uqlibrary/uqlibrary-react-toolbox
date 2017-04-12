'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./TextField');

function setup(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _TextField2.default.propTypes);
    return (0, _enzyme.shallow)(_react2.default.createElement(_TextField2.default, consolidatedProps));
}

describe('TextFieldWrapper snapshots tests', function () {
    it('renders TextField component', function () {
        var props = {
            name: 'testField',
            type: 'text',
            fullWidth: true,
            floatingLabelText: 'This is a test textfield component'
        };

        var wrapper = setup(props);
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/TextField/components/TextField.snapshot.test.js');
}();

;