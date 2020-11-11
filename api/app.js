const express = require('express');
const app = express();
const port = 4000;
var cors = require('cors');
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocalSequelize = require("passport-local-sequelize");
var User = require('./database/userCreate');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: false
}));
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/*app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
});*/

/*app.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
});*/

app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var userEndpoints = require('./User/userEndpoints');
app.use(userEndpoints);
//app.use(require('cookie-parser')());
/*app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));*/
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});