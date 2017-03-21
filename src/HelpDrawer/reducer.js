import Immutable from 'immutable';

import {
    HIDE,
    SHOW
} from './actions';

const initialState = Immutable.fromJS({
    open: false,
    title: '',
    text: '',
    buttonLabel: ''
});

const helpDrawer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return Immutable.fromJS({...action.payload, open: true});
        case HIDE:
            return initialState;
        default:
            return state;
    }
};

export default helpDrawer;
