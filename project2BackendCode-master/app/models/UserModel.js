const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  fullName: {
    type: String,
    default: ''
  },
  userId: {
    required: true,
    unique: true,
    index: true,
    default: '',
    type: String
  },
  userName: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: '',
    minlength: 10,
    maxlength: 10
  },
  email: {
    index: true,
    type: String,
    required: true
  },
  countryName: {
    type: String,
    default: ''
  },
  countryCode: {
    type: String,
    default: ''
   
  },

  password: {
    type: String,
    default: 'averylongstringthatnobodycanguess'
  },

  createdOn: {
    type: Date,
    default: ''
  }
})

mongoose.model('User', userSchema)