import passport from 'passport';
import googleOauth from 'passport-google-oauth20';
const GoogleStrategy = googleOauth.Strategy;
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../models/User.js';

passport.serializeUser((user, done) => {
  //send user.id to browser
  done(null, user.id); //go to passport.deserializeUser
});

passport.deserializeUser((id, done) => {
  //authenticate user.id from browser
  User.findById(id).then((user) => {
    done(null, user); // go to routes
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/login/google/redirect',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          console.log('User already exists');
          cb(null, user); //go to passport.serializeUser
        } else {
          new User({
            googleId: profile.id,
            fullname: profile.displayName,
          })
            .save()
            .then((newUser) => {
              console.log('Welcome, New User');
              cb(null, newUser); //go to passport.serializeUser
            });
        }
      });
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      //   console.log('We did it');
    }
  )
);

export default passport;
