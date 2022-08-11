var async = require("async");
var User = require("../models/user");
const { body, validationResult } = require("express-validator");

//CREATEE
// Handle User create on GET.
exports.user_create_get = function (req, res, next) {
  res.render("user_form", { title: "Create User" });
};
// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .isLength({ min: 1 })
    .withMessage("First name must be specified.")
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .isLength({ min: 1 })
    .withMessage("Last name must be specified.")
    .withMessage("Family name has non-alphanumeric characters."),
  body("personal_email"),
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
        personal_email: req.body.personal_email,
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

//READ / GET
// Display list of all Users.
//sorts in order from most recently created
exports.user_list = function (req, res, next) {
  User.find()
    .sort([["createdAt", "descending"]])
    .exec(function (err, list_users) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      console.log(list_users)
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
      if (results.user == null) {
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

//DELETE
exports.user_delete_get = function (req, res, next) {
  async.parallel(
    {
      user(callback) {
        User.findById(req.params.id).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        // No results.
        res.redirect("/users");
      }
      // Successful, so render.
      res.render("user_delete", {
        title: "Delete User",
        user: results.user
      });
    }
  );
};

exports.user_delete_post = function (req, res, next) {
  User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
    if (err) {
      return next(err);
    }
    // Success - go to user list
    res.redirect("/users");
  });
};
