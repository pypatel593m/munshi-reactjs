import { Box, IconButton, Button, Table, TableHead, TableRow, TableCell, TableBody, useThemeProps} from "@mui/material";
import Header from "../../components/Header";
import {
  getCurrentWeekDates,
  getDayOfWeek,
  getDatesForWeek,
  getNextWeekStartDateAndEndDate,
  getPreviousWeekStartDateAndEndDate,
  GetBusiness,
  convertTo12Hour
} from "../../util";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EmployerAvailability = () => {
  const business = GetBusiness();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(getCurrentWeekDates().startOfWeek);
  const [endDate, setEndDate] = useState(getCurrentWeekDates().endOfWeek);
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(getDatesForWeek(startDate, endDate));

  const NextWeekClick = useCallback((e) => {
    const nextWeek = getNextWeekStartDateAndEndDate(startDate, endDate);
    setStartDate(nextWeek.nextWeekStartDate);
    setEndDate(nextWeek.nextWeekEndDate);
    setDate(getDatesForWeek(nextWeek.nextWeekStartDate, nextWeek.nextWeekEndDate));
  }, [startDate, endDate]);
  
  const PreviousWeekClick = useCallback((e) => {
    const previousWeek = getPreviousWeekStartDateAndEndDate(startDate, endDate);
    setStartDate(previousWeek.previousWeekStartDate);
    setEndDate(previousWeek.previousWeekEndDate);
    setDate(getDatesForWeek(previousWeek.previousWeekStartDate, previousWeek.previousWeekEndDate));
  }, [startDate, endDate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post("http://localhost:3001/getemployeravailabilities", {
          business_id: business.m_business_id,
        });
        setRows(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [NextWeekClick, PreviousWeekClick]); 

  function AvailableTime(props) {
    const { user_id, day } = props;
    const [data, setData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await Axios.post("http://localhost:3001/getavailabletime", {
            user_id: user_id,
            available_date: date[day]?.toISOString().substring(0, 10),
            business_id: business.m_business_id,
          });
          const from = convertTo12Hour(response.data[0].available_time_from);
          const till = convertTo12Hour(response.data[0].available_time_till);
          const availableTimeString = response?.data[0]?.available_time_from 
            ? `${from} to ${till}`
            : '';
          setData(availableTimeString);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [user_id, day, date, business.m_business_id]);
  
    return <>{data}</>;
  }

  
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AVAILABILITIES" />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px" marginBottom={2}>
        <Button onClick={()=>{navigate("/addemployeeavailability")}} color="secondary" variant="contained">
          Add Availability for yourself
        </Button>
      </Box>
      {/* Week change! */}
      <Box marginLeft={5}
      marginBottom={2}
      display={"flex"}
      justifyContent={"center"}
      width={400}
      height={60}

        sx={{ border: "4px solid teal", position: "relative", padding: "8px", borderRadius: '20px'  }}
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

      {/* Main Table */}
      <Table border={1} sx={{borderStyle: "hidden"}}>
      <TableHead>
        <TableRow >
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal" }}>Employee</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>SUN {date[0].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>MON {date[1].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>TUE {date[2].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>WED {date[3].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>THU {date[4].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>FRI {date[5].getDate()}</TableCell>
          <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20, fontWeight: "bold", color: "teal"  }}>SAT {date[6].getDate()}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { rows.map((item) => (
                <TableRow key={item.user_id}>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 20,  fontWeight: "bold" }}>{item.user_fname} {item.user_lname}</TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={0}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={1}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={2}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={3}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={4}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={5}/></TableCell>
              <TableCell style={{ width: '100px', height: '60px', padding: '5px', fontSize: 15 }}><AvailableTime user_id={item.user_id} day={6}/></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </Box>
  );
};

export default EmployerAvailability;

