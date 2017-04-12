'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Immutable state
var initialState = _immutable2.default.fromJS({
    listOfAuthors: {},
    selectedAuthors: {}
});

var authorsReducer = function authorsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.AUTHORS_LOADED:
            return state.set('listOfAuthors', _immutable2.default.fromJS(action.payload));
        case _actions.ADD_AUTHOR:
            var listOfAuthors = state.get('listOfAuthors');
            var updatedAuthorsList = _immutable2.default.Set(state.get('selectedAuthors'));

            listOfAuthors.map(function (author) {
                if (author.includes(action.payload) && !updatedAuthorsList.has(author.get('id'))) {
                    var newAuthor = [_immutable2.default.Map({ 'id': author.get('id'), 'name': author.get('name') })];
                    updatedAuthorsList = updatedAuthorsList.union(newAuthor);
                }
            });

            return state.set('selectedAuthors', _immutable2.default.fromJS(updatedAuthorsList));
        case _actions.REMOVE_AUTHOR:
            var removeFromAuthorList = state.get('selectedAuthors').filter(function (author) {
                return author.get('id') !== action.payload;
            });
            return state.set('selectedAuthors', _immutable2.default.fromJS(removeFromAuthorList));
        default:
            return state;
    }
};

var _default = authorsReducer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/Authors/reducer.js');

    __REACT_HOT_LOADER__.register(authorsReducer, 'authorsReducer', 'src/Authors/reducer.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Authors/reducer.js');
}();

;