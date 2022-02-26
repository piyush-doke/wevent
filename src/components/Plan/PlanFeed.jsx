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
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {EventForPlanFeed} from '../Event';
import {planActions} from '../../actions';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

function PlanFeed({plan, addInvitee}) {
    var date = new Date(plan.start).toString();
    

    console.log('Plan Feed', plan);
    var user = JSON.parse(localStorage.getItem('user'));
    return plan.host_id == user.email ? (
      <Container maxWidth="80vw">
        <Card sx={{ maxWidth: "70vw", color: "blue", background: "white" }}>
          <CardHeader title={plan.name} subheader={date} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <PeopleIcon />
              {plan.invitees.join(", ")}
            </Typography>

            <Divider light />
            {plan.votes.map((vote) => {
              <EventForPlanFeed
                event={vote.event}
                numVotes={vote.users.length}
              />;
            })}
            <EditIcon
              style={{
                fill: "grey",
              }}
            />
          </CardContent>
        </Card>
      </Container>
    ) : (
      <Container maxWidth="80vw">
        <Card sx={{ maxWidth: "70vw", color: "blue" }}>
          <CardHeader title={plan.name} subheader={date} />
          <CardContent>
            <Typography variant="header1" color="text.primary">
              Hosted By: {plan.host_id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <PeopleIcon />
              {plan.invitees.join(", ")}
            </Typography>

            <Divider light />
            {plan.votes.map((vote) => {
              <EventForPlanFeed
                event={vote.event}
                numVotes={vote.users.length}
              />;
            })}
          </CardContent>
        </Card>
      </Container>
    );  
}

function mapState(state) {
  return {};
 }
 
 const actionCreators = {
   addInvitee: planActions.addInvitee
 };
 
 const connectedComponent = connect(mapState, actionCreators)(PlanFeed);
 export { connectedComponent as PlanFeed };