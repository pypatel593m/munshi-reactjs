// import 3rd party modules to support the express server
import createError from 'http-errors';
import express from 'express';
import path from 'path';

// module for connecting to database
import pg from 'pg';


import cors from 'cors';

// import a user Model
import {User} from '../Models/user';
const user = new User;

// Making instance of express app
const app = express();
// setup cors
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));


// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

// add middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../node_modules')));


// Making the connection to the database
export const db = new pg.Client({
  host: "127.0.0.1",
  user: "patelp",
  port: 5432,
  password: "password",
  database: "munshidb"
});
db.connect();

//Process the login page
app.post("/login", (req, res) => {
  user.EmailAddress = req.body.user_email_address;
  user.Password = req.body.user_password;
  user.UserBusinessID = req.body.user_business_id;
  const loginSql = `SELECT * FROM users WHERE user_email_address = '${user.EmailAddress}' AND user_password = '${user.Password}'`;
  const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;

  db.query(businessCheck, (err, result) => 
    {
      
      if(result.rowCount == 1)
      {
        db.query(loginSql, (err, result) => 
          {
            if(err)
            {
              //req.setEncoding({err: Error});
              console.log(err.message);
            }
            else
            {
              if(result.rowCount > 0)
              {
                res.send(result.rows);
              }
              else
              {
                res.send({message: "User credentials does not match!"});
              }
            }
          });
      }
      else
      {
        res.send({message: "Business does not exists in database!"});
      }
    });
});

// Method for adding new user
app.post("/register", (req, res) => {
  user.EmailAddress = req.body.user_email_address;
  user.Password = req.body.user_password;
  user.FirstName = req.body.user_fname;
  user.LastName = req.body.user_lname;
  user.Phone = req.body.user_phone;
  user.Address = req.body.user_address;
  user.TypeID = req.body.user_type_id;
  user.UserBusinessID = req.body.user_business_id;
  const insertSql = `INSERT INTO users (user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id) VALUES ('${user.EmailAddress}', '${user.Password}', '${user.FirstName}', '${user.LastName}', '${user.Phone}', '${user.Address}', ${user.TypeID})`;
  const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;
  db.query(businessCheck, (err, result) => {
    if (result.rowCount == 1) {
      db.query(insertSql, (err, result) => {
        if (result) {
          res.send(result);
        } else {
          res.send({
            message:
              "Some required data does not match parameters! Or User already exists",
          });
        }
      });
    } else {
      res.send({ message: "Business does not exists in database!" });
    }
  });
});

// Method to add new business
app.post("/business", (req, res) => {
  let business_id = req.body.business_id;
  let business_name = req.body.business_name;
  let business_address = req.body.business_address;
  let business_phone = req.body.business_phone;
  const insertSql = `INSERT INTO businesses VALUES (${business_id}, '${business_name}', '${business_address}', '${business_phone}');`;

  db.query(insertSql, (err, result) => {
    if (result) {
      res.send({ message: "Business registered successfully!" });
    } else {
      res.send({
        message: "Invalid data or business id already taken!",
      });
    }
  });
});

//Method to update business info
app.post("/updatebusiness", (req, res) => {
  let business_id = req.body.business_id;
  let business_name = req.body.business_name;
  let business_address = req.body.business_address;
  let business_phone = req.body.business_phone;
  const insertSql = `UPDATE businesses SET business_name = '${business_name}', business_address = '${business_address}', business_phone = '${business_phone}' WHERE business_id = ${business_id};`;

  db.query(insertSql, (err, result) => {
    if (result) {
      res.send({ message: "Business info updated successfully!" });
    } else {
      res.send({
        message: "Invalid data or business id!",
      });
    }
  });
});

