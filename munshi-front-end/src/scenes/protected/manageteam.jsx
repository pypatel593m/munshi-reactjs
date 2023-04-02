import { Box, TextField, Link, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { mockDataTeam } from "../../data/mockData";
import Axios from "axios";
import Header from "../../components/Header";
import { GetBusiness } from "../../util";
import useMediaQuery from "@mui/material/useMediaQuery";
let business = GetBusiness();

const ManageTeam = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("");
  const getRowId = (row) => row.team_id;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [team_id, setTeamID] = useState("");
  const [user_position, setPosition] = useState("");
  const ProfileClick = useCallback((event, cellValues) => {
    navigate(`/viewteam/${cellValues.row.team_id}`);
  }, []);

  function createNewTeam() {
    //e.preventDefault();
    Axios.post("http://localhost:3001/newteam", {
      team_id: team_id,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => console.error(error));
  }
  function createNewPosition() {
    //e.preventDefault();
    Axios.post("http://localhost:3001/newposition", {
      user_position: user_position,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/getteams", {
      business_id: business.m_business_id,
    })
      .then((response) => {
        setRows(response.data);
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
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              ProfileClick(event, cellValues);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent={"center"}>
        <Box display="grid" justifyContent={"center"}>
          <Box display={"flex"} justifyContent="center">
            <Header title="Manage Team & Members!" subtitle="" />
          </Box>
          <Box
            display="grid"
            gap="30px"
            marginLeft={40}
            justifyContent={"center"}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }} //sx={{ gridColumn: "span 2" }}
          >
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 4" }}
            >
                <h1>{status}</h1>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 1" }}
              className="home-info"
            >
              <h3 className="hello">Create a new team</h3>
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
                              onChange={(e) => (setTeamID(e.target.value))}
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
              <h3 className="hello">Positions.</h3>
            </Box>
            <Box
              display="flex"
              sx={{ gridColumn: "span 2" }}
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
                              onChange={(e) => (setPosition(e.target.value))}
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
              sx={{ gridColumn: "span 4" }}
            >
            </Box>

            <Box
              display="grid"
              sx={{ gridColumn: "span 1" }}
              marginTop={10}
              className="home-info"
            >
              <h3 className="hello">View all team for current business</h3>
            </Box>
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 2" }}
              marginTop={5}
            >
              <Box
                width={250}
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageTeam;
