const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const SubjectSchema =  new Schema({
    name: String,
    userId:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }]
});
 
module.exports = mongoose.model('Subject', SubjectSchema);
