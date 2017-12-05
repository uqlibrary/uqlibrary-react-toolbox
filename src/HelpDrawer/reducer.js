import {
    HIDE,
    SHOW
} from './actions';

const initialState = {
    open: false,
    title: '',
    text: '',
    buttonLabel: 'OK'
};

const helpDrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return {
                ...action.payload,
                open: true
            };
        case HIDE:
            return {...initialState};
        default:
            return state;
    }
};

export default helpDrawerReducer;
