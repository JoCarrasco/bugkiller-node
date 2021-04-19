import express from "express";
import session from 'express-session';
import path from "path";
import mongoose from "mongoose";
import passport from 'passport';

import { MongoURI } from './config/key';

const app: express.Application = express();

// Connect to MongoDB
mongoose.connect(MongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
  () => { console.log('Connected to MongoDB') },
).catch(err => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// Express Session configuration
app.use(
  session({
    secret: 'nd_buxtracker_secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport configuration 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/', require('./routes/auth'));

export default app;