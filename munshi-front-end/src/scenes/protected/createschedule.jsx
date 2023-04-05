import { Box, Button, TextField, Link, useTheme } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Header from "../../components/Header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetBusiness, CheckLogin, GetUser } from "../../util";
let business = GetBusiness();
let user = GetUser();
const CreateSchedule = () => {
  const navigate = useNavigate();

  const [businessStatus, setBusinessStatus] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleStartTime, setScheduleStartTime] = useState(null);
  const [scheduleEndTime, setScheduleEndTime] = useState(null);
  const [notes, setNotes] = useState("");
  const user_id = window.location.pathname.split("/")[2];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3001/createschedule", {
      user_id: user_id,
      schedule_date: selectedDate.format("YYYY-MM-DD"),
      shift_start_time: scheduleStartTime.format("HH:mm:ss"),
      shift_end_time: scheduleEndTime.format("HH:mm:ss"),
      notes: notes,
      business_id: business.m_business_id,
    }).then((response) => {
      if (response.data.message) {
        setBusinessStatus(response.data.message);
      } else {
        setBusinessStatus(response.data.message);
      }
    });
  }

  return (
    <Box>
      <Box display="flex" justifyContent={"center"}>
        <h1>{businessStatus}</h1>
      </Box>
      <Box display="flex" justifyContent={"center"}>
        <div className="wrapper active-btn-login">
          <div className="form-box login">
            <Header
              title="Create Schedule"
              subtitle="Fill in the information."
            />
            <form onSubmit={handleFormSubmit}>
              <Box paddingBottom={2} width={365}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 365 }}
                    label="Select Date"
                    name="schedule_date"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                    }}
                    format="YYYY-MM-DD"
                    clearable
                    autoOk
                  />
                </LocalizationProvider>
              </Box>
              <Box paddingBottom={2} width={365}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    sx={{ width: 365 }}
                    label="From"
                    name="shift_start_time"
                    format="HH:mm:ss"
                    value={scheduleStartTime}
                    onChange={(newValue) => {
                      setScheduleStartTime(newValue);
                    }}
                    inputVariant="outlined"
                  />
                </LocalizationProvider>
              </Box>
              <Box paddingBottom={2} width={365}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    sx={{ width: 365 }}
                    label="Untill"
                    name="shift_end_time"
                    value={scheduleEndTime}
                    format="HH:mm:ss"
                    onChange={(newValue) => {
                      setScheduleEndTime(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box paddingBottom={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="message"
                  label="Notes"
                  onChange={(e) => (setNotes(e.target.value))}
                  value={notes}
                  name="notes"
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CreateSchedule;
