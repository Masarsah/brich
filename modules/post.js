var db = require('../db/config');
var post = {};

// post queries

post.getAll = function(req, res, next){
  db.manyOrNone("SELECT * FROM posts;")
    .then(function(result){
        console.log('***************', result);
        res.locals.posts = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

// we use this for show AND for the edit GET route
post.find = function(req, res, next) {
  db.oneOrNone("SELECT * FROM posts WHERE id = $1;", [req.params.id])
    .then(function(result){
      console.log('$$$$$$$$$', result);
      res.locals.post = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

// edit needs a method that updates data in the database:
post.update = function(req, res, next) {
  db.one(`UPDATE posts SET name = $1, description = $2
   WHERE id = $3 RETURNING id;`, [req.body.name, req.body.description, req.params.id])
   .then(function(result){
     console.log(`table updated for ${result.id}`);
     res.locals.post_id = result.id;
     next();
   })
   .catch(function(error){
    console.log(error);
    next();
  })
}

post.delete = function(req, res, next) {
  db.none("DELETE FROM posts WHERE id=$1;", [req.params.id])
    .then(function(){
      console.log('SUCCESSFUL DELETE');
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

post.create = function(req, res, next) {
  db.one("INSERT INTO posts(name, description) VALUES($1, $2) RETURNING id;", [req.body.name, req.body.description])
    .then(function(result){
      res.locals.post_id = result.id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

post.getAll = function(req, res, next){
  db.manyOrNone("SELECT * FROM posts;")
    .then(function(result){
      console.log('fetched all posts');
      res.locals.posts = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
};
post.getmust = function(req, res, next){
  db.manyOrNone('SELECT * FROM posts limit 4;')
    .then(function(result){
      res.locals.posts = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

post.find = function(req, res, next){
  db.oneOrNone("SELECT * FROM posts WHERE id = $1;", [req.params.id])
    .then(function(result){
      res.locals.post = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

// check whether or not the logged in portfolio is registered to post
post.findByportfolio = function(req, res, next){
  db.manyOrNone("SELECT * FROM portfolio_posts WHERE portfolio_id=$1 AND post_id=$2;", [req.session.portfolio_id, req.params.id])
    .then(function(result){
      if (result.length > 0) {
        res.locals.portfolioAttendance = true;
      } else {
        res.locals.portfolioAttendance = false;
      }
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

// add the logged in portfolio to the post
post.addportfolioTopost = function(req, res, next){
  db.one("INSERT INTO portfolio_posts (portfolio_id, post_id) VALUES ($1, $2) RETURNING post_id;" , [req.session.portfolio.id, req.params.id])
    .then(function(result){
      res.locals.post_id = result.post_id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

// removes the portfolio from the current post
post.removeportfolioFrompost = function(req, res, next){
  db.one("DELETE FROM portfolio_posts WHERE portfolio_id=$1 AND post_id=$2 RETURNING post_id;", [req.session.portfolio.id, req.params.id])
    .then(function(result){
      res.locals.post_id = result.post_id;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

module.exports = post;