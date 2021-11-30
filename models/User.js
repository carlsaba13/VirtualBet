const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  bookie: Boolean,
  password: String,
  balence: Number
});



const User = mongoose.model('User', userSchema);

module.exports = User;
