import * as React from 'react';
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
import Grid from '@mui/material/Grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {eventActions} from '../../actions';
import { connect } from 'react-redux';


function EventFeed({event, selectEvent}) {
  var handleSelect = function (e){
    selectEvent(event.event_id);
    console.log(event, event.selected);    
  };
 
  return (
    <Grid fixed maxWidth="sm">
    <Card sx={{ maxWidth: '70vw', m: 3 }}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings" onClick={handleSelect}>
            {event.selected? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/>}
          </IconButton>
        }
        title={event.event_name}
      />
      <CardMedia
        component="img"
        height="194"
        image={event.img_url}
        alt={event.name}
      />
      <CardContent>
      <Typography variant="subtitle" color="text.primary">
          Venue:
          </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.venue_name}
          </Typography>
        <Typography variant="subtitle" color="text.primary">
          Description:
          </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="subtitle" color="text.primary">
          Start:
          </Typography>
        <Typography variant="body2" color="text.secondary">        
          <AccessTimeIcon/> {event.start}
        </Typography>
        <Typography variant="subtitle" color="text.primary">
          Location:
          </Typography>
        <Typography variant="body2" color="text.secondary">        
          <LocationOnIcon/> {event.full_address}
        </Typography>
        
      </CardContent>
      
    </Card>
    </Grid>
  );
}

// pass eventState to force re-render

function mapState(state) {
  return {};
}
const actionCreators = {
  selectEvent: eventActions.selectEvent
};

const connectedRoomComponent = connect(mapState, actionCreators)(EventFeed);
export { connectedRoomComponent as EventFeed };
