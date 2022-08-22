const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true
  }
});

AdminSchema.pre("save", async function (next) {
  const admin = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});
AdminSchema.methods.isValidPassword = async function (password) {
  const admin = this;
  const compare = await bcrypt.compare(password, admin.password);

  return compare;
};

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
