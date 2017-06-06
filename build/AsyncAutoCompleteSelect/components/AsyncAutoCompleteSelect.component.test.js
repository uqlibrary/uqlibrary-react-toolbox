'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _AsyncAutoCompleteSelect = require('./AsyncAutoCompleteSelect.component');

var _AsyncAutoCompleteSelect2 = _interopRequireDefault(_AsyncAutoCompleteSelect);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AsyncAutoCompleteSelect.component');

var onChange = void 0;

function setup() {
    var testData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    onChange = _sinon2.default.spy();
    var muiTheme = (0, _getMuiTheme2.default)();
    var props = {
        helpTitle: 'title',
        helpText: 'text',
        disabled: false,
        label: 'test',
        alwaysRenderSuggestions: testData.alwaysRenderSuggestion,
        onChange: onChange
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_AsyncAutoCompleteSelect2.default, props), {
        context: { muiTheme: muiTheme },
        childContextTypes: { muiTheme: _propTypes2.default.object } });
}

describe('Add Journal article form unit tests', function () {
    it('checks if closeModal state is set', function () {
        var app = setup();

        app.instance().closeModal();
        expect(app.state('isModalOpen')).toEqual(false);
    });

    it('checks if openModal state is set', function () {
        var app = setup();

        app.instance().openModal();
        expect(app.state('isModalOpen')).toEqual(true);
        expect(app.state('searchValue')).toEqual('');
    });

    it('checks if isFocused state is true', function () {
        var app = setup();

        app.instance().onFocus();
        expect(app.state('isFocused')).toEqual(true);
    });

    it('checks if isFocused state is false', function () {
        var app = setup();

        app.instance().onBlur();
        expect(app.state('isFocused')).toEqual(false);
    });

    it('checks if should render suggestions', function () {
        var app = setup();

        var result = app.instance().shouldRenderSuggestions('test');
        expect(result).toEqual(true);

        result = app.instance().shouldRenderSuggestions(1);
        expect(result).toEqual(false);
    });

    it('checks if getSuggestionValue returns suggestion', function () {
        var app = setup();

        var result = app.instance().getSuggestionValue('test');
        expect(result).toEqual('test');

        result = app.instance().shouldRenderSuggestions(1);
        expect(result).toEqual(false);
    });

    it('checks if getSuggestionValue returns the same input value', function () {
        var testData = {};
        var app = setup(testData);

        app.instance().onSuggestionsClearRequested();
        expect(app.state('suggestions')).toEqual([]);

        testData.alwaysRenderSuggestion = true;
        app = setup(testData);
        app.instance().onSuggestionsClearRequested();
        expect(app.state('suggestions')).toEqual([]);
    });

    it('checks if onSuggestionSelected onChange is called', function () {
        var app = setup();

        app.instance().onSuggestionSelected(jest.fn(), 'test');
        expect(onChange.calledOnce).toEqual(true);
    });
});