const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  city: {
    type: String,
    // required: true,
  },
  picture: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;