import { Box } from "@mui/material"; 
import Header  from "../../components/Header";
import Axios from "axios";
import React, { useState }  from 'react';
import {User} from "../../models/users";
import {Link, useNavigate, useParams, Redirect,Route} from 'react-router-dom';
import {LoginUser} from "../../util";

export const loggedUser = new User;

const Login = () => {
  
  const navigate = useNavigate();
  const [user_email_address, setEmailAddress] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_business_id, setUserBusinessID] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

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
        loggedUser.m_user_id = response.data[0].user_id;
        loggedUser.m_user_email_address = response.data[0].user_email_address;
        loggedUser.m_user_password = response.data[0].user_password;
        loggedUser.m_user_fname = response.data[0].user_fname;
        loggedUser.m_user_lname = response.data[0].user_lname;
        loggedUser.m_user_phone = response.data[0].user_phone;
        loggedUser.m_user_address = response.data[0].user_address;
        loggedUser.m_user_type_id = response.data[0].user_type_id;
        loggedUser.m_user_business_id = user_business_id; // this is not coming from server side.

        LoginUser(loggedUser);

        navigate('/dashboard');
      }
    });
  } 

    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="" subtitle="" />
                      
        </Box>
        <Box className="loginForm" >
        {/* <form>
          <h1 className="dhruv">{loginStatus}</h1>
          <div className="container">
            <label htmlFor="user_email_address">Email:</label>
            <input type="email" className="textInput" name="user_email_address" onChange={(e) => {setEmailAddress(e.target.value)}} required placeholder="Enter your email"/>
          </div>
          <div className="container">
            <label htmlFor="user_password">Password:</label>
            <input type="password" className="textInput" name="user_password" onChange={(e) => {setPassword(e.target.value)}} required placeholder="Enter your password"/>
          </div>
          <div className="container">
            <label htmlFor="user_business_id">Business ID:</label>
            <input type="number" className="textInput" name="user_business_id" onChange={(e) => {setUserBusinessID(e.target.value)}} required placeholder="Enter your business id."/>
          </div>
          <div className="container">
            <input className="button" type="submit" value="Login" onClick={login}/>
          </div>
          <p>
           Don't have an account? 
            <a href="./register"> Register here.</a>
          </p>
        </form> */}



        <p><h1 className="dhruv">{loginStatus}</h1></p>
        <div className="wrapper active-btn-login">
          <div className="form-box login">
              <h2>Login</h2>
              <form action="#">
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
                      <p>Don't have an account?<a href="./register" className="register-link"> Register</a></p>
                  </div> 
              </form>
          </div>
        </div>

        </Box>
    </Box>;
}

export default Login;





