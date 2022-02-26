import {eventConstants} from '../constants';

/*
    state will be:
    // selected_events: list of event_ids
    events: all events received back from latest search
    searchEvent: 
*/

const initialState = {
    events: [],
    searchEvent: {
        name: null,
        neighborhood: "Food & Drink",
        category: "Flatblush"
    }
};

export function event(state = initialState, action) {
    var newState = {...state};
    switch (action.type) {
        case eventConstants.SEARCH_EVENTS:
            newState.events = action.events.map(event=>{
                event.selected = false;
                return event;
            });
            return newState;
        case eventConstants.SELECT_EVENT:
            // state.selected_events.push(event_id);
            newState.events = newState.events.map(event=> {
                if(event.event_id === action.event_id){
                    // event.selected = !event.selected;
                    event = {...event, selected: !event.selected};
                }
                return event;
            });
            newState.events = [...newState.events];
            return newState;
        case eventConstants.CHANGE_EVENT_CATEGORY:
            newState.searchEvent.category = action.category;
            return newState;
        case eventConstants.CHANGE_EVENT_START:
            newState.searchEvent.start = action.start;
            return newState;
        case eventConstants.CHANGE_EVENT_NEIGHBORHOOD:
            newState.searchEvent.neighborhood = action.neighborhood;
            return newState;
        case eventConstants.REMOVE_EVENTS:
            newState.events = [];
        default:
            return state;
    }
}