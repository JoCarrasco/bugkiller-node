import passport from 'passport';
import nodemailer from 'nodemailer';
import { User } from '../models/user.model';

export const LoginHandler = (req: any, res: any, next: any) => {
  passport.authenticate('local', {
    successMessage: 'Logged successfully'
  })(req, res, next);
}

export const RegisterHandler = (req: any, res: any) => {
  const { name, email, password } = req.body;
  let errors: { msg: string }[] = [];

  //------------ Checking required fields ------------//
  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //------------ Checking password length ------------//
  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password });
  } else {
      //------------ Validation passed ------------//
      User.findOne({ email: email }).then(async (user: any) => {
          if (user) {
              //------------ User already exists ------------//
            errors.push({ msg: 'Email ID already registered' });
            res.send('register', { errors, name,email, password });
          } else {
            const newUser = await User.create({
              name,
              email,
              password
            });
  
            newUser.save().then(() => {
              res.send('Registered');
              console.log('USER REGISTERED');
            }).catch((e) => console.error(e));
          }
      });
  }
}
