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
    selectedAuthors: {}
});

var authorsReducer = function authorsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.ADD_AUTHOR:
            var updatedAuthorsList = _immutable2.default.Set(state.get('selectedAuthors'));
            var foundAuthor = action.payload;

            if (!updatedAuthorsList.has(foundAuthor.get('id'))) {
                updatedAuthorsList = updatedAuthorsList.union([_immutable2.default.Map(foundAuthor)]);
            }

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

exports.default = authorsReducer;