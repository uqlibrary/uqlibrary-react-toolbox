'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeAuthor = removeAuthor;
exports.addAuthor = addAuthor;
// Types
var REMOVE_AUTHOR = exports.REMOVE_AUTHOR = 'REMOVE_AUTHOR';
var ADD_AUTHOR = exports.ADD_AUTHOR = 'ADD_AUTHOR';

function removeAuthor(authorIndex) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_AUTHOR,
            payload: authorIndex
        });
    };
}

function addAuthor(authorID) {
    return function (dispatch) {
        dispatch({
            type: ADD_AUTHOR,
            payload: authorID
        });
    };
}