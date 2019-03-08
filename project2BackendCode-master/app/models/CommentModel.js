const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Comment = new Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  createdBy: {
    type: String,
    default: ''
  },
  createdForReporterEmail: {
    type: String,
    default: '',
    required: true
  },
  createdById: {
    type: String,
    default: '',
    required: true
  },
  comment: {
    type: String,
    default: '',
    required: true
  },
  createdForIssueId: {
    type: String,
    default: '',
    required: true
  },
  createdOn: {
    type: Date,
    default: ''
  }
})

module.exports = mongoose.model('Comment', Comment)