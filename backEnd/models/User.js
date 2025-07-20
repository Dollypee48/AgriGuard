const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  savedQueries: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "PestQuery" }],
});

module.exports = mongoose.model("User", UserSchema);