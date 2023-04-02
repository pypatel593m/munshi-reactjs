import { Box, TextField, Link, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useParams } from "react";
import { mockDataTeam } from "../../data/mockData";
import { Formik } from "formik";
import Axios from "axios";
import * as yup from "yup";
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
  const [user_email_address, setEmailID] = useState("");
  const [position_id, setPositionID] = useState("");
  const [wage, setWage] = useState("");
  const getRowId = (row) => row.user_id;
  const team_id = window.location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const ProfileClick = useCallback((event, cellValues) => {
    navigate(`/userprofile/${cellValues.row.user_id}`);
  }, []);
  function AddUser() {
    Axios.post("http://localhost:3001/adduser", {
      user_email_address: user_email_address,
      team_id: team_id,
      position_id: position_id,
      wage: wage,
    })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/teammembers", {
      team_id: team_id,
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
      },
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="grid"
        gap="70px"
        marginLeft={5}
        gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(1, minmax(0, 1fr))"
          sx={{ gridColumn: "span 2" }}
        >
          <Box m="90px 0 0 0" paddingBottom={-60} sx={{ gridColumn: "span 1" }}>
            <h1>Add Employee to team {team_id}.</h1>
          </Box>
          <Box marginLeft={5} sx={{ gridColumn: "span 1" }}>
            <Formik
              onSubmit={AddUser}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form>
                  <Box
                    display="grid"
                    justifyContent={"center"}
                    width={200}
                    gap="10px"
                    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 1",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.user_email_address}
                      label="Employee's Email"
                      name="user_email_address"
                      sx={{ gridColumn: "span 2" }}
                      error={!!touched.user_email_address && !!errors.user_email_address}
                      helperText={touched.user_email_address && errors.user_email_address}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.position_id}
                      label="Select Position"
                      name="position_id"
                      sx={{ gridColumn: "span 2" }}
                      error={!!touched.position_id && !!errors.position_id}
                      helperText={touched.position_id && errors.position_id}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.wage}
                      label="Wage / hr"
                      name="wage"
                      sx={{ gridColumn: "span 2" }}
                      error={!!touched.wage && !!errors.wage}
                      helperText={touched.wage && errors.wage}
                    />
                    <Box marginLeft={8} sx={{ gridColumn: "span 2" }}>
                      <Button
                        type="submit"
                        onClick={AddUser}
                        color="secondary"
                        variant="contained"
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>

        <Box
          display="grid"
          sx={{ gridColumn: "span 4" }}
          marginTop={10}
          className="home-info"
        >
          <Box sx={{ gridColumn: "span 1" }}>
            <h3 className="hello">Team members from team {team_id}.</h3>
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
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
              <DataGrid
                rows={rows}
                getRowId={getRowId}
                columns={columns}
                checkboxSelection={false}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const wageRegExp = /^[a-zA-Z0-9 ]+$/;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const RegExp = /^[0-9]{1,19}(\.[0-9]{1,2})?$/;


const checkoutSchema = yup.object().shape({
  user_email_address: yup
    .string()
    .matches(emailRegex, "Invalid email.")
    .required("required"),
  position_id: yup
    .string()
    .matches(RegExp, "Only alphabets allowed.")
    .required("required"),
  wage: yup
    .string()
    .matches(wageRegExp, "Invalid wage.")
    .required("required")
});

const initialValues = {
  user_email_address: "",
  position_id: "",
  wage: "",
};

export default ViewTeam;
