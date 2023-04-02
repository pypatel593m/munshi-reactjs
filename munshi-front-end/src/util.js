import { User } from "./models/users";
import { Business } from "./models/businesses";
import Axios from "axios";

/**
 * Logs the user in by saving user info in session storage
 * @param {User} user
 */
function SaveUser(user) {
  //window.sessionStorage.setItem("user", `${user.m_user_id},${user.m_user_email_address},${user.m_user_password},${user.m_user_fname},${user.m_user_lname},${user.m_user_phone},${user.m_user_address},${user.m_user_type_id},${user.m_user_business_id}`);
  window.sessionStorage.setItem("user", JSON.stringify(user));
}

/**
 * Saves business info to which the logged user is associated with into session storage
 * @param {Business} business
 */
function SaveBusiness(business) {
  //window.sessionStorage.setItem("business", `${business.m_business_id},${business.m_business_email_address},${business.m_business_password},${business.m_business_fname},${business.m_business_lname},${business.m_business_phone},${business.m_business_address},${business.m_business_type_id},${business.m_business_business_id}`);

  window.sessionStorage.setItem("business", JSON.stringify(business));
}

/**
 * This function gets the info of the user from session storage
 */
function GetUser() {
  return JSON.parse(window.sessionStorage.getItem("user"));
}

/**
 * This function gets the info of the business from session storage
 */
function GetBusiness() {
  return JSON.parse(window.sessionStorage.getItem("business"));
}

/**
 * This method checks wather user is logged in or not
 */
function CheckLogin() {
  if (window.sessionStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
}

/**
 * This function gives the type of logged user
 */
function IsEmployer() {
  let user;
  if (CheckLogin()) {
    user = GetUser();
    if (user.m_user_type_id === "1" || user.m_user_type_id === 1) {
      return "employer";
    } else if (user.m_user_type_id === "2" || user.m_user_type_id === 2) {
      return "employee";
    }
  }
}

/**
 * This method gets the start and end day of the current week
 * @returns { startOfWeek, endOfWeek }
 */
function getCurrentWeekDates() {
  const now = new Date();
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const endOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 6
  );

  return { startOfWeek, endOfWeek };
}

/**
 * This function returns the day based on the date
 * @param {*} dateString 
 * @returns dayOfWeek
 */
function getDayOfWeek(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];

  return dayOfWeek;
}

export { SaveUser, GetUser, CheckLogin, SaveBusiness, GetBusiness, IsEmployer, getCurrentWeekDates, getDayOfWeek };
