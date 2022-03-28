const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers');
const mongoose = require('mongoose');

var Schema2 = mongoose.Schema,
    ObjectId = Schema2.ObjectId;
    const newId = new Schema2.ObjectId;

const ReactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    default: newId
  },

  reactionBody: {
    type: String,
    required: 'reaction is Required',
    max: 280
  },

  username: {
    type: String,
    required: 'username is Required'
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: format_date
  }
},);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;