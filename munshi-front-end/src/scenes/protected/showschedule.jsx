import Header from "../../components/Header";
import { CheckLogin, GetUser } from "../../util";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

let User = GetUser();

const ShowAvailability = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [registerStatus, setRegisterStatus] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const user_id = window.location.pathname.split("/")[2];
  const [rows, setRows] = useState([]);
  
  const schedule_date = window.location.pathname.split("/")[3];
  const business_id = window.location.pathname.split("/")[4];
  useEffect(() => {
    console.log(user_id, schedule_date, business_id);
    Axios.post("http://localhost:3001/showschedule", {
      user_id: user_id,
      schedule_date: schedule_date,
      business_id: business_id,
    })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent={"center"}>
        <Box
          display="grid"
          gap="30px"
          marginLeft={10}
          justifyContent={"center"}
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }} //sx={{ gridColumn: "span 2" }}
        >
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>Schedule ID:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].schedule_id}</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>User ID:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].user_id}</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>Date:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].schedule_date}</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>From:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].shift_start_time}</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>Untill:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].shift_end_time}</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>Requests/Notes:</h1>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
                <h1>{rows[0].notes}</h1>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowAvailability;
