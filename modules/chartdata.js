var db = require('../db/config');

var chartdata = {};



chartdata.update = function (req, res, next) {

  var newData = req.body.newData.split(',').map(Number);
 var newlabel = req.body.newLabel.split(',');
// console.log(newData)
console.log(newlabel)
  db.one(`UPDATE chartdata SET labels = $1, data = $2 WHERE id =$3 RETURNING id;`, [newlabel, newData, req.params.id])
    .then(function (result) {
      // console.log(result);
       console.log(`table updated for ${result.id}`);
       res.locals.chartdataId = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

chartdata.find = function (req, res, next) {

  db.one("SELECT labels ,data  FROM chartdata WHERE id =$1; ", [req.params.id])
    .then(function (result) {
      res.locals.chartdata = result;
      console.log(result)
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}
chartdata.getChartData = function (req, res, next) {
  db.one("SELECT * FROM chartdata WHERE id=$1;", [req.params.id])
    .then(function (result) {
      res.locals.chartdata = result;
      console.log(result)
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

// chartdata.createChartData = function (req, res, next) {
//   var chartArr = [req.body.field1, req.body.field2, req.body.field3, req.body.fild4 , req.body.fild5]
//   console.log(req.body);
//   db.one('INSERT INTO chartdata(labels, data) VALUES ( array [$1], array [$2]) RETURNING *;',
//         [req.body.labels, req.body.data])
//     .then(function (result) {
//       console.log(result);
//       res.locals.chartdataId = chartdata.id;
//       next();
//     })
//     .catch(function (error) {
//       console.log(error);
//       next();
//     })
// }

chartdata.createChartData = function (req, res, next) {
  var chartArrla = [req.body.field1, req.body.field2, req.body.field3, req.body.fild4 , req.body.fild5]
  var chartArrda = [req.body.field1, req.body.field2, req.body.field3, req.body.fild4 , req.body.fild5]

  console.log(req.body);
  db.one('INSERT INTO chartdata(labels, data) VALUES ( array [$1], array [$2]) RETURNING *;',
  chartArrla, chartArrda)
    .then(function (result) {
      console.log(result);
      res.locals.chartdataId = chartdata.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}


module.exports = chartdata;