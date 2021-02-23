const express = require("express");
const logger = require("morgan");
const cors = require('cors');
const logs = require('./logs');
const fs = require('fs');

const { userRouter } = require("./routers/user.router");
const { flightRouter } = require("./routers/flight.router");
const { feedbackRouter } = require("./routers/feedback.router");
const { weatherRouter } = require("./routers/weather.router");
const { authRouter  } = require("./routers/auth.router");
const passport = require('passport');
const passportSetup = require("./config/passport-setup");
const cookieSession = require('cookie-session');
const {COOKIE_KEY} = require('./constants')
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8080 

app.use(logger('combined', {
  stream: fs.createWriteStream('./logs.txt', {flags: 'a'})
}));
app.use(logger('dev'));

// app.use(cors())
app.use(cors({
 origin: ['https://opensky01.netlify.app','http://http://localhost:3000'],
  // origin: ["https://opensky01.netlify.app","https://opensky01.netlify.app/#/","http://localhost:3000"],
 methods: ["GET", "PUT", "POST","DELETE", "OPTIONS"],
 credentials: true, 
 preflightContinue: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://opensky01.netlify.app');
    res.header('Access-Control-Allow-Mehods', 'GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS');
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept');
    //res.header('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'application/json');
    next();
});

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [COOKIE_KEY]
}));

app.use(cookieParser());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/weather', weatherRouter);

app.use('/auth', authRouter);

const authCheck = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
  };
  app.get("/", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  });

app.get("/", (req, res) => {
    res.status(200).send(`Welcome to OpenSky`);
});

app.get("*", (req, res) => {
    res.status(404).send(`Page Not Found`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));