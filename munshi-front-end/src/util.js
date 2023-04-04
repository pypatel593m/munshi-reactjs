import { User } from "./models/users";
import { Business } from "./models/businesses";

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

  return {
    startOfWeek: startOfWeek,
    endOfWeek: endOfWeek
  };
}

/**
 * This method will give next week start and end date based on current week start and end date
 * @param {Date} currentWeekStartDate 
 * @param {Date} currentWeekEndDate 
 * @returns 
 */
function getNextWeekStartDateAndEndDate(currentWeekStartDate, currentWeekEndDate) {
  const nextWeekStartDate = new Date(currentWeekStartDate);
  const nextWeekEndDate = new Date(currentWeekEndDate);
  

  // Subtract 7 days from the current week start and end dates to get the previous week start and end dates
  nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
  nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 7);

  // Return the start and end dates of the previous week in the same format
  return {
    nextWeekStartDate: new Date(nextWeekStartDate.getFullYear(), nextWeekStartDate.getMonth(), nextWeekStartDate.getDate()),
    nextWeekEndDate: new Date(nextWeekEndDate.getFullYear(), nextWeekEndDate.getMonth(), nextWeekEndDate.getDate())
  };
}

/**
 * This method will give previous week start and end date based on current week start and end date
 */
function getPreviousWeekStartDateAndEndDate(currentWeekStartDate, currentWeekEndDate) {
  // Create new date objects for the current week start and end dates
  const previousWeekStartDate = new Date(currentWeekStartDate);
  const previousWeekEndDate = new Date(currentWeekEndDate);

  // Subtract 7 days from the current week start and end dates to get the previous week start and end dates
  previousWeekStartDate.setDate(previousWeekStartDate.getDate() - 7);
  previousWeekEndDate.setDate(previousWeekEndDate.getDate() - 7);

  // Return the start and end dates of the previous week in the same format
  return {
    previousWeekStartDate: new Date(previousWeekStartDate.getFullYear(), previousWeekStartDate.getMonth(), previousWeekStartDate.getDate()),
    previousWeekEndDate: new Date(previousWeekEndDate.getFullYear(), previousWeekEndDate.getMonth(), previousWeekEndDate.getDate())
  };
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

function getDatesForWeek(weekStartDate, weekEndDate) {
  const dates = [];

  // Create a new date object for the week start date
  let currentDate = new Date(weekStartDate);

  // Loop until we've added all the days in the week
  while (currentDate <= weekEndDate) {
    // Add the current date to the dates array
    dates.push(new Date(currentDate));

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export { SaveUser, GetUser, CheckLogin, SaveBusiness, GetBusiness, IsEmployer, getCurrentWeekDates, getDayOfWeek, 
  getNextWeekStartDateAndEndDate, getPreviousWeekStartDateAndEndDate, getDatesForWeek};
