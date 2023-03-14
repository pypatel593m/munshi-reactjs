import express, {Request, Response, NextFunction } from 'express';

// Get Pages

export function GetLoginPage(req: Request, res: Response, next: NextFunction): void
{
    // passport.authenticate('local', (err, user, info) => {
    //     // are there serer errors?
    //     if (err) {
    //       console.error(err);
    //       return res.end(err);
    //     }

    //     // are there login errors?
    //     if (!user) {
    //       return res.json({ success: false, msg: 'ERROR: Authentication Failure' });
    //     }

    //     req.logIn(user, function (err) {
    //       // are there db errors?
    //       if (err) {
    //         console.error(err);
    //         return res.end(err);
    //       }

    //       const authToken = GenerateToken(user);
    //       return res.json({
    //         success: true, msg: 'User Logged In Successfully!', user: {
    //           id: user._id,
    //           DisplayName: user.DisplayName,
    //           username: user.username,
    //           EmailAddress: user.EmailAddress
    //         }, token: authToken
    //       });
    //     });

      //   return;
      // })(req, res, next);
}

export function GetRegisterPage(req: Request, res: Response, next: NextFunction): void
{
  //   // instantiate a new user object
  // let newUser = new User
  // ({
  //   username: req.body.username,
  //   EmailAddress: req.body.emailAddress,
  //   DisplayName: req.body.firstName + " " + req.body.lastName
  // });

  // User.register(newUser, req.body.password, (err) => {
  //     if (err) {
  //       if (err.name == "UserExistsError") {
  //         console.error('ERROR: Inserting User');
  //         console.error('ERROR: User Already Exists');
  //       }
  //       console.error(err.name);
  //       return res.json({ success: false, msg: 'ERROR: Registration Failure' });
  //     }

  //     return res.json({ success: true, msg: 'User Registered Successfully!' });
  //     // automatically login the user
  //     /* return passport.authenticate('local')(req, res, ()=>
  //     {
  //       return res.redirect('/contact-list');
  //     }); */
  //   });
}