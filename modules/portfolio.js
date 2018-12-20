var db = require('../db/config');
var bcrypt = require('bcrypt');
var portfolio = {};

portfolio.getAll = function(req, res, next){
  db.manyOrNone('SELECT * FROM "portfolios" ORDER BY budget DESC;')
    .then(function(result){
      res.locals.portfolios = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

portfolio.getmust = function(req, res, next){
  db.manyOrNone('SELECT * FROM "portfolios" ORDER BY budget DESC limit 4;')
    .then(function(result){
      res.locals.portfolios = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}
portfolio.find = function (req, res, next) {
  db.one('SELECT * FROM "portfolios" WHERE id = $1;', [req.params.id])
    .then(function (result) {
      res.locals.portfolio = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

portfolio.create = function (req, res, next) {
  console.log(req.body);
  db.one('INSERT INTO portfolios(username,email, password_digest, budget) VALUES ($1,$2 ,$3, $4) RETURNING *;',
        [req.body.username,req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10),req.body.budget])
    .then(function (result) {
      console.log('***********');
      console.log(result);
      req.session.portfolio = result;
      res.locals.portfolioId = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}


portfolio.update = function(req, res, next) {
  console.log(req.body)
  db.one(`UPDATE portfolios SET username=$1, email=$2, password_digest=$3, budget=$4 
   WHERE id=$5 RETURNING id;`, [req.body.username, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, 10), req.body.budget, req.params.id])
   .then(function(result){
    console.log('*************');

    // console.log(result);
     console.log(`table updated for ${result.id}`);
     res.locals.portfolioId = result.id;


     next();
   })
   .catch(function(error){
    console.log(error);
    next();
  })
}



portfolio.delete = function (req, res, next) {
  db.none('DELETE FROM portfolios WHERE id=$1;', [req.params.id])
    .then(function () {
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

// portfolio.findByHouse = function (req, res, next) {
//   db.manyOrNone("SELECT * FROM portfolios WHERE chartdata_id=$1;", [req.params.id])
//     .then(function (result) {
//       res.locals.portfolios = result;
//       next();
//     })
//     .catch(function (error) {
//       console.log(error);
//       next();
//     })
// }

module.exports = portfolio;




