import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {useState} from "react";
import { mockDataTeam } from "../../data/mockData";
import Axios from "axios";
import Header from "../../components/Header";
import { GetBusiness } from "../../util";
let business = GetBusiness();

function ProfileClick(e, user_id)
{
    Axios.post("http://localhost:3001/userprofile", {
      
    }).then((response) => {
      if(response.data.message)
      {
        
       
      }
      else
      {
        
      }
    });
}

const Team = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("");
  const getRowId = row => row.user_id;
  
  Axios.post("http://localhost:3001/team", {
      business_id : business.m_business_id,
    }).then((response) => {
        console.log(response.data);
        setRows(response.data);
    })
    .catch(error => console.error(error));

  const columns = [
    { field: "user_id", headerName: "User ID" },
    {
        field: "team_id",
        headerName: "Team ID",
        flex: 1,
        cellClassName: "first-name-column--cell",
    },
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
        renderCell: ({rows : user_id}) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={ProfileClick(user_id)}
            >
            Profile
      </Button>
    );
  }
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      
      <Box display="flex" justifyContent={"center"}>
        <h1>{status}</h1>

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
        <DataGrid checkboxSelection rows={rows} getRowId={getRowId} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;