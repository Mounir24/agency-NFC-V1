var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.status(200).json({ users: 'USERS routes' });
});

module.exports = router;
