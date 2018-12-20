// top level config ------------------------------------------------------
// require our packages and dependancies 

var express = require('express');
var mustache = require('mustache-express');
var port = process.env.PORT || 3000;
var logger = require('morgan');
var bodyParser = require('body-parser');
var methooverride = require('method-override')
var app = express();

var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));



app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/modules'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methooverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// import our controllers
var portfolio = require('./modules/portfolio');
var post = require('./modules/post');
app.get('/', portfolio.getmust, post.getmust, renderShow );

 function renderShow(req, res){
  //  console.log(res.locals.portfolios)
  //  console.log(res.locals.posts)

  mustachevarible = {
    portfolioList: res.locals.portfolios,
         postList: res.locals.posts
  }
  console.log(mustachevarible)
  res.render('./index', mustachevarible);
}
var portfolioController = require('./controllers/portfolioController');
var sessionsController = require('./controllers/sessionsController');
var postsController = require('./controllers/postsController');

//route controllers

app.use('/portfolio', portfolioController);
app.use('/login', sessionsController);
app.use('/posts', postsController);


// start the server!
app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});

