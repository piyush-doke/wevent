import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {AlertComponent} from '../../components/Alert';
import {EventForPlanFeed} from '../Event';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import { history } from '../../utilities';

// name, start, trigger_option, host_id

function Plan({ activePlan,
                changeTriggerOption,
                changeName,
                changeStart,
                createPlan,
                removeActivePlan,
                addEvents
}) {

  var handleCreatePlan = function (){
    let user_email = JSON.parse(localStorage.getItem("user"))?.email;
    var events = [];
    if(activePlan.votes.length > 0)
    {
      events = activePlan.votes.map(vote=>vote.event);
    }
    createPlan(
      activePlan.name, 
      activePlan.start,
      "manual",
      user_email,
      events);
    
    
  };

  var handleChangeTriggerOption = function (e){
    console.log('trigger change', e.target.value);
    changeTriggerOption(e.target.value);
  };
  var handleChangeName = function (e){
    console.log('name change', e.target.value);
    changeName(e.target.value);
  };
  var handleChangeStart = function (newValue){
    console.log('start change', newValue, newValue instanceof Date);
    changeStart(newValue);
  };

  var handleClear = function (){
    removeActivePlan();
  }

  return (
    <Container maxWidth="80vw">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="name"
          label="Name"
          defaultValue={activePlan.name}
          onChange={handleChangeName}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="start-label"
                value={activePlan.start || new Date()}
                onChange={handleChangeStart}
                />
            </LocalizationProvider>

        {
          activePlan.votes.map(vote=>
            <EventForPlanFeed event={vote.event} users={vote.users}/>
          )
        }

      <Button variant="contained" onClick={()=>{
        history.push("/searchEvents");
        history.go(0);
      }} >Add Event</Button>
      <Button variant="contained" onClick={handleCreatePlan} >Create Plan</Button>
      <Button variant="contained" onClick={handleClear} >Clear</Button>
      <AlertComponent/>
      </div>
      
    </Box>
    </Container>
  );
}

function mapState(state) {
  return {activePlan: state.plan.activePlan};
 }


 const actionCreators = {
  createPlan: planActions.createPlan,
  changeTriggerOption: planActions.changeTriggerOption,
  changeName: planActions.changeName,
  changeStart: planActions.changeStart,
  removeActivePlan: planActions.removeActivePlan,
  addEvents: planActions.addEvents
 };
 
 const connectedRoomComponent = connect(mapState, actionCreators)(Plan);
 export { connectedRoomComponent as PlanForm };