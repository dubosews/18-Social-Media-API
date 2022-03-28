const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    const newId = new Schema.ObjectId;

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