import express from 'express';
import { authRoute } from './routes/auth.js';
import { homeRoute } from './routes/home.js';
import 'dotenv/config.js';
import './config/passport-setup.js';
import './config/mongodb-setup.js';
import passport from 'passport';
import session from 'express-session';

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/auth', authRoute);
app.use('/', homeRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
