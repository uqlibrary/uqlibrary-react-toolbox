import Immutable from 'immutable';

import { AUTHORS_LOADED, ADD_AUTHOR, REMOVE_AUTHOR } from './actions';

// Immutable state
const initialState = Immutable.fromJS({
    listOfAuthors: {},
    selectedAuthors: {}
});

const authorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORS_LOADED:
            return state.set('listOfAuthors', Immutable.fromJS(action.payload));
        case ADD_AUTHOR:
            const listOfAuthors = state.get('listOfAuthors');
            let updatedAuthorsList = Immutable.Set(state.get('selectedAuthors'));

            listOfAuthors.map(author => {
                if (author.includes(action.payload) && !updatedAuthorsList.has(author.get('id'))) {
                    const newAuthor = [Immutable.Map({'id': author.get('id'), 'name': author.get('name')})];
                    updatedAuthorsList = updatedAuthorsList.union(newAuthor);
                }
            });

            return state.set('selectedAuthors', Immutable.fromJS(updatedAuthorsList));
        case REMOVE_AUTHOR:
            const removeFromAuthorList = state.get('selectedAuthors').filter(author => {
                return author.get('id') !== action.payload;
            });
            return state.set('selectedAuthors', Immutable.fromJS(removeFromAuthorList));
        default:
            return state;
    }
};

export default authorsReducer;
