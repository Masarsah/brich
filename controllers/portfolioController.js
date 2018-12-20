var express = require('express');
var router = express.Router();

var auth = require('../middleware/auth');
var portfolio = require('../modules/portfolio');
var chartdata = require('../modules/chartdata');

router.get('/', portfolio.getAll, renderIndex);
router.get('/show', portfolio.getAll, renderShow);
router.get('/new', portfolio.getAll, chartdata.getChartData, renderNew);
router.get('/:id', portfolio.find, chartdata.getChartData, renderShow);
router.get('/:id/edit', auth.onlyUsers,portfolio.find, chartdata.find, renderEdit);
// router.get('/:id/edit', auth.onlyUsers, portfolio.find, chartdata.getAll, renderEdit);
router.post('/', portfolio.create,chartdata.createChartData, redirectShow);
router.delete('/:id', portfolio.delete, redirectIndex);
// router.put('/:id', auth.onlyUsers, portfolio.update, redirectShow);
router.put('/:id', portfolio.update, chartdata.update, redirectShow);

function renderIndex(req, res) {
  var mustacheVariables = {
    portfolios: res.locals.portfolios
  }
  res.render('./portfolio/index', mustacheVariables);
}

function redirectShow(req, res) {
  console.log("redirecting" , res.locals.portfolioId)
 res.redirect(`/portfolio/${res.locals.portfolioId}`);
}


function renderShow(req, res) {
  var mustacheVariables = {
    portfolio: res.locals.portfolio,
    chartdata: res.locals.chartdata
  }
  console.log(mustacheVariables)
  res.render('./portfolio/show', mustacheVariables);
}

// function renderSign(req, res) {
//   var mustacheVariables = {
//     portfolio: res.locals.portfolio
//   }
//   res.render('./portfolio/sign', mustacheVariables);
// }
function renderNew(req, res) {
  var mustacheVariables = {
    portfolio: res.locals.portfolio,
    chartdata: res.locals.chartdata

  }
  res.render('./portfolio/new', mustacheVariables);
}

function renderEdit(req, res) {
  var mustacheVariables = {
    portfolio: res.locals.portfolio,
    chartdata: res.locals.chartdata
  }
  console.log(mustacheVariables)
  res.render('./portfolio/edit', mustacheVariables);
}




function redirectIndex(req, res) {
  res.redirect('/portfolio');
}




module.exports = router;