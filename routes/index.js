var express = require('express');
var router = express.Router();

var user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get("/user/create", user_controller.user_create_get);

// POST request for creating User.
router.post("/user/create", user_controller.user_create_post);

// GET request for list of all Users.
router.get("/users", user_controller.user_list);

// GET request for one Author.
router.get("/user/:id", user_controller.user_detail);



module.exports = router;
