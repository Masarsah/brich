var express = require('express');
var router = express.Router();

var post = require('../modules/post');

// routes here
router.get('/', post.getAll, renderIndex);
router.get('/:id', post.find, post.findByportfolio, renderShow);

router.post('/:id/register', post.addportfolioTopost, redirectShow);
router.delete('/:id/register', post.removeportfolioFrompost, redirectShow);

router.get('/new', renderNew);
router.get('/:id/edit', post.find, renderEdit);


router.delete('/:id', post.delete, redirectIndex);
router.post('/', post.create, redirectShow);
router.put('/:id', post.update, redirectShow);


function redirectIndex(req, res) {
  res.redirect('/posts');
}

function redirectShow(req, res) {
  res.redirect(`/posts/${res.locals.post_id}`);
}

function renderEdit(req, res) {
  var mustacheVariables = res.locals.post

  res.render('./posts/edit', mustacheVariables);
}



function renderNew(req, res){
  res.render('./posts/new')
}

function renderIndex(req, res){
  res.render('./posts/index');
}

function renderShow(req, res){
  var mustacheVariables = {
    post: res.locals.post,
    portfolioAttendance: res.locals.portfolioAttendance
  };

  res.render('./posts/show', mustacheVariables);
}

function redirectShow(req, res){
  res.redirect(`/posts/${res.locals.post_id}`);
}

// template functions


module.exports = router;