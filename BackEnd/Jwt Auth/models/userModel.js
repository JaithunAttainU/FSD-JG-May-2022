const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // roles: [{
  //   type: String,
  //   enum: ["STUDENTS", 'TC', 'INSTRUCTORS']
  // }]
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel