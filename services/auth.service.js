const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }

        user.comparePassword(password)
          .then(passwordMatch => {
            if (!passwordMatch) {
              return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});



// This will create new user
const createUser = (name, email, password) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const user = new User({
        name: name,
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          console.log("user added");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};


const loginUser = (email, password)=>{
  return User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error('Incorrect email');
      }

      return user.comparePassword(password)
        .then(passwordMatch => {
          if (!passwordMatch) {
            throw new Error('Incorrect password');
          }

          // Additional logic after successful login
        });
    });
}

module.exports = {
  createUser,
};
