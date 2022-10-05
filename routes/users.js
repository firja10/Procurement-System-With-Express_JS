var express = require('express');
var router = express.Router();
var connection = require('../database.js');





/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// router.get('/', function (req, res, next) {
//   connection.query('SELECT COUNT() FROM users ORDER BY id desc', function (err, rows) {
//     const count_user = rows[0].count; 
//     if (err) {
//       req.flash('error', err)
     
//       res.render('dashboard', { data: '' })
//     } else {
//       res.render('dashboard', { data: count_user })
//     }
//   })
// });




module.exports = router;