// Method to update user profile
app.post("/profile", (req, res) => {
  user.ID = req.body.user_id;
  user.EmailAddress = req.body.user_email_address;
  user.Password = req.body.user_password;
  user.FirstName = req.body.user_fname;
  user.LastName = req.body.user_lname;
  user.Phone = req.body.user_phone;
  user.Address = req.body.user_address;
  user.TypeID = req.body.user_type_id;
  user.UserBusinessID = req.body.user_business_id;
  const insertSql = `UPDATE users SET user_email_address = '${user.EmailAddress}', user_password = '${user.Password}', user_fname = '${user.FirstName}', user_lname = '${user.LastName}', user_phone = '${user.Phone}', user_address = '${user.Address}', user_type_id = ${user.TypeID} WHERE user_id = ${user.ID};`;
  const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;
  db.query(businessCheck, (err, result) => {
    if (result.rowCount == 1) {
      db.query(insertSql, (err, result) => {
        if (result) {
          res.send(result);
        } else {
          console.log(err.message);
          res.send({
            message:
              "Some required data does not match parameters! Or User already exists",
          });
        }
      });
    } else {
      res.send({ message: "Business does not exists in database!" });
    }
  });
});

// Method to get the business based on business_id
app.post("/getbusiness", (req, res) => {
  let business_id = req.body.business_id;
  const businessCheck = `SELECT * FROM businesses WHERE business_id = ${business_id}`;
  db.query(businessCheck, (err, result) => {
    if (result.rowCount > 0) {
      res.send(result.rows);
    } else {
      res.send({ message: "Business does not exists in database!" });
    }
  });
});

