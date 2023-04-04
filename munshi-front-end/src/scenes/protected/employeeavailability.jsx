import { Box, Link, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useCallback} from "react";
import Axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Header from "../../components/Header";
import {
  getCurrentWeekDates,
  getDayOfWeek, getDatesForWeek,
  getNextWeekStartDateAndEndDate, getPreviousWeekStartDateAndEndDate, GetBusiness, GetUser
} from "../../util";
let business = GetBusiness();
let user = GetUser();

const EmployeeAvailability = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("");
  const getRowId = row => row.availability_id;
  
  const ProfileClick = useCallback((event, cellValues) => {
    navigate(`/userprofile/${cellValues.row.user_id}`);
  }, []);

  const [startDate, setStartDate] = useState(getCurrentWeekDates().startOfWeek);
  const [endDate, setEndDate] = useState(getCurrentWeekDates().endOfWeek);
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
      await Axios.post("http://localhost:3001/getemployeeavailability", {
      startDate: startDate,
      endDate: endDate,
      user_id: user.m_user_id,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error(error));
    }
    fetchData();
    
  }, [NextWeekClick, PreviousWeekClick]); 

  

  

  const columns = [
    {
        field: "availability_id",
        headerName: "Availability Id",
        flex: 1,
        cellClassName: "first-name-column--cell",
    },
    {
        field: "available_date",
        headerName: "Date",
        flex: 1,
        cellClassName: "last-name-column--cell",
    },
    {
        field: "available_time_from",
        headerName: "From",
        flex: 1,
        cellClassName: "last-name-column--cell",
    },
    {
      field: "available_time_till",
      headerName: "Untill",
      flex: 1,
      cellClassName: "last-name-column--cell",
    },
    {
      field: "notes",
      headerName: "Any Requests?",
      flex: 1,
      cellClassName: "last-name-column--cell",
    },
    {
        field: "Profile",
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => {
                ProfileClick(event, cellValues);
              }}
            >
            Profile
      </Button>
    );
  }
    },
  ];

  return (
    <Box m="20px">
      <Header title="AVAILABILITIES" subtitle="Managing your availabilities." />
      
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
      <Box display="flex" justifyContent="start" mt="20px">
        <Button onClick={()=>{navigate("/addemployeeavailability")}} color="secondary" variant="contained">
          Add Availability
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} getRowId={getRowId} columns={columns} checkboxSelection={false} />
      </Box>
    </Box>
  );
};

export default EmployeeAvailability;