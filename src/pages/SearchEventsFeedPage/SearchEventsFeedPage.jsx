import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {EventSearch, EventFeed} from '../../components/Event';
import {AlertComponent} from '../../components/Alert';
import { connect } from 'react-redux';
import {eventActions, planActions} from '../../actions';
import { history } from '../../utilities';



function SearchEventsPage({activePlan, event, addEvents, searchEvents, removeEvents})
{
    const [showFeed, setShowFeed] = useState(false);
    

    var handleAddEvents = function(e){
        addEvents(event.events, activePlan.plan_id);
        //history.push('/createPlan')
        //history.go(0)
    };

    var handleSearch = function(e){
        setShowFeed(true);
        searchEvents(event.searchEvent.start, event.searchEvent.category, event.searchEvent.neighborhood);
    };

    var handleClear = function(e){
        removeEvents();
    }

    return(
        <div>
            {
                showFeed? event.events.map(e => (<EventFeed event={e} key={e.event_id}/>)) :
                (<EventSearch searchEvent={event.searchEvent}/>)
            }
            <Button variant="contained" onClick={handleAddEvents} >Add Selected Events</Button>
            <Button variant="contained" onClick={handleSearch} >Search Events</Button>
            {
                showFeed && <Button variant="contained" onClick={handleClear} >Clear</Button>
            }
            <AlertComponent/>
        </div>
        
    )
};

function mapState(state) {
    return {event: state.event, activePlan: state.plan.activePlan};
}

const actionCreators = {
    addEvents: planActions.addEvents,
    searchEvents: eventActions.searchEvents,
    removeEvents: eventActions.removeEvents
};

const connectedRoomComponent = connect(mapState, actionCreators)(SearchEventsPage);
export { connectedRoomComponent as SearchEventsFeedPage };