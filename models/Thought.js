const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers');
const Reaction = require('./Reaction').schema;


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
  reactions: [Reaction]
},
{
  toJSON: {
    virtuals: true
  },
  id: false
});

Reaction.virtual('reactionCount').get(function() {
  return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
