var express = require("express");
var router = express.Router();
var cors = require("cors");

var user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/welcome", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get("/user/create", user_controller.user_create_get);

// POST request for creating User.
router.post("/user/create", user_controller.user_create_post);

// GET request for list of all Users.
router.get("/users", user_controller.user_list);

// GET request for one Author.
router.get("/user/:id", user_controller.user_detail);

// GET request to delete User
router.get("/user/:id/delete", user_controller.user_delete_get);

//POST request to delete User
router.post("/user/:id/delete", user_controller.user_delete_post);

module.exports = router;
