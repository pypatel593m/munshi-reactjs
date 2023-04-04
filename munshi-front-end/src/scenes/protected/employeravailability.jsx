import { Box, IconButton, Table, TableHead, TableRow, TableCell, TableBody, useThemeProps} from "@mui/material";
import Header from "../../components/Header";
import {
  getCurrentWeekDates,
  getDayOfWeek, getDatesForWeek,
  getNextWeekStartDateAndEndDate, getPreviousWeekStartDateAndEndDate, GetBusiness
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
  const [rows2, setRows2] = useState([]);
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

  

  useEffect( () => {
    async function wrapper(){
      await Axios.post("http://localhost:3001/getavailabilities", {
      business_id: business.m_business_id,
    })
      .then((response) => {
        
        setRows(response.data);
      })
      .catch((error) => console.error(error));
    };
    wrapper();
  }, []); 

  function AvailableTime(props) {
    const { user_id, day } = props;
    const [data, setData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        const response = await Axios.post("http://localhost:3001/getavailabletime", {
            user_id: user_id,
            available_date: date[day].toISOString().substring(0, 10),
            business_id: business.m_business_id,
          })
            .then((response) => {
              const availableTimeString = `${response.data[0].user_position} -- ${response.data[0].available_time_from} to ${response.data[0].available_time_till}`;
              setData(availableTimeString);
            })
            .catch((error) => console.error(error));
      }
      fetchData();
    }, [user_id, day]);
  
    return (
      <>{data}</>
    );
  }

  
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AVAILABILITIES" />
      </Box>

      {/* Week change! */}
      <Box marginLeft={5}
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
      <Table >
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
        { rows2 && rows.map((item) => (
                <TableRow key={item.user_id}>
              <TableCell>{item.user_fname} {item.user_lname}</TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={0}/></TableCell>
              <TableCell>Hello, hello<AvailableTime user_id={item.user_id} day={1}/></TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={2}/></TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={3}/></TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={4}/></TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={5}/></TableCell>
              <TableCell><AvailableTime user_id={item.user_id} day={6}/></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </Box>
  );
};

export default EmployerAvailability;

