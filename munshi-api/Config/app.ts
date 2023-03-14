// import 3rd party modules to support the express server
import createError from 'http-errors';
import express, { NextFunction } from 'express';
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

//Process the register page
app.post("/register", (req, res) => {
  user.EmailAddress = req.body.user_email_address;
  user.Password = req.body.user_password;
  user.FirstName = req.body.user_fname;
  user.LastName = req.body.user_lname;
  user.Phone = req.body.user_phone;
  user.Address = req.body.user_address;
  user.TypeID = req.body.user_type_id;
  user.UserBusinessID = req.body.user_business_id;
  const insertSql = `INSERT INTO users (user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id) VALUES ('${user.EmailAddress}', '${user.Password}', '${user.FirstName}', '${user.LastName}', '${user.Phone}', '${user.Address}', '${user.TypeID}')`;
  const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;

  db.query(businessCheck, (err, result) => 
    {
      
      if(result.rowCount == 1)
      {
        db.query(insertSql, (err, result) => 
        {
          if(result)
          {
            res.send(result);
          }
          else
          {
            res.send({message: "Some required data does not match parameters!"});
          }
        });
      }
      else
      {
        res.send({message: "Business does not exists in database!"});
      }
    });
});


// Default route of the website
app.get("/", async (req, res) => {
  // db.connect();
  // let message = "Hello, World!";
  // let id = 1;
  // // const sqlInsert = "INSERT INTO users (user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id) " +
  // // "VALUES ('janedoe@example.com', 'password', 'Jane', 'Doe', '455-555-666', '123, King St E, On', 2)";
  // const sqlInsert = `SELECT * FROM businesses WHERE business_id = 1`;
  // await db.query(sqlInsert, async (err, result) => {
  //   if (result.rowCount == 0)
  //   {
  //     res.send(result.rows);
  //   }
  //   else
  //   {
  //     res.send("It did not work!");
  //   }
  // });
  res.send("Hello!");
});








// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

export default app;
