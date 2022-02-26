import { combineReducers } from 'redux';
import {event} from './event.reducer';
import {plan} from './plan.reducer';
import {alert} from './alert.reducer';

export default combineReducers({
    event,
    plan,
    alert
})