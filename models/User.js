const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  balence: Number
});



const User = mongoose.model('User', userSchema);

module.exports = User;
