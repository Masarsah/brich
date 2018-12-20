var express = require('express');
var router = express.Router();
var session = require('../modules/session');

router.get('/', renderNew);
router.post('/', session.create, redirectShow);
router.delete('/', session.delete, redirectLogin);

function renderNew(req, res) {
  console.log(req.session.portfolio)
  res.render('./login');
}

function redirectShow(req, res) {
  if (req.session.portfolio) {
    console.log(req.session.portfolio.id)
    res.redirect(`/portfolio/${req.session.portfolio.id}`)

  } else {
    res.redirect('/login');
  }
}

function redirectLogin(req, res) {
  res.redirect('/login');
}

module.exports = router;





