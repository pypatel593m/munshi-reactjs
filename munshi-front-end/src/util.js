import {User} from "./models/users"

let loggedUser;

function SaveUser(user)
{
    loggedUser = new User(user.m_user_id, user.m_user_email_address, user.m_user_password, user.m_user_fname, user.m_user_lname, user.m_user_phone, user.m_user_address, user.m_user_type_id, user.m_user_business_id);
    
    //window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
    window.sessionStorage.setItem("user", JSON.stringify(loggedUser));
}

function GetUser()
{
    return JSON.parse(window.sessionStorage.getItem("user"));
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
    GetUser,
    CheckLogin,
  }