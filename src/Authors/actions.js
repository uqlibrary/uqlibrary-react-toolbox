// Repositories
import {getListOfAuthors} from '../../repositories/authors';

// Types
export const AUTHORS_LOADING = 'AUTHORS_LOADING';
export const AUTHORS_LOADED = 'AUTHORS_LOADED';
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
export const ADD_AUTHOR = 'ADD_AUTHOR';

/**
 * Loads a list of authors
 * @returns {function(*)}
 */
export function loadAuthors() {
    return dispatch => {
        dispatch({type: AUTHORS_LOADING});
        getListOfAuthors().then(authorList => {
            dispatch({
                type: AUTHORS_LOADED,
                payload: authorList
            });
        }).catch((error) => {
            throw(error);
        });
    };
}

export function removeAuthor(authorIndex) {
    console.log('ai', authorIndex);
    return dispatch => {
        dispatch({
            type: REMOVE_AUTHOR,
            payload: authorIndex
        });
    };
}

export function addAuthor(authorID) {
    return dispatch => {
        dispatch({
            type: ADD_AUTHOR,
            payload: authorID
        });
    };
}
