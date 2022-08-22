
var async = require("async");
const passport = require("passport");
const jwt = require("jsonwebtoken");


exports.admin_login_get = (req, res) => res.render("login");

exports.admin_login_post = async (req, res, next) => {
  passport.authenticate("login", async (err, admin, info) => {
    try {
      if (err || !admin) {
        const error = new Error("An error occurred.");

        return next(error);
      }
      req.login(admin, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: admin._id, email: admin.email };
        const token = jwt.sign({ admin: body }, "TOP_SECRET");
        res.cookie("jwt", token);
        return res.redirect("/private/welcome");
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

