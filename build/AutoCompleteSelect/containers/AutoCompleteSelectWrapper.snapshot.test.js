'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoCompleteSelect = require('./AutoCompleteSelect');

var _AutoCompleteSelect2 = _interopRequireDefault(_AutoCompleteSelect);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AutoCompleteSelect');

function setup(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _AutoCompleteSelect2.default.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return (0, _enzyme.shallow)(_react2.default.createElement(_AutoCompleteSelect2.default, props));
}

describe('AutoCompleteSelectWrapper snapshots tests', function () {
    it('renders autocomplete field', function () {
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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/AutoCompleteSelect/containers/AutoCompleteSelectWrapper.snapshot.test.js');
}();

;