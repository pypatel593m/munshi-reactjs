import { Box, Button, TextField, useTheme, Link} from "@mui/material";
import Header  from "../../components/Header";
import Axios from "axios";
import React, { useState}  from 'react';
import {User} from "../../models/users";
import { useNavigate} from 'react-router-dom';
import {SaveUser} from "../../util";
import { Formik } from "formik";
import * as yup from "yup";

import {tokens} from "../../theme";
import { color } from "@mui/system";

const Login = () => {
  const navigate = useNavigate();
  const [user_business_id, setUserBusinessID] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  function handleFormSubmit (values)
  {
    Axios.post("http://localhost:3001/login", {
      user_email_address : values.user_email_address,
      user_password : values.user_password,
      user_business_id : values.user_business_id,

    }).then((response) => {
      if(response.data.message)
      {
        setLoginStatus(response.data.message);
      }
      else
      {
        let loggedUser = new User(response.data[0].user_id, response.data[0].user_email_address, response.data[0].user_password, response.data[0].user_fname, response.data[0].user_lname, response.data[0].user_phone, response.data[0].user_address, response.data[0].user_type_id, values.user_business_id);

        SaveUser(loggedUser);

        navigate('/dashboard');
        window.location.reload();
      }
    });
  } 

    return <Box> 
    
        <Box display="flex" justifyContent={"center"}>
        <h1>{loginStatus}</h1>

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
                
                <div className="wrapper active-btn-login">
                <div className="form-box login">
                <Header title="LOGIN" subtitle="Please log in" />
                <form onSubmit={handleSubmit}>
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
                      value={values.user_password}
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
                  <Box display="flex" justifyContent="end" mt="20px">
                  <h3>Don't have an account? <Link href="./register" color={colors.blueAccent[300]} className="register-link"> Register</Link></h3>
                  </Box>
                  
                </form>
                </div>
                </div>
              )}
            </Formik>
          
        </Box>
    </Box>;
}


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