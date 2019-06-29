const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema =  new Schema({
    question: String,
    userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    subjectId:  {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
      },
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;