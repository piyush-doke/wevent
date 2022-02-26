import {alertConstants} from '../constants';

/*
    state will be:
    // selected_events: list of event_ids
    events: all events received back from latest search
    searchEvent: 
*/

const initialState = {
    message : ""
};

export function alert(state = initialState, action) {
    switch (action.type) {
        case alertConstants.CHANGE_MESSAGE:
            var newState = {...state, message: action.message, serverity: action.serverity};
            return newState;
        default:
            return state;
    }
}