const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject-model');
const User = require('../models/User')
const Question = require('../models/Question')
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
  .populate("questions")
  .populate("videos")
    .then(subjects => {
      console.log(subjects)
      res.json(subjects);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
);

//add videos related to the subject

router.post('/videos', (req, res, next) => {
  Subject.findByIdAndUpdate(
    req.body.subjectId,
    {$push: {videoUrl: req.body.videoUrl}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }).then(response => {
      res.send(response)
    }).catch(err => {
      console.log(err)
    })
});

router.get('/get/videos', (req, res, next) => {
  
  Subject.findById(req.query.subjectId)
  .then(data => { 
    
    res.send(data)
  }).catch(err => {
    console.log(err)
  })
});

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

// Add question
router.post('/post/question', (req, res, next) => {
  let question
  Question.create({
    question: req.body.question,
    userId: req.body.userId,
    subjectId: req.body.subjectId
  }).then(savedQuestion => {
    question = savedQuestion;
    let questionId = mongoose.Types.ObjectId(req.body.question.id)
    return Subject.findById(req.body.subjectId) //get subject from session
  })
  .then(subject => {
    console.log("subject ", subject)

    subject.questions.push(question.id);
    
    subject.save()
      .then(() => {
        console.log(question)
        res.send(question)
      })
      .catch(err => { console.log(err)
      })
    })
    .catch((err) => {
        res.status(500).send({
          message: err.message
        })
    })
});

router.get('/questions/:subjectId', (req, res, next) => {
  debugger
  Question.find({subjectId: req.params.subjectId})
  .then(data => {
    res.send(data)
    console.log(data)
    debugger
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
})


module.exports = router;