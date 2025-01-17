const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  comments: [
    { 
      body: { type: String }, 
      date: { type: Date, default: Date.now } 
    }
  ],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
