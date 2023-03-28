import {User} from "./models/users";
import { Business } from "./models/businesses";
import Axios from "axios";



/**
 * Logs the user in by saving user info in session storage
 * @param {User} user 
 */
function SaveUser(user)
{
    //window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
    window.sessionStorage.setItem("user", JSON.stringify(user));
}

/**
 * Saves business info to which the logged user is associated with into session storage
 * @param {Business} business 
 */
function SaveBusiness(business)
{
    //window.sessionStorage.setItem("business", `${business.m_business_id},${business.m_business_email_address},${business.m_business_password},${business.m_business_fname},${business.m_business_lname},${business.m_business_phone},${business.m_business_address},${business.m_business_type_id},${business.m_business_business_id}`);
    window.sessionStorage.setItem("business", JSON.stringify(business));
}

/**
 * This function gets the info of the user from session storage
 */
function GetUser()
{
    return JSON.parse(window.sessionStorage.getItem("user"));
}

/**
 * This function gets the info of the business from session storage
 */
function GetBusiness()
{
    return JSON.parse(window.sessionStorage.getItem("business"));
}


/**
 * This method checks wather user is logged in or not
 */
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
    SaveUser,
    GetUser,
    CheckLogin,
    SaveBusiness,
    GetBusiness,
  }