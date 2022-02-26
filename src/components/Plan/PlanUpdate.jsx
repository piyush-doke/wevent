import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {AlertComponent} from '../../components/Alert';
import { connect } from 'react-redux';
import {planActions} from '../../actions';
import {EventForPlanFeed} from '../Event';
import { history } from '../../utilities';

function Plan({ plan, addInvitee }) {
  console.log("hello world", plan.name, plan);
  var date = new Date(plan.start).toString();
  const [inviteeText, setInviteeText] = useState("");
  const inviteeOnChange = (e) => {
    setInviteeText(e.target.value);
  };

  var handleAddInvitee = function () {
    addInvitee(plan.plan_id, inviteeText);
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  var user = JSON.parse(localStorage.getItem('user'));     
  return plan.host_id == user.email ? (
    <Container maxWidth="80vw">
      <Card sx={{ maxWidth: "70vw" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={plan.name}
          subheader={date}
        />
        <CardContent>
        
          <List sx={style} primary="HI" component="nav" aria-label="mailbox folders">
            <Typography variant="h6" component="div">
              Invitees:
            </Typography>
            {plan.invitees.map((user_id, i) => {              
              return (
              <ListItem key={i} button>
                <ListItemText primary={user_id} />
              </ListItem>
              )
            })}
          </List>
          <TextField
            id="filled-basic"
            label="User Email Address"
            variant="filled"
            onChange={inviteeOnChange}
          />
          <Button variant="contained" onClick={handleAddInvitee}>
            Invite User
          </Button>
          <Divider light />
          {plan.votes.map((vote) => (
            <EventForPlanFeed
              event={vote.event}
              users={vote.users}
              key={vote.event.event_id}
            />
          ))}
          <Button
            variant="contained"
            onClick={() => history.push("/searchEvents")}
          >
            Add Event
          </Button>
        </CardContent>

        {/* <Button variant="contained" onClick={()=>history.push("/searchEvents")} >Add Event</Button> */}
      </Card>
    </Container>
  ) : (
    <Container maxWidth="80vw">
      <Card sx={{ maxWidth: "70vw" }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={plan.name}
          subheader={date}
        />
        <CardContent>
        
          <List sx={style} primary="HI" component="nav" aria-label="mailbox folders">
            <Typography variant="h6" component="div">
              Invitees:
            </Typography>
            {plan.invitees.map((user_id, i) => {              
              return (
              <ListItem key={i} button>
                <ListItemText primary={user_id} />
              </ListItem>
              )
            })}
          </List>         
          {plan.votes.map((vote) => (
            <EventForPlanFeed
              event={vote.event}
              users={vote.users}
              key={vote.event.event_id}
            />
          ))}    
        </CardContent>

        {/* <Button variant="contained" onClick={()=>history.push("/searchEvents")} >Add Event</Button> */}
      </Card>
      <AlertComponent/>
    </Container>
  )
}

function mapState(state) {
 return {plan: state.plan.activePlan};
}

const actionCreators = {
  addInvitee: planActions.addInvitee
};

const connectedComponent = connect(mapState, actionCreators)(Plan);
export { connectedComponent as PlanUpdate };