const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');
 
const SubjectSchema =  new Schema({
    name: String,
    userId:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    videoUrl: [{
        type: String,
    }],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
      }]
});
 
module.exports = mongoose.model('Subject', SubjectSchema);
