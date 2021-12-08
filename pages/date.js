import React, { ReactElement } from "react";
import Theme from "../styles/Theme.module.css";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import PickersDay, {
  PickersDayProps,
  pickersDayClasses
} from "@mui/lab/PickersDay";
import isSameDay from "date-fns/isSameDay";
import { Button } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useRouter } from 'next/router'
import Alert from '@mui/material/Alert';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function DateV2() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [errorDate, setErrorDate] = React.useState(false);
  const [successDate, setSuccessDate] = React.useState(false);

  // const birthday = addDays(new Date(), 3);
  const pickDate = startDate;
  
  const styles1 = {
    backgroundColor:"hsl(51deg 100% 50%)",
    color: "hsl(0deg 9% 41%)"
  };

 

  const highlightedDays= [
    {
      date: pickDate,
      styles: styles1
    },
    {
      date: endDate,
      styles: styles1
    }
  ];

//style of startDate Picking
  const managePickerDayFirst = () => {
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          // ...matchedStyles,
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "hsl(51deg 100% 50%)",
            color: "hsl(0deg 9% 41%)"
          }
        }}
      />
    );
  };

//style of endtDate Picking
  const managePickerDayLast = () => {
    const matchedStyles = highlightedDays.reduce((a, v) => {
      console.log('a', a) //{}
      console.log('v', v) //startDate
      return isSameDay(date, v.date) ? v.styles : a; //วันเดียวกันไหม ถ้าtrue ให้ใช้ styleของ startDate ถ้า falue ให้เป็น {}
    }, {});
  
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          ...matchedStyles,
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "hsl(51deg 100% 50%)",
            color: "hsl(0deg 9% 41%)"
          }
        }}
      />
    );
  };

  const sendDate = () =>{
    console.log(startDate, "to", endDate)
    const date1 = startDate.toLocaleDateString('en-GB')
    const date2 = endDate.toLocaleDateString('en-GB')
    if(date2 > date1){
      console.log('success')
      console.log(date1, 'to', date2)
      setErrorDate(false)
      setSuccessDate(true)
    } else {
      console.log('error:Start Date is Greater than End Date.')
      setErrorDate(true)
      setSuccessDate(false)
    }
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
    <div  className={Theme.centerHorizonal}>
      {errorDate && <Alert severity="error">Start Date is Greater than End Date. Please check your input data </Alert>}
      {successDate && <Alert severity="success">Sent Successfully</Alert>}
      <h1 style={{margin:'0'}}>DateV2</h1>
      <h3 style={{margin:'10px 0 20px 0'}}> without Date Range Picker⚡️</h3>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        // renderDay={managePickerDayFirst}
        renderDay={managePickerDayLast}
        value={startDate}
        onChange={(newValue) => {
          setStartDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="dd/MM/yyyy"
      />
      <h5>To</h5>
      <DatePicker
        disableHighlightToday
        label="End Date"
        renderDay={managePickerDayLast}
        minDate={startDate}
        value={endDate}
        onChange={(newValue) => {
          setEndDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="dd/MM/yyyy"
      />
    </LocalizationProvider>
    <div style={{paddingTop:"20px"}}><Button variant="contained" onClick={sendDate}>Send</Button></div>
    </div>
    </>
  );
}
