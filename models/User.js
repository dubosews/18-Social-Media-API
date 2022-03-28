const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought').schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'username is Required',
    unique: true
  },

  email: {
    type: String,
    trim: true,
    required: 'Note is Required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  thoughts: [thoughtSchema],

   friends: [{
    type: String,
    ref: 'UserSchema'
  }],
  
},
{
    toJSON: {
      virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
  });

const User = model('User', UserSchema);

module.exports = User;
