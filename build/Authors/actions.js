'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeAuthor = removeAuthor;
exports.addAuthor = addAuthor;
exports.clearAuthors = clearAuthors;
// Types
var REMOVE_AUTHOR = exports.REMOVE_AUTHOR = 'REMOVE_AUTHOR';
var ADD_AUTHOR = exports.ADD_AUTHOR = 'ADD_AUTHOR';
var CLEAR_AUTHORS = exports.CLEAR_AUTHORS = 'CLEAR_AUTHORS';

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

function clearAuthors() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_AUTHORS,
            payload: {}
        });
    };
}