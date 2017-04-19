'use strict';

var _AsyncAutoCompleteSelect = require('./AsyncAutoCompleteSelect');

var _AsyncAutoCompleteSelect2 = _interopRequireDefault(_AsyncAutoCompleteSelect);

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

jest.dontMock('./AsyncAutoCompleteSelect');

(0, _reactTapEventPlugin2.default)();

var subject = void 0;

function setup() {
    var store = (0, _redux.createStore)((0, _redux.combineReducers)({ form: _reduxForm.reducer }));
    var _filterItems = [{
        username: 'uqbmarley',
        orcid: '11111-11111-11111-11111-11111',
        name: 'Bob Marley',
        mail: 'redacted@uq.edu.au',
        title: 'Prof.',
        fullTitle: 'Associate Professor',
        school: 'Institute for Molecular Bioscience'
    }, {
        username: 'uqckent',
        name: 'Clark Kent',
        mail: 'redacted2@uq.edu.au',
        title: 'Sup.',
        fullTitle: 'Superman',
        school: '¯\\_(ツ)_/¯'
    }];

    var filteredStaff = { name: 'Clark Kent',
        mail: 'redacted2@uq.edu.au' };

    var props = {
        filterItems: function filterItems() {
            return _filterItems;
        },
        form: 'atestform',
        label: 'label for the form',
        value: filteredStaff,
        labelField: 'name'
    };

    var muiTheme = (0, _getMuiTheme2.default)();

    subject = (0, _enzyme.mount)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_AsyncAutoCompleteSelect2.default, props)
    ), { context: { muiTheme: muiTheme },
        childContextTypes: { muiTheme: _react2.default.PropTypes.object } });
}
describe('AsyncAutocompleteselect', function () {
    it('selects the last staff member in the list"', function () {
        setup();

        expect(subject.find({ className: 'value' }).text()).toEqual('Clark Kent');
    });
});