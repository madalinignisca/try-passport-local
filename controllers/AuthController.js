var mongoose = require("mongoose");
var passport = require("passport");
var Account = require("../models/account");

var userController = {
  // Restrict access to root page
  home: function(req, res) {
    res.render('index', { user: req.user });
  },

  // Go to registration page
  register: function(req, res) {
    res.render('register');
  },

  // Post registration
  doRegister: function(req, res) {
    Account.register(
      new Account(
        { username: req.body.username }
      ),
      req.body.password,
      function(err, account) {
        if (err) {
          return res.render('register', { error: err.message });
        }

        passport.authenticate('local')(req, res, function() {
          res.redirect('/');
        });
      }
    );
  },

  // Get login
  login: function(req, res) {
    res.render('login');
  },

  // Post login
  doLogin: function(req, res) {
    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
      });
      res.redirect('/');
    })
  },

  // logout
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

module.exports = userController;
