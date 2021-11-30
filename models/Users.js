const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: String,
  bookie: Boolean,
  password: String,
  balance: Number
});



const User = mongoose.model('User', userSchema);

module.exports = User;
