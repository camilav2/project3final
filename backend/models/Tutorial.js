const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const TutorialSchema =  new Schema({
    studentId:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      teacherId:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      subjectId:  [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
      }]

});
 
module.exports = mongoose.model('Subject', TutorialSchema);