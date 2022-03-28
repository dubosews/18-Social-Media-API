const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    max: 280
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: format_date
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

const Thought = model('Note', ThoughtSchema);

module.exports = Thought;
