var bcrypt = require('bcrypt');
var db = require('../db/config');

var session = {};

session.create = function(req, res, next){
  var email = req.body.email.toLowerCase();
  db.one("SELECT * FROM portfolios WHERE email= $1;", [email])
    .then(function(result){
      console.log("\n\n\n\n\n\n\n" , result);
      if(bcrypt.compareSync(req.body.password, result.password_digest)){
        req.session.portfolio = result;
      }
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

session.delete = function(req, res, next){
  req.session.portfolio = null;
  next();
}

module.exports = session;