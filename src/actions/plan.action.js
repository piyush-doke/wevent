import {planConstants, eventConstants, alertConstants} from '../constants';
import {apiClient} from '../aws';

export const planActions = {
    getPlans,
    removeActivePlan,
    changeTriggerOption,
    changeName,
    changeStart,
    selectPlan,
    createPlan,
    vote,
    addEvents,
    addInvitee,
    selectOfficialEvent,
    userVoted
};

function getPlans(user_id)
{
    return (dispatch) => {
        if(!user_id) return;
        apiClient.getPlans(user_id)
        .then(result => {
            console.log('getPlans Result', result);
            dispatch(gotPlans(result.data.results));
            if(result.data.results.length === 0){
                dispatch(warning("Found 0 plans"));
            }
            
            // return result.data.results;
        })
        .catch(error => {
            console.log('getPlans error', error);
            dispatch(error("Cannot get plans"));
            // return [];
        });
    }

    function gotPlans(plans)
    {
        return {
            type: planConstants.GET_PLANS,
            plans
        }
    }

    
}

function removeActivePlan()
{
    return (dispatch) => {
        dispatch(removed());
    }

    function removed()
    {
        return {
            type: planConstants.REMOVE_ACTIVE_PLAN
        }
    }

}

function changeTriggerOption(trigger_option)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: planConstants.CHANGE_PLAN_TRIGGER_OPTION,
            trigger_option
        }
    }
}

function changeName(name)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: planConstants.CHANGE_PLAN_NAME,
            name
        }
    }
}

function changeStart(start)
{
    return (dispatch) => {
        dispatch(changed());
    }

    function changed()
    {
        return {
            type: planConstants.CHANGE_PLAN_START,
            start
        }
    }
}

function selectPlan(plan_id)
{
    console.log('selectPlan', plan_id);
    return (dispatch) => {
        dispatch(selected_plan());
    }

    function selected_plan()
    {
        return {
            type: planConstants.SELECT_PLAN,
            plan_id
        }
    }
}

function createPlan(name, start, trigger_option, host_id, events)
{
    return (dispatch) => {
        // start = new Date(start).getTime()
        console.log('createPlan', name, start, trigger_option, host_id, start instanceof Date, typeof start, Date.parse(start));
        start = Math.floor(Date.parse(start)/1000);
        if(!start || !name || !trigger_option || !host_id) return false;
        apiClient.createPlan(name, start, trigger_option, host_id)
        .then(result => {
            console.log('create plan Result', result);
            dispatch(success(`Created plan ${name} successfully`));
            var plan_id = result.data.plan_id;
            events.forEach(event=>{
                apiClient.updatePlan({
                    update_type: 'add_event',
                    plan_id: plan_id,
                    event_id: event.event_id
                });
            })
            
            dispatch(createdPlan(plan_id));
        })
        .catch(error => {
            console.log('Create plan error', error);
            dispatch(error("Failed to create plan"));
        });
        
    }

    function createdPlan(plan_id)
    {
        return {
            type: planConstants.RECEIVE_PLAN_ID,
            plan_id
        }
    }
}

function vote(plan_id, event_id, user_id)
{
    return (dispatch) => {
        if(!plan_id || !event_id || !user_id) return false;
        apiClient.updatePlan({
            update_type: 'vote',
            plan_id: plan_id,
            event_id,
            user_id
        }).then((result)=>{
            dispatch(success(`Update vote successfully`));
        }).catch((e)=>{
            dispatch(error("Update vote failed"));
        });
        dispatch(voted());
    }

    function voted()
    {
        return {
            type: planConstants.VOTE,
            plan_id, event_id, user_id
        }
    }
}

function addEvents(events, plan_id)
{
    return (dispatch) => {
        events.forEach(event => {
            if(event.selected)
            {
                if(plan_id){
                    apiClient.updatePlan({
                        update_type: 'add_event',
                        plan_id: plan_id,
                        event_id: event.event_id
                    }).then((result)=>{
                        dispatch(success(`Update add event successfully`));
                    }).catch((e)=>{
                        dispatch(error("Update add event failed"));
                    });
                }
                
                dispatch(added_event(event));
            }
        });
    }

    function added_event(event)
    {
        return {
            type: planConstants.ADD_EVENT,
            event, plan_id
        }
    }
}

function addInvitee(plan_id, user_id)
{
    return (dispatch) => {
        apiClient.updatePlan({
            update_type: 'add_friend',
            plan_id: plan_id,
            user_id
        }).then((result)=>{
            dispatch(success(`Update add invitee successfully`));
        }).catch((e)=>{
            dispatch(error("Update add invitee failed"));
        });
        dispatch(added_invitee());
    }

    function added_invitee()
    {
        return {
            type: planConstants.ADD_INVITEE,
            plan_id, user_id
        }
    }
}

function selectOfficialEvent(plan_id, event_id)
{
    return (dispatch) => {
        apiClient.updatePlan({
            update_type: 'manual_trigger',
            plan_id: plan_id,
            event_id
        }).then((result)=>{
            dispatch(success(`Update choose official event successfully`));
        }).catch((e)=>{
            dispatch(error("Update choose official event failed"));
        });
        dispatch(selected_event());
    }

    function selected_event()
    {
        return {
            type: planConstants.SELECT_OFFICIAL_EVENT,
            plan_id, event_id
        }
    }
}

function userVoted(event_id)
{
    return (dispatch) => {
        dispatch(voted())
    }

    function voted(){
        return {
            type: planConstants.USER_VOTED,
            event_id
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