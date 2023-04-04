import {
  Box,
  TextField,
  Link,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Header from "../../components/Header";
import { GetBusiness } from "../../util";
import useMediaQuery from "@mui/material/useMediaQuery";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
let business = GetBusiness();

const ManageTeam = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [position_rows, setPositionRows] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("");
  const getRowId = (row) => row.team_id;
  const getPositionRowId = (row) => row.position_id;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [team_id, setTeamID] = useState("");
  const [user_position, setPosition] = useState("");
  const ProfileClick = useCallback((event, cellValues) => {
    navigate(`/viewteam/${cellValues.row.team_id}`);
  }, []);

  const createNewTeam = async (e) => {
    await Axios.post("http://localhost:3001/newteam", {
      team_id: team_id,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => console.error(error));
  };
  const createNewPosition = async (e) => {
    await Axios.post("http://localhost:3001/newposition", {
      user_position: user_position,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  const DeleteTeam = useCallback((event, cellValues) => {
    //e.preventDefault();
    async function fetchData() {
      Axios.post("http://localhost:3001/deleteteam", {
        team_id: cellValues.row.team_id,
      })
        .then((response) => {
          setStatus(response.data.message);
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, []);
  const DeletePosition = useCallback((event, cellValues) => {
    async function fetchData() {
      //e.preventDefault();
      Axios.post("http://localhost:3001/deleteposition", {
        position_id: cellValues.row.position_id,
      })
        .then((response) => {
          setStatus(response.data.message);
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getteams", {
      business_id: business.m_business_id,
    })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getpositions", {
      business_id: business.m_business_id,
    })
      .then((response) => {
        setPositionRows(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    {
      field: "team_id",
      headerName: "Team ID",
      flex: 1,
      cellClassName: "first-name-column--cell",
    },
    {
      field: "View",
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="secondary"
            onClick={(event) => {
              ProfileClick(event, cellValues);
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        );
      },
    },
    {
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="secondary"
            onClick={(event) => {
              DeleteTeam(event, cellValues);
            }}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];

  const positionColumns = [
    {
      field: "position_id",
      headerName: "Position ID",
      flex: 1,
      cellClassName: "first-name-column--cell",
    },
    {
      field: "user_position",
      headerName: "Position",
      flex: 1,
      cellClassName: "first-name-column--cell",
    },
    {
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="secondary"
            onClick={(event) => {
              DeletePosition(event, cellValues);
            }}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent={"center"}>
        <Box display="grid" justifyContent={"center"}>
          <Box display={"flex"} justifyContent="center">
            <Header title="Manage Teams & Roles!" subtitle="" />
          </Box>
          <Box
            display="grid"
            gap="30px"
            marginLeft={10}
            justifyContent={"center"}
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }} //sx={{ gridColumn: "span 2" }}
          >
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 8" }}
            >
              <h1>{status}</h1>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 1" }}
              className="home-info"
            >
              <h1>Create a new team</h1>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 3" }}
              className="home-info"
            >
              <div>
                <div className="form-box login">
                  <h2>Want to add new team for your business?</h2>
                  <form>
                    <Box display="flex">
                      <Box width={120}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          onChange={(e) => setTeamID(e.target.value)}
                          label="Team ID"
                          name="team_id"
                        />
                      </Box>
                      <Box marginLeft={5} marginTop={1}>
                        <Button
                          type="submit"
                          onClick={createNewTeam}
                          color="secondary"
                          variant="contained"
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              </div>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 1" }}
              className="home-info"
            >
              <h1>Positions.</h1>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 3" }}
              className="home-info"
            >
              <div>
                <div className="form-box login">
                  <h2>Want to add new roles for your business?</h2>
                  <form>
                    <Box display="flex">
                      <Box width={220}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          onChange={(e) => setPosition(e.target.value)}
                          label="Position (e.g. shift manager)"
                          name="user_position"
                        />
                      </Box>
                      <Box marginLeft={5} marginTop={1}>
                        <Button
                          type="submit"
                          onClick={createNewPosition}
                          color="secondary"
                          variant="contained"
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              </div>
            </Box>
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 8" }}
            ></Box>

            <Box
              display="grid"
              sx={{ gridColumn: "span 1" }}
              marginTop={10}
              className="home-info"
            >
              <h1>View all team for current business</h1>
            </Box>
            <Box
              display="flex"
              width={1200}
              justifyContent={"left"}
              sx={{ gridColumn: "span 2" }}
              marginTop={5}
            >
              <Box
                width={270}
                m="40px 0 0 0"
                height="20vh"
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
                <DataGrid
                  rows={rows}
                  columns={columns}
                  autoHeight
                  disableColumnMenu
                  hideFooterSelectedRowCount
                  hideFooterRowCount
                  pageSize={10}
                  getRowId={getRowId}
                />
              </Box>
            </Box>
            <Box sx={{ gridColumn: "span 1" }} marginRight={0}></Box>

            <Box
              display="grid"
              sx={{ gridColumn: "span 1" }}
              marginTop={10}
              className="home-info"
            >
              <h1>View all roles of your business.</h1>
            </Box>
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 3" }}
              marginTop={5}
            >
              <Box
                width={350}
                m="40px 0 0 0"
                height="20vh"
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
                <DataGrid
                  rows={position_rows}
                  columns={positionColumns}
                  autoHeight
                  disableColumnMenu
                  hideFooterSelectedRowCount
                  hideFooterRowCount
                  pageSize={10}
                  getRowId={getPositionRowId}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageTeam;
