var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  personal_email: { type: String },
  phone_number: {type:  Number},
  local_chapter: { type: String },
  submission_date: { type: Date}
});

UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});


UserSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  var fullname = "";
  if (this.first_name && this.last_name) {
    fullname = this.last_name + ", " + this.first_name;
  }
  if (!this.first_name || !this.last_name) {
    fullname = "";
  }
  return fullname;
});


module.exports = mongoose.model("User", UserSchema);