var express = require('express');
var router = express.Router();

var user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/user/create", user_controller.user_create_get);

// POST request for creating User.
router.post("/user/create", user_controller.user_create_post);

// // GET request for one User.
// router.get("/user/:id", user_controller.user_detail);
// router.get("/user", user_controller.user_list);

module.exports = router;
