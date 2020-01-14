const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Validate token middleware
const withAuth = require("../../validateToken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username
        };
        // Sign token
        const token = jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 600000 //
          }
          // (err, token) => {
          //   res.json({
          //     success: true,
          //     token: "Bearer " + token
          //   });
          // }
        );
        const userData = {
          username: user.username,
          email: user.email
        };
        console.log(userData);
        res.cookie("user", userData, {
          expires: new Date(Date.now() + 9000000000),
          httpOnly: true
        });
        //Store the token in a cookie
        res.cookie("token", token).sendStatus(200);

        // res.cookie("userData", userData)
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Dashboard

router.get("/dashboard", withAuth, function(req, res) {
  const username = req.cookies.user.username;
  const email = req.cookies.user.email;
  res.json({ email: email, username: username });
  console.log(req.cookies.token);
  console.log(req.cookies.user);
});

// Check Token
router.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

// Logout
router.get("/logout", function(req, res) {
  console.log(req.cookies.token);
  res.clearCookie("token");
  res.status(200).json('User Logged out')
});

// Get all users

router.get('/userslist', function(req, res, next) {
  User.find(function (err, User) {
    if (err) return next(err);
    res.json(User);
  });
});

// To use the router elsewhere
module.exports = router;
