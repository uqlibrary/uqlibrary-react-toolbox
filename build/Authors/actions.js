'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ADD_AUTHOR = exports.REMOVE_AUTHOR = exports.AUTHORS_LOADED = exports.AUTHORS_LOADING = undefined;
exports.loadAuthors = loadAuthors;
exports.removeAuthor = removeAuthor;
exports.addAuthor = addAuthor;

var _authors = require('../../repositories/authors');

// Types
var AUTHORS_LOADING = exports.AUTHORS_LOADING = 'AUTHORS_LOADING'; // Repositories
var AUTHORS_LOADED = exports.AUTHORS_LOADED = 'AUTHORS_LOADED';
var REMOVE_AUTHOR = exports.REMOVE_AUTHOR = 'REMOVE_AUTHOR';
var ADD_AUTHOR = exports.ADD_AUTHOR = 'ADD_AUTHOR';

/**
 * Loads a list of authors
 * @returns {function(*)}
 */
function loadAuthors() {
    return function (dispatch) {
        dispatch({ type: AUTHORS_LOADING });
        (0, _authors.getListOfAuthors)().then(function (authorList) {
            dispatch({
                type: AUTHORS_LOADED,
                payload: authorList
            });
        }).catch(function (error) {
            throw error;
        });
    };
}

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