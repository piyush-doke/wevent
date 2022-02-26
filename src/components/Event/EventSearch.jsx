
import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { connect } from 'react-redux';
import {eventActions} from '../../actions';
import { neighborhoods, categories } from '../../utilities/eventmetadata';

const CATEGORIES = categories;
const NEIGHBORHOODS = neighborhoods;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        !personName || personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function EventSearch({  event,
                        changeNeighborhood,
                        changeCategory,
                        changeStart})
{
    const theme = useTheme();
    const [date, setDate] = useState(new Date());
    var neighborhoodOnChange = function(e)
    {
        changeNeighborhood(e.target.value);
    }

    var categoryOnChange = function(e)
    {
        changeCategory(e.target.value);
    }

    var startOnChange = function(newValue)
    {
        // changeStart(Math.floor(newValue.getTime() / 1000));
        changeStart(newValue);
        console.log(newValue instanceof Date);
        setDate(newValue);
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
        <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="neighborhood-input-label">Neighborhood</InputLabel>
                <Select
                    labelId="neighborhood-label"
                    id="neighborhood"
                    value={event.searchEvent.neighborhood}
                    label="neighborhood"
                    onChange={neighborhoodOnChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {
                        NEIGHBORHOODS.map((value,index) => (
                            <MenuItem key={value} name={value} value={value} style={getStyles(event.searchEvent.neighborhood, NEIGHBORHOODS, theme)}>
                                {value}
                            </MenuItem>
                        ))
                    }

                </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="category-input-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={event.searchEvent.category}
                    label="category"
                    onChange={categoryOnChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {
                        CATEGORIES.map((value,index) => (
                            <MenuItem key={value} name={value} value={value} style={getStyles(event.searchEvent.category, CATEGORIES, theme)}>
                                {value}
                            </MenuItem>
                            ))
                    }
                
                </Select>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start Time"
                // views={["year", "month", "date", "hour", "minute"]}
                value={date}
                onChange={startOnChange}
                />
            </LocalizationProvider>
        
        </FormControl>
    </Box>
    </Container>
    )
}

function mapState(state) {
    return {event: state.event};
}
const actionCreators = {
    changeCategory: eventActions.changeCategory,
    changeStart: eventActions.changeStart,
    changeNeighborhood: eventActions.changeNeighborhood
};

const connectedRoomComponent = connect(mapState, actionCreators)(EventSearch);
export { connectedRoomComponent as EventSearch };