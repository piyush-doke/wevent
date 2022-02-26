import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { history } from '../../utilities';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }} >
            <Button variant="contained" onClick={()=>{
              history.push("/createPlan");
              history.go(0);
            }} >Create Plan</Button>
            <Button variant="contained" onClick={()=>{
              history.push("/plans");
              history.go(0);
            }} >Plan Feed</Button> {/* update plan from here */}
            <Button variant="contained" onClick={()=>{
              history.push("/searchEvents");
              history.go(0);
            }} >Search Events</Button>
            {/* <Button variant="contained" onClick={()=>history.push("/")} ><ArrowBackIcon/></Button> */}

        </Box>
      </Container>
    </React.Fragment>
  );
}
