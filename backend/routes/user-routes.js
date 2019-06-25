const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Find an user by fullName
router.get('/', (req, res, next) => {
  User.findOne({ fullName: req.params.fullName })
    .populate('subjects')
    .exec(function (err, users) {
      if (err) {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "User not found with given full name " + req.params.fullName
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with given full name" + req.params.fullName
        });
      }
      res.send(users);
    });
}
);

// Find all users that learn a given subject
exports.findBySubjectId = (req, res) => {
  User.find({ subjects: req.params.subjectId })
    .exec(function (err, users) {
      if (err) {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Student not found with given Subject Id " + req.params.subjectId
          });
        }
        return res.status(500).send({
          message: "Error retrieving Student with given subject Id " + req.params.subjectId
        });
      }

      res.send(users);
    });
};

// Get All users
router.get('/allUsers', (req, res) => {
  User.find({})
    .then(users => {
      res.send(users)
    }).catch(err => {
      console.log(err)
    })
});

// Get All users
router.get('/teachers', (req, res, next) => {

  User.find({ occupation: "teacher" })
  .populate('subjects')
    .then(users => {
      res.send(users)
    }).catch(err => {
      console.log(err)
    })
});

router.get('/students', (req, res, next) => {

  User.find({ occupation: "student" })
    .then(users => {
      res.send(users)
    }).catch(err => {
      console.log(err)
    })
    
})

module.exports = router;