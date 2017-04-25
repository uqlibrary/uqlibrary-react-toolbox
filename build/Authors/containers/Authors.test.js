'use strict';

var _reduxForm = require('redux-form');

var _Authors = require('../components/Authors');

var _Authors2 = _interopRequireDefault(_Authors);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/Authors');

// See README for discussion of chai, enzyme, and sinon


// otherwise it throws an 'Unknown prop `onTouchTap` on <div> tag.' error during the test

(0, _reactTapEventPlugin2.default)();

var addAuthor = void 0;
var removeAuthor = void 0;
var selectedAuthors = void 0;
var app = void 0;

describe('Authors', function () {
    beforeEach(function () {
        var store = (0, _redux.createStore)((0, _redux.combineReducers)({ form: _reduxForm.reducer, authors: _reducer2.default }));
        addAuthor = _sinon2.default.spy();
        removeAuthor = _sinon2.default.spy();
        var authors = _immutable2.default.fromJS([{ 'id': 202, 'name': 'Author 8' }, { 'id': 263, 'name': 'Author 9' }, { 'id': 174, 'name': 'Author 10' }, { 'id': 177, 'name': 'Author 11' }]);

        selectedAuthors = _immutable2.default.fromJS([{ 'id': 202, 'name': 'Author 8' }, { 'id': 263, 'name': 'Author 9' }]);

        var props = {
            addAuthor: addAuthor,
            removeAuthor: removeAuthor,
            selectedAuthors: selectedAuthors,
            dataSource: authors,
            form: 'atestform',
            formValues: _immutable2.default.fromJS({ authorName: 177 })

        };

        var muiTheme = (0, _getMuiTheme2.default)();
        var Decorated = (0, _reduxForm.reduxForm)({ form: 'testForm' })(_Authors2.default);
        app = (0, _enzyme.mount)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(Decorated, props)
        ), { context: { muiTheme: muiTheme },
            childContextTypes: { muiTheme: _react2.default.PropTypes.object } });
    });

    it('renders nested components', function () {
        expect(app.find('RaisedButton').toBeDefined);
        expect(app.find('AutoCompleteSelectWrapper').toBeDefined);
    });

    it('adds an author to the list', function () {
        var button = app.find('RaisedButton').first();
        var input = app.find('AutoCompleteSelectWrapper').first();
        input.simulate('change', { target: { value: 'Author 10' } });

        // trigger a real click as the this.addAuthor function is internal to the component
        // ie it's not passed as a prop which means we can't simulate the click
        button.props().onClick();
        expect(addAuthor.called).toEqual(true);
        expect(addAuthor.callCount).toEqual(1);
    });

    it('removes an author from the list', function () {
        var authorRows = app.find('AuthorRow');
        expect(authorRows.length).toEqual(selectedAuthors.size);

        var selectedAuthor = app.find('AuthorRow').first();
        selectedAuthor.props().removeAuthor(0);

        expect(removeAuthor.called).toEqual(true);
        expect(removeAuthor.callCount).toEqual(1);
    });
});