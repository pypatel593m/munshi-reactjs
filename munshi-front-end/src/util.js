"use strict";
import {Link, useNavigate, useParams, useState, Redirect,Route} from 'react-router-dom';
import React from "react";
import {User} from "./models/users"

let loggedUser;

function SaveUser(user)
{
    window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
    loggedUser = new User(user.m_user_id, user.m_user_email_address, user.m_user_password, user.m_user_fname, user.m_user_lname, user.m_user_phone, user.m_user_address, user.m_user_type_id, user.m_user_business_id, user.m_user_logged_in);
}

function CheckLogin()
{
    
    if(window.sessionStorage.getItem("user"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export {
    loggedUser,
    SaveUser,
    CheckLogin,
  }