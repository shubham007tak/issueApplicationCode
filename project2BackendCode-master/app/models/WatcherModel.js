const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Watcher = new Schema({
  watcherId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  userId:{
    type: String,
    default: '',
    required: true
  },
  createdBy:{
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

module.exports = mongoose.model('Watcher', Watcher)