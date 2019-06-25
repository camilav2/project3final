const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject-model');
const User = require('../models/User')
var mongoose = require("mongoose");


//Create a subject
router.post('/create', (req, res, next) => {
  let subject
  Subject.create({
    name: req.body.name,
    userId: req.body.userId
  })
    // let newSubject = newSubject({name: req.body.name, })
    // newSubject.save()
    .then(savedSubject => {
      subject = savedSubject;
      let id = mongoose.Types.ObjectId(req.body.userId)
      return User.findById(id) //get user from session
    })
    .then(user => {
      console.log("user ", user)

      user.subjects.push(subject.id);
      user.save().then(
        res.json(subject)
      )
    })
    .catch((err) => {
        res.status(500).send({
          message: err.message
        })
    })
})


router.get('/', (req, res, next) => {
  Subject.find()
    .then(subjects => {
      res.json(subjects);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
);

//find subject by id

router.get('/get/:subjectId', (req, res, next) => {
  Subject.findById(req.params.subjectId)
    .then(subjects => {
      res.json(subjects);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
);

router.get('/user', (req, res, next) => {

  if (!req.user) {
    res.status(402).json({ message: "user needs to be authenticated" })
    return
  }
  const subjects = req.user.subjects
  Subject.find({ _id: { $in: subjects } })
    .then(subjects => {
      res.json(subjects);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
);


module.exports = router;