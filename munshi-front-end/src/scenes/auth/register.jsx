import {Box, Button, TextField, useTheme, Select, MenuItem, Autocomplete } from "@mui/material"; 
import React, { useState, useRef }  from 'react';
import Header  from "../../components/Header";
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import {User} from "../../models/users";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "@mui/system";

const Register = () => {
  
  const navigate = useNavigate();
  const [user_email_address, setEmailAddress] = useState("");
  const [user_password, setPassword] = useState(""); 
  const [user_fname, setFirstName] = useState("");
  const [user_lname, setLastName] = useState("");
  const [user_phone, setPhone] = useState("");
  const [user_address, setAddress] = useState("");
  const [user_type_id, setTypeID] = useState("1");
  const [user_business_id, setUserBusinessID] = useState("");
  
  const [registerStatus, setRegisterStatus] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const autocompleteRef = useRef();

  function handleFormSubmit(values)
  {
    const selectedValue = values.user_type_id;
    console.log(selectedValue);
    console.log("Valuesssssssss", values.user_email_address, values.user_password, values.user_fname, values.user_lname, values.user_phone, values.user_address, values.user_type_id, values.user_business_id);

    // Axios.post("http://localhost:3001/register", {
    //   user_email_address : values.user_email_address,
    //   user_password : values.user_password,
    //   user_fname : values.user_fname,
    //   user_lname : values.user_lname,
    //   user_phone : values.user_phone,
    //   user_address : values.user_address,
    //   user_type_id : values.user_type_id,
    //   user_business_id : values.user_business_id,

    // }).then((response) => {
    //   if(response.data.message)
    //   {
    //     navigate("/login");
    //   }
    //   else
    //   {
    //     setRegisterStatus(response.data.message)
    //   }
    // });
  }

  const handleSelectChange = (event) => {
    setTypeID(event.target.value);
  };
  const options = ['Employee', 'Employer'];

    return <Box m="20px">
        <Box display="flex" justifyContent={"center"}>
        <h1>{registerStatus}</h1>

        </Box>
        <Box  display="flex" justifyContent={"center"}>
          <Formik
              onSubmit={handleFormSubmit}
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
                
                <div>
                <div className="form-box login">
                <Header title="REGISTER" subtitle="Please enter user detail" />
                <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_fname}
                    name="user_fname"
                    error={!!touched.user_fname && !!errors.user_fname}
                    helperText={touched.user_fname && errors.user_fname}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_lname}
                    name="user_lname"
                    error={!!touched.user_lname && !!errors.user_lname}
                    helperText={touched.user_lname && errors.user_lname}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_email_address}
                    name="user_email_address"
                    error={!!touched.user_email_address && !!errors.user_email_address}
                    helperText={touched.user_email_address && errors.user_email_address}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_password}
                    name="user_password"
                    error={!!touched.user_password && !!errors.user_password}
                    helperText={touched.user_password && errors.user_password}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number (xxx-xxx-xxxx)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_phone}
                    name="user_phone"
                    error={!!touched.user_phone && !!errors.user_phone}
                    helperText={touched.user_phone && errors.user_phone}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_address}
                    name="user_address"
                    error={!!touched.user_address && !!errors.user_address}
                    helperText={touched.user_address && errors.user_address}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Business ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_business_id}
                    name="user_business_id"
                    error={!!touched.user_business_id && !!errors.user_business_id}
                    helperText={touched.user_business_id && errors.user_business_id}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Select value={user_type_id} name="user_type_id" onChange={handleSelectChange}
                     sx={{ gridColumn: "span 2" }} required>
                    <MenuItem value="1">Employee</MenuItem>
                    <MenuItem value="2">Employer</MenuItem>
                  </Select>
                  {/* <Autocomplete
                    disablePortal
                    name="user_type_id"
                    options={options}
                    sx={{ gridColumn: "span 2" }} ref={autocompleteRef}
                    renderInput={(params) => <TextField {...params} label="User Type" />}
                  /> */}
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Register
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                  <h3>Already have an account? <a href="./login" className="register-link"> Login</a></h3>
                  </Box>
                </Box>
                
                  
                </form>
                </div>
                </div>
              )}
            </Formik>
        </Box>
        
        <Box className="loginForm">
        {/* <form>
        <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}} >{registerStatus}</h1>
          <div className="container">
            <label htmlFor="user_email_address">Email:</label>
            <input type="email" className="textInput" name="user_email_address" onChange={(e) => {setEmailAddress(e.target.value)}} required placeholder="Enter your email"/>
          </div>
          <div className="container">
            <label htmlFor="user_password">Password:</label>
            <input type="password" className="textInput" name="user_password" onChange={(e) => {setPassword(e.target.value)}} required placeholder="Enter your password"/>
          </div>
          <div className="container">
            <label htmlFor="user_fname">First Name:</label>
            <input type="text" className="textInput" name="user_fname" onChange={(e) => {setFirstName(e.target.value)}} required placeholder="Enter your first name"/>
          </div>
          <div className="container">
            <label htmlFor="user_lname">Last Name:</label>
            <input type="text" className="textInput" name="user_lname" onChange={(e) => {setLastName(e.target.value)}} required placeholder="Enter your last name"/>
          </div>
          <div className="container">
            <label htmlFor="user_phone">Phone:</label>
            <input type="text" className="textInput" name="user_phone" onChange={(e) => {setPhone(e.target.value)}} required placeholder="Enter your phone number"/>
          </div>
          <div className="container">
            <label htmlFor="user_address">Address:</label>
            <input type="text" className="textInput" name="user_address" onChange={(e) => {setAddress(e.target.value)}} required placeholder="Enter your address"/>
          </div>
          <div className="container">
            <label htmlFor="user_type_id">Select user type</label>
            <select id="user_type_id" onChange={(e) => {setTypeID(e.target.value)}} name="user_type_id">
              <option value="1">Employer</option>
              <option value="2">Employee</option>
            </select>
          </div>
          <div className="container">
            <label htmlFor="user_business_id">Business ID:</label>
            <input type="number" className="textInput" name="user_business_id" onChange={(e) => {setUserBusinessID(e.target.value)}} required placeholder="Enter your business id."/>
          </div>
          <div className="container">
            <input className="button" type="submit" value="Register" onClick={handleRegister}/>
          </div>
          <p>
            Already have an account? 
            <a href="./login"> Sign in</a>
          </p>
        </form> */}
        </Box>
    </Box>;
}

const nameRegExp = /^[A-Za-z]+$/;

const phoneRegExp =
/^\d{3}-\d{3}-\d{4}$/;

const passwordRegExp =
/^.{8,100}$/;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const checkoutSchema = yup.object().shape({

  user_fname:  yup
  .string()
  .matches(nameRegExp, "Invalid First Name.")
  .required("required"),
  user_lname:  yup
  .string()
  .matches(nameRegExp, "Invalid Last Name.")
  .required("required"),
  user_email_address:  yup
  .string()
  .matches(emailRegex, "Invalid email.")
  .required("required"),
  user_password: yup
  .string()
  .matches(passwordRegExp, "Password should be between 8 to 100 characters")
  .required("required"),
  user_phone:  yup
  .string()
  .matches(phoneRegExp, "Invalid Phone Number.")
  .required("required"),
  user_address: yup.string().required("required"),
  user_type_id: yup.string().required("required"),
  user_business_id: yup.string().required("required"),
});
const initialValues = {
  user_fname: "",
  user_lname: "",
  user_email_address: "",
  user_password: "",
  user_phone: "",
  user_address: "",
  user_business_id: "",
};

export default Register;