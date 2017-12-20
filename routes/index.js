var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController");

/* GET home page. */
router.get('/', auth.home);

router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

router.get('/register', auth.register);

router.post('/register', auth.doRegister);

router.get('/login', auth.login);

router.post('/login',auth.doLogin);

router.get('/logout', auth.logout);

module.exports = router;
