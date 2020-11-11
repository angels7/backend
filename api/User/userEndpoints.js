var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocalSequelize = require("passport-local-sequelize");
var User = require('../database/userCreate');

/*router.post('/signup', (req, res) => {
  User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    passport.authenticate("local")(req, res, function() {
      console.log(req.body)
      res.redirect("http://localhost:3000/login");
    });
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: 'http://localhost:3000/',
  failureRedirect: '/home'
}));*/

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
      if (err) {
          return next(err)
      } else if (!user) { 
          console.log('message: ' + info.message);
          return res.redirect('/login') 
      } else {
          req.logIn(user, function (err) {
              if (err) {
                  return next(err);
              }
              return res.redirect('https://google.com')
          });
      }
  })(req, res, next);
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:3000/login");
}

module.exports = router;