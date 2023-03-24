import { Box } from "@mui/material"; 
import React, { useState }  from 'react';
import Header  from "../../components/Header";
import Axios from "axios";
import {Link, useNavigate, useParams, Redirect,Route} from 'react-router-dom';

const Register = () => {
  
  const navigate = useNavigate();
  const [user_email_address, setEmailAddress] = useState("");
  const [user_password, setPassword] = useState(""); 
  const [user_fname, setFirstName] = useState("");
  const [user_lname, setLastName] = useState("");
  const [user_phone, setPhone] = useState("");
  const [user_address, setAddress] = useState("");
  const [user_type_id, setTypeID] = useState("");
  const [user_business_id, setUserBusinessID] = useState("");
  
  const [registerStatus, setRegisterStatus] = useState("");

  const handleRegister = (e) => 
  {
    e.preventDefault();

    console.log(user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id, user_business_id);

    Axios.post("http://localhost:3001/register", {
      user_email_address : user_email_address,
      user_password : user_password,
      user_fname : user_fname,
      user_lname : user_lname,
      user_phone : user_phone,
      user_address : user_address,
      user_type_id : user_type_id,
      user_business_id : user_business_id,

    }).then((response) => {
      if(response.data.message)
      {
        navigate("/login");
      }
      else
      {
        setRegisterStatus(response.data.message)
      }
    });
  }

    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="REGISTER" subtitle="Please fill in the user data!"/>
        </Box>
        
        <Box className="loginForm">
        <form>
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
        </form>
        </Box>
    </Box>;
}

export default Register;