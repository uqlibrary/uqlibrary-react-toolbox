'use strict';

var _AutoCompleteSelect = require('./AutoCompleteSelect');

var _AutoCompleteSelect2 = _interopRequireDefault(_AutoCompleteSelect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reduxForm = require('redux-form');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./AutoCompleteSelect');

(0, _reactTapEventPlugin2.default)();

var subject = void 0;

function setup() {
    var store = (0, _redux.createStore)((0, _redux.combineReducers)({ form: _reduxForm.reducer }));
    var authors = [{ 'id': 202, 'name': 'Author 8' }, { 'id': 263, 'name': 'Author 9' }, { 'id': 174, 'name': 'Author 10' }, { 'id': 177, 'name': 'Author 11' }];
    var dsConfig = { text: 'name', value: 'id' };
    var props = {
        dataSource: authors,
        form: 'atestform',
        label: 'test',
        dataSourceConfig: dsConfig,
        formValue: 177

    };

    var muiTheme = (0, _getMuiTheme2.default)();

    subject = (0, _enzyme.mount)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_AutoCompleteSelect2.default, props)
    ), { context: { muiTheme: muiTheme },
        childContextTypes: { muiTheme: _react2.default.PropTypes.object } });
}
describe('Autocompleteselect', function () {
    it('selects the last author in the list"', function () {
        setup();

        expect(subject.find({ className: 'value' }).text()).toEqual('Author 11');
    });
});