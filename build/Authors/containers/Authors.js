'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _immutable = require('redux-form/immutable');

var _Authors = require('../components/Authors');

var _Authors2 = _interopRequireDefault(_Authors);

var _immutable2 = require('immutable');

var _immutable3 = _interopRequireDefault(_immutable2);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorsContainer = (0, _immutable.reduxForm)({
    destroyOnUnmount: false
})(_Authors2.default);

AuthorsContainer = (0, _reactRedux.connect)(function (state, initialProps) {
    var listOfAuthorsState = state.get('authors') || _immutable3.default.Map({});
    return {
        selectedAuthors: listOfAuthorsState.get('selectedAuthors') || _immutable3.default.Map({}),
        formValues: (0, _immutable.getFormValues)(initialProps.form || 'AuthorForm')(state) || _immutable3.default.Map({})
    };
}, function (dispatch) {
    return {
        removeAuthor: function removeAuthor(author) {
            return dispatch((0, _actions.removeAuthor)(author));
        },
        addAuthor: function addAuthor(author) {
            return dispatch((0, _actions.addAuthor)(author));
        }
    };
})(AuthorsContainer);

exports.default = AuthorsContainer;