const db = require("../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
  findAll: function(req, res) {
    db.User.find({}).then(userResults => {
      console.log("The user results: ", userResults);
      const trimmedUsers = userResults.map(user => {
        const { FirstName, LastName, _id } = user;
        return {
          FirstName: FirstName,
          LastName: LastName,
          _id: _id
        };
      });
      console.log("the updated trimmed user:", trimmedUsers);
      res.json(trimmedUsers);
    });
  },

  findOrCreate: function(req, res) {
    // console.log(req);
    //deconstruct the item sent over by the request
    const { Email } = req.body.user;
    //use a unique variable to identify the user, allows them to enter their email or their SocialKey
    // use the variable to check in the database
    db.User.findOne({ Email: Email })
      //see if there is a user with the email or socialkey
      .then(result => {
        console.log("The result is: of the unique check is " + result);
        //if not then we will create a new user using the json object passed through from the req
        if (result === null) {
          console.log(req.body.user);
          const newUser = {
            FirstName: req.body.user.FirstName,
            LastName: req.body.user.LastName,
            SocialKey: req.body.user.SocialKey,
            Email: req.body.user.Email,
            Picture: req.body.user.Picture
          };
          console.log(newUser);
          db.User.create(newUser, function(err, userPostRes) {
            if (err) {
              return console.log(err);
            }
            res.json(userPostRes);
          });
        }
        //otherwise we will update the existing user to get their most recent picture and name.
        else {
          db.User.findByIdAndUpdate(result._id, { $set: req.body })
            .then(updatedUser => res.json("updated user:" + updatedUser))
            .catch(err => res.json("Error at update user:" + err));
        }
      });
  },
  registerFn: (req, res) => {
    db.User.findOne({ Email: req.body.Email }).then(user => {
      if (user) {
        return res.status(400).json({ Email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.Email, {
          s: "200", // size
          r: "pg", // rating
          d: "mm" // default
        });

        const newUser = {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Picture: avatar,
          Password: req.body.Password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.Password, salt, (err, hash) => {
            if (err) throw err;
            // update the password to the super secret one
            newUser.Password = hash;

            db.User.create(newUser, function(err, UserPostRes) {
              if (err) {
                return res.json(err);
              }
              res.json(UserPostRes);
            });
          });
        });
      }
    });
  },
  pwdLogin: (req, res) => {
    const { Email, Password } = req.body;
    console.log(req.body);
    // Find User by email
    db.User.findOne({ Email: Email }).then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ Email: "User not found" });
      }

      // Check Password
      bcrypt.compare(Password, user.Password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user._id }; // Create JWT payload

          //     // sign token
          jwt.sign(	
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user: user
              });
            }
          );
        } else {
          return res.status(400).json({ Password: "Password incorrect" });
        }
      });
    });
  }
};

// // @route  GET api/users/login
// // @desc   Login User / Returning JWT Token
// // @access Public
// router.post("/login", (req, res) => {});

// // @route  GET api/users/current
// // @desc   Return current user
// // @access Private
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );
