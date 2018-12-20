
var auth = {};

auth.restrict = function(req, res, next){
  if(req.session.portfolio){
    next();
  }else{
    res.redirect('/login');
  }
}

auth.onlyUsers = function(req, res, next) {
  if (req.session.portfolio) {
    if(req.params.id == req.session.portfolio.id){
      next();
    }else{
      res.redirect(`/users/${req.session.portfolio.id}`)
    }
  } else {
    res.redirect('/login');
  }
}

module.exports = auth;