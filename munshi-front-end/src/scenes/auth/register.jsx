import {Box, Button, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"; 
import React, { useState }  from 'react';
import Header  from "../../components/Header";
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Register = () => {
  
  const navigate = useNavigate();
  
  const [registerStatus, setRegisterStatus] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  function handleFormSubmit(values)
  {
    Axios.post("http://localhost:3001/register", {
      user_email_address : values.user_email_address,
      user_password : values.user_password,
      user_fname : values.user_fname,
      user_lname : values.user_lname,
      user_phone : values.user_phone,
      user_address : values.user_address,
      user_type_id : values.user_type_id,
      user_business_id : values.user_business_id,

    }).then((response) => {
      if(response.data.message)
      {
        
        setRegisterStatus(response.data.message);
      }
      else
      {
        navigate('/login');
      }
    });
  }


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
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Select Type</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={values.user_type_id}
                          name="user_type_id"
                          onChange={handleChange}
                          required
                        >
                          <FormControlLabel value="2" control={<Radio />} label="Employee" />
                          <FormControlLabel value="1" control={<Radio />} label="Employer" />
                        </RadioGroup>
                      </FormControl>
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
        
    </Box>;
}

const nameRegExp = /^[A-Za-z]+$/;

const phoneRegExp =
/^\d{3}-\d{3}-\d{4}$/;

const passwordRegExp =
/^.{8,100}$/;

const emailRegex = 
/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

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
  user_type_id: yup.string().required('Please select user type'),
  user_business_id: yup.string().required("required"),
});
const initialValues = {
  user_fname: "",
  user_lname: "",
  user_email_address: "",
  user_password: "",
  user_phone: "",
  user_address: "",
  user_type_id: "Employee",
  user_business_id: "",
};

export default Register;