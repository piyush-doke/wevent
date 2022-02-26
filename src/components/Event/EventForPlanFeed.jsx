import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {planActions, alertActions} from '../../actions';
import { connect } from 'react-redux';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function EventForPlanFeed({event, users, activePlan, vote, selectOfficialEvent, changeMessage}) {

    var colors = ['green', 'black'];
    // var user_id = localStorage.getItem('user')?.email;
    var updateVote = function()
    {
        //TODO we need to not hard code this when login is implemented
        console.log('updating vote', activePlan, event, user_id, event.event_id, activePlan.plan_id, localStorage.getItem('user'));
        var user = JSON.parse(localStorage.getItem('user'));
        console.log(user.email, user, typeof user);
        var user_id = user.email;
        if(!user_id || !activePlan.plan_id) return;
        vote(activePlan.plan_id, event.event_id, user_id);
        updateLikes()
        // assume current user is 1
        // window.setInterval(()=>setVoteColor(1-voteColor), 1000);
    }

    var updateOfficialEvent = function()
    {
      var user = JSON.parse(localStorage.getItem('user'));
      var user_id = user.email;
      if(activePlan.host_id === user_id){
        selectOfficialEvent(activePlan.plan_id, event.event_id);
      }
      else{
        changeMessage(`Only owner ${activePlan.host_id} can choose the official event for this plan`, "error");
      }
      
    }
    var checkUserVoted = function()
    {
      var activeVote = activePlan.votes.filter(v=>v.event.event_id == event.event_id);
      console.log('checkUserVoted', activeVote);
      if(activeVote.length == 0) return false;
      activeVote = activeVote[0];
      return activeVote.users.includes(JSON.parse(localStorage.getItem('user')).email)
    }

    const [userliked, setUserliked] = useState(checkUserVoted())    
    const [likecount, setLikecount] = useState(users.length)

    const updateLikes = () => {
        if (userliked) {
            setLikecount(likecount - 1)            
            setUserliked(false)
        }
        else {
            setLikecount(likecount + 1)
            setUserliked(true)
            //increment
        return
    } 
  } 

  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: "100%", flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={event.img_url} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {event.event_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <AccessTimeIcon /> {event.start} - {event.end}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <LocationOnIcon /> {event.full_address}
              </Typography>
              <IconButton aria-label="Vote for this event" onClick={updateVote}>
                <Typography variant="body2" gutterBottom>
                  <ThumbUpAltIcon
                    style={{ fill: checkUserVoted() ? "green" : "grey" }}
                  />{" "}
                  {likecount}
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Choose this event for this plan"
              onClick={updateOfficialEvent}
            >
              <StarIcon
                style={{
                  fill:
                    activePlan.selected_event &&
                    activePlan.selected_event === event.event_id
                      ? "green"
                      : "grey",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}


function mapState(state) {

    return {activePlan: state.plan.activePlan};
  }
  const actionCreators = {
    vote: planActions.vote,
    selectOfficialEvent: planActions.selectOfficialEvent,
    changeMessage: alertActions.changeMessage
  };
  
  const connectedRoomComponent = connect(mapState, actionCreators)(EventForPlanFeed);
  
  export { connectedRoomComponent as EventForPlanFeed };