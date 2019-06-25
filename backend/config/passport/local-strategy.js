const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

passport.use(new LocalStrategy({
  username: 'username', 
  password:'originalPassword'
},(username, password, next) => {
  User.findOne({ username })
  .then(username => {
    if(!username){
      return next(null, false, { message: 'Incorrect username!' })
    }

    // when we added the social logins, not all the users in the DB have 'password' field
    // because that is not required for social logins
    // so if the user has the password, it means they use local strategy when login
    if(username.encryptedPassword){
      if(!bcrypt.compareSync(password, username.encryptedPassword)){
        return next(null, false, { message: 'Incorrect password!' })
      }
    } 
    return next(null, username)
  })
  .catch( err => next(err))
}));