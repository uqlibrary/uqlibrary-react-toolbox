// Types
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
export const ADD_AUTHOR = 'ADD_AUTHOR';

export function removeAuthor(authorIndex) {
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
