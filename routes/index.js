var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth')


/* GET home page. */
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Express',
    name: req.user.recordset[0].username
  });
});

module.exports = router;
