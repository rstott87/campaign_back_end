var async = require("async");
var User = require("../models/user");
const { body, validationResult } = require("express-validator");

// Handle User create on GET.
exports.user_create_get = function (req, res, next) {
  res.render("user_form", { title: "Create User" });
};

// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("personal_email").trim().isLength({ min: 1 }).escape(),
  body("phone_number"),
  body("local_chapter").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("user_form", {
        title: "Create User",
        user: req.body,
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid.

      // Create an User object with escaped and trimmed data.
      var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        personal_email: req.body.persoal_email,
        phone_number: req.body.phone_number,
        local_chapter: req.body.local_chapter
      });
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new author record.
        res.redirect(user.url);
      });
    }
  }
];

// Display list of all Users.
exports.user_list = function (req, res, next) {
  User.find()
    .sort([["last_name", "ascending"]])
    .exec(function (err, list_users) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("user_list", {
        title: "User List",
        user_list: list_users
      });
    });
};

exports.user_detail = function (req, res, next) {
  async.parallel(
    {
      user(callback) {
        User.findById(req.params.id).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.author == null) {
        // No results.
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("user_detail", {
        title: "User Detail",
        user: results.user
      });
    }
  );
};
