'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AsyncAutoCompleteSelect = require('./AsyncAutoCompleteSelect');

var _AsyncAutoCompleteSelect2 = _interopRequireDefault(_AsyncAutoCompleteSelect);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AsyncAutoCompleteSelect');

function setup(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _AsyncAutoCompleteSelect2.default.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return (0, _enzyme.shallow)(_react2.default.createElement(_AsyncAutoCompleteSelect2.default, props), { context: { muiTheme: (0, _getMuiTheme2.default)() } });
}

describe('AsyncAutoCompleteSelectWrapper snapshots tests', function () {
    it('renders asyncautocomplete field', function () {
        var props = {
            name: 'owner',
            label: 'Owner',
            disabled: false,
            filterItems: jest.fn(),
            labelField: 'name',
            value: {},
            errorText: '',
            meta: {
                touched: null
            },
            input: {
                onBlur: null
            }
        };

        var wrapper = setup(props);
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});