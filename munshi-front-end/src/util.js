"use strict";
import { loggedUser } from "./scenes/auth/login";
import {Link, useNavigate, useParams, useState, Redirect,Route} from 'react-router-dom';
import React from "react";

const useReactPath = () => {
    const [path, setPath] = React.useState(window.location.pathname);
    const listenToPopstate = () => {
      const winPath = window.location.pathname;
      setPath(winPath);
    };
    React.useEffect(() => {
      window.addEventListener("popstate", listenToPopstate);
      return () => {
        window.removeEventListener("popstate", listenToPopstate);
      };
    }, []);
    return path;
  };

function LoginUser(user)
{
    if(user.m_user_id !== "" && user.m_user_email_address !== "" && user.m_user_password !== "" && user.m_user_fname !== "" && user.m_user_lname !== "" && user.m_user_phone !== "" && user.m_user_address !== "" && user.m_user_type_id !== "" && user.m_user_business_id !== "")
    {
        window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
    }
    console.error("One or more properties of the user Object are missing or invalid");
}

function Logout()
{
    window.sessionStorage.removeItem("user");
}

function CheckLogin()
{
    
    if(window.sessionStorage.getItem("user"))
    {
        return true;
    }
    else
    {
        console.error("Session is empty!");
        return false;
    }
}

function CheckUserType(user)
{
    if(sessionStorage.getItem("user"))
    {
        if(user.m_user_type_id = 1)
        {
            return "employer";
        }
        else
        {
            return "employee";
        }
    }
    else
    {
        return "User not found in session.";
    }
}

export {
    useReactPath,
    LoginUser,
    Logout,
    CheckLogin,
    CheckUserType,
  }