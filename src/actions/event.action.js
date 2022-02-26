import {eventConstants, alertConstants} from '../constants';
import {apiClient} from '../aws';

export const eventActions = {
    searchEvents,
    selectEvent,
    changeCategory,
    changeStart,
    changeNeighborhood,
    removeEvents
  };

function searchEvents(start, category, neighborhood)
{
    return (dispatch) => {
        dispatch(showSearching("Searching...", "info"));
        dispatch(clearEvents()); // clear events first to remove confusing details
        start = Math.floor(Date.parse(start) / 1000);
        apiClient.searchEvents(neighborhood, start, category)
        .then(result => {
            var events = result.data.results;
            dispatch(searched(events));
            if(events.length === 0){
                dispatch(warning("Found 0 events"));
            }
            else{
                dispatch(clearAlert());
            }
        })
        .catch(e => {
            console.log(e);
            dispatch(error("Cannot search for events"));
        })
        
    }

    function searched(events)
    {
        return {
            type: eventConstants.SEARCH_EVENTS,
            events
        }
    }

    function clearEvents()
    {
        return {
            type: eventConstants.REMOVE_EVENTS
        }
    }

    function showSearching(message)
    {
        return {
            type: alertConstants.CHANGE_MESSAGE,
            message
        }
    }

    function clearAlert()
    {
        return {
            type: alertConstants.CHANGE_MESSAGE,
            message:""
        }
    }
}

function selectEvent(event_id)
{
    return (dispatch) => {
        dispatch(selected_event());
    }

    function selected_event()
    {
        return {
            type: eventConstants.SELECT_EVENT,
            event_id
        }
    }
}

function changeCategory(category)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_EVENT_CATEGORY,
            category

        }
    }
}

function changeStart(start)
{
    console.log('changeStart', start);
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_EVENT_START,
            start
        }
    }
}

function changeNeighborhood(neighborhood)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: eventConstants.CHANGE_EVENT_NEIGHBORHOOD,
            neighborhood
        }
    }
}

function removeEvents()
{
    return (dispatch) => {
        dispatch(removed())
    }

    function removed(){
        return {
            type: eventConstants.REMOVE_EVENTS
        }
    }
}

function success(message){
    return{
        type: alertConstants.CHANGE_MESSAGE,
        message, severity:"success"
    }
}

function error(message){
    return{
        type: alertConstants.CHANGE_MESSAGE,
        message, severity:"error"
    }
}

function warning(message){
    return{
        type: alertConstants.CHANGE_MESSAGE,
        message, severity:"warning"
    }
}