// Method to get team data from different tables
app.post("/team", (req, res) => {
  let business_id = req.body.business_id;
  const businessCheck = `SELECT * FROM get_team_data(${business_id});`;
  db.query(businessCheck, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to get team members for specific team
app.post("/teammembers", (req, res) => {
  let team_id = req.body.team_id;
  let business_id = req.body.business_id;
  const businessCheck = `SELECT * FROM get_team_members(${team_id},${business_id});`;
  db.query(businessCheck, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to get all teams from one business
app.post("/getteams", (req, res) => {
  let business_id = req.body.business_id;
  const businessCheck = `SELECT * FROM teams WHERE business_id = ${business_id};`;
  db.query(businessCheck, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to get perticular user profile
app.post("/userprofile", (req, res) => {
  let user_id = req.body.user_id;
  const userCheck = `SELECT * FROM users WHERE user_id = ${user_id};`;
  db.query(userCheck, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to add new team to specific business
app.post("/newteam", (req, res) => {
  let team_id = req.body.team_id;
  let business_id = req.body.business_id;
  const insertTeam = `INSERT INTO teams (team_id, business_id)
  VALUES (${team_id}, ${business_id});;`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send({ message: "Team added!"});
    } else {
      res.send({ message: "Team id already taken!" + err.message });
    }
  });
});

//Method to add new position for specific business
app.post("/newposition", (req, res) => {
  let user_position = req.body.user_position;
  let business_id = req.body.business_id;
  const insertTeam = `INSERT INTO positions (user_position, business_id)
  VALUES ('${user_position}', ${business_id});`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send({ message: "Position added!"});
    } else {
      res.send({ message: "Invalid length of position!"});
    }
  });
});


// Methos to get positions for specific business
app.post("/getpositions", (req, res) => {
  let business_id = req.body.business_id;
  const businessCheck = `SELECT * FROM positions WHERE business_id = ${business_id};`;
  db.query(businessCheck, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to delete the team
app.post("/deleteteam", (req, res) => {

  let team_id = req.body.team_id;
  const deleteTeam = `DELETE FROM teams WHERE team_id = ${team_id};`;
  db.query(deleteTeam, (err, result) => {
    if (result) {
      res.send({ message: "Team removed!"});
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to delete the position
app.post("/deleteposition", (req, res) => {

  let position_id = req.body.position_id;
  const deletePosition = `DELETE FROM positions WHERE position_id = ${position_id};`;
  db.query(deletePosition, (err, result) => {
    if (result) {
      res.send({ message: "Role removed!"});
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

// Method to add user into perticular team
app.post("/adduser", (req, res) => {
  let user_email_address = req.body.user_email_address;
  let team_id = req.body.team_id;
  let position_id = req.body.position_id;
  let wage = req.body.wage;
  const insertTeam = `SELECT add_user_to_team('${user_email_address}', ${team_id}, ${position_id}, '${wage}');`;
  
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send({ message: `User added to the team  ${team_id}!`});
    } else {
      res.send({ message: `User already exists in the team!`});
    }
  });
});

app.post("/getemployeravailabilities", (req, res) => {
  let business_id = req.body.business_id;
  const insertTeam = `SELECT * FROM get_user_business(${business_id});`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
});
app.post("/getemployeeavailability", (req, res) => {
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let user_id = req.body.user_id;
  let business_id = req.body.business_id;
  const insertTeam = `SELECT availability_id, TO_CHAR(available_date, 'YYYY-MM-DD') as available_date, available_time_from, available_time_till, notes, business_id FROM availabilities WHERE available_date >= '${startDate}' AND available_date <= '${endDate}' AND user_id = ${user_id} AND business_id = ${business_id};`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/getavailabletime", (req, res) => {
  let user_id = req.body.user_id;
  let available_date = req.body.available_date;
  let business_id = req.body.business_id;
  const insertTeam = `SELECT * FROM get_available_time(${user_id}, '${available_date}',${business_id});`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

//This method adds new availability for employee
app.post("/addemployeeavailability", (req, res) => {
  let user_id = req.body.user_id;
  let available_date = req.body.available_date;
  let available_time_from = req.body.available_time_from;
  let available_time_till = req.body.available_time_till;
  let notes = req.body.notes;
  let business_id = req.body.business_id;
  const insertTeam = `INSERT INTO availabilities (user_id, available_date, available_time_from, available_time_till, notes, business_id)
  VALUES (${user_id}, '${available_date}', '${available_time_from}', '${available_time_till}', '${notes}', ${business_id});`;
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send({ message: "Availability added!"});
    } else {
      res.send({ message: "Invalid data!"});
    }
  });
});

app.post("/deleteavailability", (req, res) => {

  let user_id = req.body.user_id;
  let available_date = req.body.available_date;
  let business_id = req.body.business_id;
  const deletePosition = `DELETE FROM availabilities WHERE user_id = ${user_id} AND available_date = '${available_date}' AND business_id = ${business_id};`;
  db.query(deletePosition, (err, result) => {
    if (result) {
      res.send({ message: "Availability removed!"});
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

app.post("/getavailability", (req, res) => {

  let user_id = req.body.user_id;
  let available_date = req.body.available_date;
  let business_id = req.body.business_id;
  const deletePosition = `SELECT * FROM availabilities WHERE user_id = ${user_id} AND available_date = '${available_date}' AND business_id = ${business_id};`;
  
  db.query(deletePosition, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});

app.post("/getschedule", (req, res) => {
  let user_id = req.body.user_id;
  let schedule_date = req.body.schedule_date;
  let business_id = req.body.business_id;
  const insertTeam = `SELECT * FROM get_schedule(${user_id}, '${schedule_date}',${business_id});`;
  
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

app.post("/showschedule", (req, res) => {
  let user_id = req.body.user_id;
  let schedule_date = req.body.schedule_date;
  let business_id = req.body.business_id;
  const insertTeam = `SELECT * FROM schedules WHERE user_id = ${user_id} AND schedule_date = '${schedule_date}' AND business_id = ${business_id};`;
  
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});


app.post("/deleteschedule", (req, res) => {

  let user_id = req.body.user_id;
  let schedule_date = req.body.schedule_date;
  let business_id = req.body.business_id;
  const deletePosition = `DELETE FROM schedules WHERE user_id = ${user_id} AND schedule_date = '${schedule_date}' AND business_id = ${business_id};`;
  db.query(deletePosition, (err, result) => {
    if (result) {
      res.send({ message: "Availability removed!"});
    } else {
      res.send({ message: "Something went wrong!" + err.message });
    }
  });
});


//This method adds new availability for employee
app.post("/createschedule", (req, res) => {
  let user_id = req.body.user_id;
  let schedule_date = req.body.schedule_date;
  let shift_start_time = req.body.shift_start_time;
  let shift_end_time = req.body.shift_end_time;
  let notes = req.body.notes;
  let business_id = req.body.business_id;
  const insertTeam = `INSERT INTO schedules (schedule_date, shift_start_time, shift_end_time, notes, user_id, business_id)
  VALUES ('${schedule_date}', '${shift_start_time}', '${shift_end_time}', '${notes}', ${user_id}, ${business_id});`;
  
  db.query(insertTeam, (err, result) => {
    if (result) {
      res.send({ message: "Schedule added!"});
    } else {
      res.send({ message: "Invalid data!"});
    }
  });
});



// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});




// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

export default app;
