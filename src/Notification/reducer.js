import Immutable from 'immutable';

import {NOTIFICATION_DISPLAYED} from './actions';

// Immutable state
export const initialState = Immutable.fromJS({
    notificationList: {}
});

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_DISPLAYED:
            return state.set('notificationList', Immutable.fromJS(action.payload));
        default:
            return state;
    }
};

export default notificationReducer;
