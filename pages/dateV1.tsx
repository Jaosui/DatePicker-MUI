import * as React from "react";
import Theme from "../styles/Theme.module.css";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useRouter } from 'next/router'

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const sendDate = () =>{
    console.log(value)
  }

  const router = useRouter()
  const home = () => {
    router.push({
     pathname: '/'
   })
 }

  return (
    <>
    <div style={{margin:'10px 20px', cursor:'pointer'}}>
      <HomeIcon fontSize="large" onClick={home}/>
    </div>
    <div className={Theme.centerHorizonal}>
      <h1 style={{margin:'0'}}>DateV1</h1>
      <h3 style={{margin:'10px 0 20px 0'}}>* Pro component* </h3>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <div style={{paddingTop:"20px"}}><Button variant="contained" onClick={sendDate}>Send</Button></div>
    </div>
    </>
  );
}
