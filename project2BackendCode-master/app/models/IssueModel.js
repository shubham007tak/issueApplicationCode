const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Issue = new Schema({
  issueId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  fullNameCreatedFor: {
    type: String,
    required: true,
    default: ''
  },
  status:{
    type: String,
    required: true,
    default: ''
  },
  createdBy: {
    type: String,
    default: ''
  },
  createdByEmail: {
    type: String,
    default: '',
    required: true
  },
  createdById: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
    required: true
  },
  attachment: {
    type: String,
    default: '',
    required: true
  },
  createdForEmail: {
    type: String,
    default: '',
    required: true
  },
  createdFor: {
    type: String,
    default: '',
    required: true
  },
  createdOn: {
    type: Date,
    default: ''
  }
})

module.exports = mongoose.model('Issue', Issue)