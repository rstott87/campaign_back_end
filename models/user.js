var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  personal_email: { type: String },
  phone_number: {type:  Number},
  local_chapter: { type: String }
});

UserSchema.virtual("url").get(function () {
  return "/" + this._id;
});


module.exports = mongoose.model("User", UserSchema);