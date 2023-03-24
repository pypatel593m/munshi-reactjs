"use strict";
import {User} from "./models/users";

let loggedUser = User;


function LoginUser(user)
{
    
    if(user.m_user_id !== "" && user.m_user_email_address !== "" && user.m_user_password !== "" && user.m_user_fname !== "" && user.m_user_lname !== "" && user.m_user_phone !== "" && user.m_user_address !== "" && user.m_user_type_id !== "" && user.m_user_business_id !== "")
    {
        loggedUser = new User(user.m_user_id, user.m_user_email_address, user.m_user_password, user.m_user_fname, user.m_user_lname, user.m_user_phone, user.m_user_address, user.m_user_type_id, user.m_user_business_id, user.m_user_logged_in);
        
        window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
    }
    else
    {
        
    console.error("One or more properties of the user Object are missing or invalid");
    }
    console.log(loggedUser.m_user_logged_in);
}

function Logout()
{
    window.sessionStorage.removeItem("user");
}

function CheckLogin()
{
    if (window.sessionStorage.getItem("user"))
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
    LoginUser,
    Logout,
    CheckLogin,
  }