import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { User } from '../models/user.model';

module.exports = (passport: passport.PassportStatic) => {
    passport.use(
        new LocalStrategy.Strategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email})
              .then(user => {
                if (!user) {
                  return done(null, false, { message: 'This email ID is not registered' });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect! Please try again.' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
};