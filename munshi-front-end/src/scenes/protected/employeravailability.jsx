import {
  Box,
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useThemeProps,
} from "@mui/material";
import Header from "../../components/Header";
import {
  getCurrentWeekDates,
  getDayOfWeek,
  getDatesForWeek,
  getNextWeekStartDateAndEndDate,
  getPreviousWeekStartDateAndEndDate,
  GetBusiness,
  convertTo12Hour,
} from "../../util";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const EmployerAvailability = () => {
  const business = GetBusiness();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(getCurrentWeekDates().startOfWeek);
  const [endDate, setEndDate] = useState(getCurrentWeekDates().endOfWeek);
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(getDatesForWeek(startDate, endDate));
  const [showIcons, setShowIcons] = useState(false);

  const [clickedCell, setClickedCell] = useState(null);

  const handleCellClick = (cell) => {
    if (clickedCell === cell) {
      setClickedCell(null); // unselect cell if clicked again
    } else {
      setClickedCell(cell);
    }
  };

  const NextWeekClick = useCallback(
    (e) => {
      const nextWeek = getNextWeekStartDateAndEndDate(startDate, endDate);
      setStartDate(nextWeek.nextWeekStartDate);
      setEndDate(nextWeek.nextWeekEndDate);
      setDate(
        getDatesForWeek(nextWeek.nextWeekStartDate, nextWeek.nextWeekEndDate)
      );
    },
    [startDate, endDate]
  );

  const PreviousWeekClick = useCallback(
    (e) => {
      const previousWeek = getPreviousWeekStartDateAndEndDate(
        startDate,
        endDate
      );
      setStartDate(previousWeek.previousWeekStartDate);
      setEndDate(previousWeek.previousWeekEndDate);
      setDate(
        getDatesForWeek(
          previousWeek.previousWeekStartDate,
          previousWeek.previousWeekEndDate
        )
      );
    },
    [startDate, endDate]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(
          "http://localhost:3001/getemployeravailabilities",
          {
            business_id: business.m_business_id,
          }
        );
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

    const [position, setPosition] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await Axios.post(
            "http://localhost:3001/getavailabletime",
            {
              user_id: user_id,
              available_date: date[day]?.toISOString().substring(0, 10),
              business_id: business.m_business_id,
            }
          );
          if(response?.data?.[0]?.user_position)
          {
            const availableTimeString = response?.data[0]?.available_time_from
              ? `${convertTo12Hour(
                  response.data[0].available_time_from
                )} to ${convertTo12Hour(response.data[0].available_time_till)}`
              : "";
            setData(availableTimeString);
            setPosition(response.data[0].user_position);
          }
          
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [user_id, day, date, business.m_business_id, NextWeekClick, PreviousWeekClick]);

    return (
      <>
        <span style={{ color: "red" }}>
          {position}
          <br />
        </span>
        {data}
      </>
    );
  }
  const deleteAvailability = useCallback((event, item, day) => {
    async function fetchData() {
      //e.preventDefault();
      Axios.post("http://localhost:3001/deleteavailability", {
        user_id: item.user_id,
        available_date: date[day],
        business_id: business.m_business_id,
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AVAILABILITIES" />
      </Box>
      <Box display="flex" justifyContent="end" marginBottom={2}>
        <Button
          onClick={() => {
            navigate("/addemployeeavailability");
          }}
          color="secondary"
          variant="contained"
        >
          Add Availability for yourself
        </Button>
      </Box>
      {/* Week change! */}
      <Box
        marginLeft={5}
        marginBottom={2}
        display={"flex"}
        justifyContent={"center"}
        width={400}
        height={60}
        sx={{
          border: "4px solid teal",
          position: "relative",
          padding: "8px",
          borderRadius: "20px",
        }}
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
        <Box>
          <h1 style={{ margin: 0 }}>
            {startDate.getMonth() + 1}/{startDate.getDate()}/
            {startDate.getFullYear()} &nbsp; to &nbsp; {endDate.getMonth() + 1}/
            {endDate.getDate()}/{endDate.getFullYear()}
          </h1>
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
      <Table border={1} sx={{ borderStyle: "hidden" }}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Employee
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              SUN {date[0].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              MON {date[1].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              TUE {date[2].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              WED {date[3].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              THU {date[4].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              FRI {date[5].getDate()}
            </TableCell>
            <TableCell
              style={{
                width: "100px",
                height: "60px",
                padding: "5px",
                fontSize: 20,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              SAT {date[6].getDate()}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.user_id}>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.user_fname} {item.user_lname}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={0} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 0);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={1} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 1);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={2} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 2);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={3} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 3);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={4} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 4);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={5} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 5);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell
                style={{
                  width: "100px",
                  height: "60px",
                  padding: "5px",
                  fontSize: 15,
                  position: "relative",
                }}
                onClick={() => handleCellClick(item.user_id)}
              >
                <AvailableTime user_id={item.user_id} day={6} />
                {clickedCell === item.user_id && (
                  <div>
                    <IconButton
                      onClick={(event) => {
                        deleteAvailability(event, item, 6);
                      }}
                      className="micro"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EmployerAvailability;
