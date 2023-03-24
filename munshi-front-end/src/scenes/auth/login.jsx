import { Box, Button, TextField, useTheme, Select, MenuItem } from "@mui/material";
import Header  from "../../components/Header";
import Axios from "axios";
import React, { useState, useContext, useEffect }  from 'react';
import {User} from "../../models/users";
import {Link, useNavigate, useParams, Redirect,Route} from 'react-router-dom';
import {SaveUser} from "../../util";
import { ColorModeContext, tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
  const navigate = useNavigate();
  const [user_email_address, setEmailAddress] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_business_id, setUserBusinessID] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const theme = useTheme();

  const handleSelectChange = (event) => {
    setUserBusinessID(event.target.value);
  };

  const login = (e) => 
  {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      user_email_address : user_email_address,
      user_password : user_password,
      user_business_id : user_business_id,

    }).then((response) => {
      if(response.data.message)
      {
        setLoginStatus(response.data.message);
      }
      else
      {
        let loggedUser = new User(response.data[0].user_id, response.data[0].user_email_address, response.data[0].user_password, response.data[0].user_fname, response.data[0].user_lname, response.data[0].user_phone, response.data[0].user_address, response.data[0].user_type_id, user_business_id, true);
        // loggedUser.m_user_id = response.data[0].user_id;
        // loggedUser.m_user_email_address = response.data[0].user_email_address;
        // loggedUser.m_user_password = response.data[0].user_password;
        // loggedUser.m_user_fname = response.data[0].user_fname;
        // loggedUser.m_user_lname = response.data[0].user_lname;
        // loggedUser.m_user_phone = response.data[0].user_phone;
        // loggedUser.m_user_address = response.data[0].user_address;
        // loggedUser.m_user_type_id = response.data[0].user_type_id;
        // loggedUser.m_user_business_id = user_business_id; // this is not coming from server side.

        SaveUser(loggedUser);

        navigate('/dashboard');
        window.location.reload();
      }
    });
  } 

  const isNonMobile = useMediaQuery("(min-width:600px)");

    return <Box> 
        <Box  sx={{ gridColumn: "span 5" }}>
          
          <Formik
              onSubmit={login}
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
                
                <div className="wrapper active-btn-login">
                <div className="form-box login">
                <Header title="LOGIN" subtitle="Please log in" />
                <form onSubmit={login}>
                <Box paddingBottom={3}>
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
                    />
                    </Box>
                    <Box paddingBottom={3}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="user_password"
                      error={!!touched.user_password && !!errors.user_password}
                      helperText={touched.user_password && errors.user_password}
                    />
                    </Box >
                    <Box paddingBottom={3}>
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
                    />
                    
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Login
                    </Button>
                  </Box>
                </form>
                </div>
                </div>
              )}
            </Formik>
          
        </Box>

        
        <Box className="loginForm">
        {/* <div className="errorMessage">
        <h1>{loginStatus}</h1>
        </div>
        <div className="wrapper active-btn-login">
          <div className="form-box login">
              <h2>Login</h2>
              <form>
                  <div className="input-box">
                      <span className="icon"><ion-icon name="mail"></ion-icon></span>
                      <input type="email" className="textInput" name="user_email_address" onChange={(e) => {setEmailAddress(e.target.value)}} required />
                      <label>Email</label>
                  </div>
                  <div className="input-box">
                      <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                      <input type="password" className="textInput" name="user_password" onChange={(e) => {setPassword(e.target.value)}} required />
                      <label>Password </label>
                  </div>
                  <div className="input-box">
                      <span className="icon"><ion-icon name="mail"></ion-icon></span>
                      <input type="number" className="textInput" name="user_business_id" onChange={(e) => {setUserBusinessID(e.target.value)}} required />
                      <label>Business ID</label>
                  </div>
                  <div className="remember-forgot">
                      <label><input type="checkbox" />Remember Me</label>
                  </div>
                  <button className="btn" type="submit" value="Login" onClick={login}>Login</button>
                  <div className="login-register">
                      <h3>Don't have an account? <a href="./register" className="register-link"> Register</a></h3>
                  </div> 
              </form>
          </div>
        </div> */}
        </Box>
    </Box>;
}

const phoneRegExp =
/^\d{3}-\d{3}-\d{4}$/;

const passwordRegExp =
/^.{8,100}$/;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const checkoutSchema = yup.object().shape({
  user_email_address:  yup
  .string()
  .matches(emailRegex, "Invalid email.")
  .required("required"),
  user_password: yup
  .string()
  .matches(passwordRegExp, "Password should be between 8 to 100 characters")
  .required("required"),
  user_business_id: yup.string().required("required"),
});
const initialValues = {
  user_email_address: "",
  user_password: "",
  user_business_id: "",
};



export default Login;