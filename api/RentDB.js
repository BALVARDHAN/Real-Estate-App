const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentSchema = new Schema({
  owner: String,
  email: String,
  houseType: String,
  availableFor: String,
  availableFrom: String,
  postedOn: String,
  furnished: Boolean,
  city: String,
  state: String,
  area: Number,
  rent: Number,
  bedrooms: Number,
  bathrooms: Number,
  adress: String,
  description: String,
  imageName: [],
});
module.exports = mongoose.model("RentDB", RentSchema);
