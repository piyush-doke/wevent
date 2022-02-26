import * as React from 'react';
import Alert from '@mui/material/Alert';
import { connect } from 'react-redux';
import {alertActions} from '../../actions';


function AlertComponent({alert, changeMessage}){
    return (
        (alert.message.length > 0) && <Alert onClose={() => {changeMessage("")}} severity={alert.serverity}>{alert.message}</Alert>
    )
}

function mapState(state) {
    return {alert: state.alert};
}
const actionCreators = {
    changeMessage: alertActions.changeMessage
};

const connectedComponent = connect(mapState, actionCreators)(AlertComponent);
export { connectedComponent as AlertComponent };