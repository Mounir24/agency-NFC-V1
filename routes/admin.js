var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function (req, res, next) {
    res.status(200).json({ admin: 'ADMIN ROUTES' });
});

module.exports = router;
