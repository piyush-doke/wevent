import {alertConstants} from '../constants';

export const alertActions = {
    changeMessage
  };

function changeMessage(message, serverity = "error")
{
    return dispatch =>{
        dispatch(changed())
    }

    function changed(){
        return {
            type: alertConstants.CHANGE_MESSAGE,
            message, serverity
        }
    }
}