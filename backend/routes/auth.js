const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');

router.post("/signup", (req, res, next) => {
  const { fullName, username, password, occupation } = req.body;

  if(fullName == '' || username == '' || password === "" || occupation === null){
    // send error JSON if any of the fields is empty or password doesn't contain a number
    res.status(401).json({ message: "All fields need to be filled." })
    return;
  }

  User.findOne({ username })
  .then(foundUser => {
    if(foundUser !==null){
      res.status(401).json({ message: "A user with the same username is already registered!" })
      return;
    }

    // encrypt the submitted password before saving
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const encryptedPassword = bcrypt.hashSync(password, salt);

      User.create({ fullName, username, encryptedPassword, occupation })
      .then(userDoc => {
        // if all good, log in the user automatically
        // "req.logIn()" is a Passport method that calls "serializeUser()"
        // (that saves the USER ID in the session)
          req.login(userDoc, () => {
            // hide "encryptedPassword" before sending the JSON (it's a security risk)
            userDoc.encryptedPassword = undefined;
            res.json({ userDoc });
          });
      })
      .catch( err => next(err)); //closing User.create()
  })
  .catch( err => next(err)); // closing User.findOne();
})

//-----------Logout-------------

router.delete("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();
  res.status(200).json({ message: 'Log out success!' });

  // send empty "userDoc" when you log out
  res.json({ userDoc: null });
});

// GET "/checkuser" allows the client to check to see:
// (a) if we are logged-in
// (b) what are the details of the logged-in user
router.get("/currentuser", (req, res, next) => {
  if (req.user) {
  // hide "encryptedPassword" before sending the JSON (it's a security risk)
    req.user.encryptedPassword = undefined;
    res.json({ userDoc: req.user });
  }
  else {
    res.json({ userDoc: null });
  }
});


//-----------Login-------------
router.post("/login", (req, res, next) => {
  // LOGIN WITHOUT PASSPORT-LOCAL-STRATEGY:

  const { username, originalPassword } = req.body;
  // search the database for a user with that username
  User.findOne({ username })
  .then(userDoc => {
    // "userDoc" will be empty if the username is wrong
    if (!userDoc) {
      next(new Error("Incorrect username. 🤦‍♂️"));
      return; // use "return" instead of a big else
    }

    // check the password
    const { encryptedPassword } = userDoc;
    // "compareSync()" will return FALSE if "originalPassword" is WRONG
    if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
      next(new Error("Incorrect password. 🤯"));
    }
    else {
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.encryptedPassword = undefined;
        res.json({ userDoc });
      });
    }
  })
  .catch(err => next(err));
})

passport.authenticate('local', (err, userDoc, failureDetails) => {

  if (err) {
    res.status(500).json({ message: 'Something went wrong' })
    return;
  }

  if (!userDoc) {
    res.status(401).json(failureDetails);
    return;
  }

  req.login(userDoc, (err) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong while login!' });
      return;
    }

    // We are now logged in (notice req.user) => we can send req.user since we have it available
    // or userDoc, which is the placeholder how we named the user document we found in DB based on inputted email and password
    // res.json(req.user);
    res.json({ userDoc });
  });
  (req, res, next);
})

module.exports = router;