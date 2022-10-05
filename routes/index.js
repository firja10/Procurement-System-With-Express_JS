var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ahmad`s Project Nih Ayo' });
// });


router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});



router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Ahmad`s Project Nih Ayo' });
});


router.get('/dashboard', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard', layout:'./layouts/template' });
  res.render('dashboard', { title: 'Dashboard'});
});












module.exports = router;
