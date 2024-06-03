const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  wishlist: [],
});
module.exports = mongoose.model("UserDB", UserSchema);
