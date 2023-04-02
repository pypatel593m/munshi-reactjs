import { Box, TextField, Link, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useParams } from "react";
import { mockDataTeam } from "../../data/mockData";
import Axios from "axios";
import Header from "../../components/Header";
import { GetBusiness } from "../../util";
import useMediaQuery from "@mui/material/useMediaQuery";
let business = GetBusiness();

const ViewTeam = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("");
  const getRowId = (row) => row.user_id;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const newId = window.location.pathname.split("/")[2];
  const ProfileClick = useCallback((event, cellValues) => {
    navigate(`/userprofile/${cellValues.row.user_id}`);
  }, []);

  const TeamClick = useCallback((event, cellValues) => {
    navigate(`/userprofile/${cellValues.row.team_id}`);
  }, []);


  useEffect(() => {
    Axios.post("http://localhost:3001/teammembers", {
      team_id: newId,
      business_id: business.m_business_id,
    })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error(error));
  }, []); 

  const columns = [
    { field: "user_id", headerName: "User ID" },
    {
      field: "user_fname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "first-name-column--cell",
    },
    {
        field: "user_lname",
        headerName: "Last Name",
        flex: 1,
        cellClassName: "last-name-column--cell",
    },
    {
        field: "user_position",
        headerName: "Role",
        flex: 1,
        cellClassName: "last-name-column--cell",
    },
    {
        field: "wage",
        headerName: "Wage / hr",
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

            <Box
              display="grid"
              sx={{ gridColumn: "span 1" }}
              marginTop={10}
              className="home-info"
            >
              <h3 className="hello">Team members from team {newId}.</h3>
            </Box>
            <Box
              display="flex"
              justifyContent={"left"}
              sx={{ gridColumn: "span 2" }}
              marginTop={5}
              marginLeft={15}
            >
              <Box
                width={1000}
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
  );
};

export default ViewTeam;
