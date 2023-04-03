import { Box, IconButton } from "@mui/material";
import Header from "../../components/Header";
import {
  getCurrentWeekDates,
  getDayOfWeek,
  getNextWeekStartDateAndEndDate, getPreviousWeekStartDateAndEndDate
} from "../../util";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EmployerAvailability = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(getCurrentWeekDates().startOfWeek);
  const [endDate, setEndDate] = useState(getCurrentWeekDates().endOfWeek);

  const NextWeekClick = useCallback((e) => {
    const nextWeek = getNextWeekStartDateAndEndDate(startDate, endDate);
    setStartDate(nextWeek.nextWeekStartDate);
    setEndDate(nextWeek.nextWeekEndDate);
  }, [startDate, endDate]);
  
  const PreviousWeekClick = useCallback((e) => {
    const previousWeek = getPreviousWeekStartDateAndEndDate(startDate, endDate);
    setStartDate(previousWeek.previousWeekStartDate);
    setEndDate(previousWeek.previousWeekEndDate);
  }, [startDate, endDate]);
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AVAILABILITIES" />
      </Box>
      <Box marginLeft={5}
      display={"flex"}
      justifyContent={"center"}
      width={400}
      height={60}

        sx={{ border: "4px solid pink", position: "relative", padding: "8px", borderRadius: '20px'  }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={PreviousWeekClick}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Box >
        <h1 style={{ margin: 0 }}>{startDate.getMonth() + 1}/{startDate.getDate()}/{startDate.getFullYear()} &nbsp; to &nbsp; {endDate.getMonth() + 1}/{endDate.getDate()}/{endDate.getFullYear()}</h1>
        </Box>
        <IconButton
        onClick={NextWeekClick}
          sx={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        
      </Box>
    </Box>
  );
};

export default EmployerAvailability;
