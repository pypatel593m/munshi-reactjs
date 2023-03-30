import {
  Box,
  Button,
  TextField,
  Link,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import { GetBusiness, CheckLogin } from "../../util";
let business = GetBusiness();
const UpdateBusiness = () => {
  const navigate = useNavigate();
  
  const [businessStatus, setBusinessStatus] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function handleFormSubmit(values) {
    console.log(values.business_id ,values.business_name, values.business_address, values.business_phone, "Business Info!");
    Axios.post("http://localhost:3001/updatebusiness", {
      business_id: values.business_id,
      business_name: values.business_name,
      business_address: values.business_address,
      business_phone: values.business_phone,
    }).then((response) => {
      if(response.data.message)
      {
        
        setBusinessStatus(response.data.message);
      }
      else
      {
        
        setBusinessStatus(response.data.message);
      }
    });
  }

  return (
    <Box>
      <Box display="flex" justifyContent={"center"}>
        <h1>{businessStatus}</h1>
      </Box>
      <Box display="flex" justifyContent={"center"}>
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
                <Header
                  title="Update Business"
                  subtitle="Want to update anything?"
                />
                <form onSubmit={handleSubmit}>
                  <Box paddingBottom={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Business ID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.business_id}
                      name="business_id"
                      inputProps={
                        { readOnly: true,
                        hidden: true }
                      }
                    />
                    
                  </Box>
                  <Box paddingBottom={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Business Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.business_name}
                      name="business_name"
                      error={!!touched.business_name && !!errors.business_name}
                      helperText={touched.business_name && errors.business_name}
                    />
                  </Box>
                  <Box paddingBottom={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.business_address}
                      name="business_address"
                      error={
                        !!touched.business_address && !!errors.business_address
                      }
                      helperText={
                        touched.business_address && errors.business_address
                      }
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Business Phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.business_phone}
                      name="business_phone"
                      error={
                        !!touched.business_phone && !!errors.business_phone
                      }
                      helperText={
                        touched.business_phone && errors.business_phone
                      }
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Update
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <h3>
                      Want to continue with login?{" "}
                      <Link
                        href="./login"
                        color={colors.blueAccent[300]}
                        className="register-link"
                      >
                        Click Here
                      </Link>
                    </h3>
                  </Box>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
const idRegExp = /^[1-9]\d*$/;

const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;

const RegExp = /^[a-zA-Z0-9 ]+$/;

const twoRegExp = /^[^'"`()\{\}\[\]]+$/;

const checkoutSchema = yup.object().shape({
  business_id: yup
    .string()
    .matches(idRegExp, "Only positive number allowed.")
    .required("required"),
  business_name: yup
    .string()
    .matches(RegExp, "Only alphabets allowed.")
    .required("required"),
  business_address: yup
    .string()
    .matches(twoRegExp, "Invalid special characters used.")
    .required("required"),
  business_phone: yup
    .string()
    .matches(phoneRegExp, "Should follow xxx-xxx-xxxx.")
    .required("required")
});

let initialValues;
if(CheckLogin())
{
  initialValues = {
  
  business_id: business.m_business_id,
  business_name: business.m_business_name,
  business_address: business.m_business_address,
  business_phone: business.m_business_phone,
    };
}
else
{
  initialValues = {
  
    business_id: "",
    business_name: "",
    business_address: "",
    business_phone: "",
    user_address: "",
    };
}

export default UpdateBusiness;
