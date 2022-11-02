var express = require('express');
const { route } = require('./bahan_baku');
var router = express.Router();
var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 





/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  conn.query('SELECT * FROM users', function (err,results) {
    if (req.session.nama) {

  
    console.log(results);
    res.render('users/index', {title:'Daftar User', data:results, user_name:req.session.nama});

} else {
    res.redirect('/login');
}

});

});









// Edit Users Jadi 
router.get('/get_id/(:id)', function (req,res, ) {
    

  var id = req.params.id;

  conn.query(`SELECT * FROM users WHERE id = '${id}'`, function (err,results) {

      // conn.query('SELECT * FROM produk_jadi WHERE id = ?', id, function (err,results) {


  if (req.session.nama) {
      


      if (err) {
          res.redirect('/users',{title:'Error Ini Mah', user_name:req.session.nama});
      }
      
      
      console.log(results);
      res.render('users/get_id', {title:`User dengan nama ${results[0].nama}`, data:results[0], user_name:req.session.nama});

  } else {
    res.redirect('/login');
  }

  });
 

});











// INSERT USERS JADI 

router.post('/store', function (req, res) {
   

  const {nama, password, email, is_sales, is_ppic, is_produksi, is_store, is_manajerial, posisi} = req.body;

  var form_data = {
    nama, password, email, is_sales, is_ppic, is_produksi, is_store, is_manajerial, posisi
  }


  conn.query(`INSERT INTO users SET ?`, form_data, function (err, results) {
  
      if (err) {
          req.flash('Pertambahan User Error');

          res.redirect('/users');            

      }

      else {

          req.flash('User sudah ditambahkan');

          res.redirect('/users');

      }


      
  });
  
});








// UPDATE USERS JADI 

router.post('/update/(:id)', function (req, res) {
    

  var id = req.params.id;

  const {nama, password, email, is_sales, is_ppic, is_produksi, is_store, is_manajerial, posisi} = req.body;

  var form_data = {
    nama, password, email, is_sales, is_ppic, is_produksi, is_store, is_manajerial, posisi
  }

  conn.query(`UPDATE users SET ? WHERE id = ${id}`, form_data, function (err,results) {
      
      if (err) {
          req.flash('Update User Error');

          res.redirect(`/users/get_id/${id}`);   
          // res.redirect(`/produk_jadi`);            

      }

      else {

          req.flash('User sudah ditambahkan');

          res.redirect(`/users/get_id/${id}`);   
          // res.redirect(`/produk_jadi`);              


      }




  })



});







// UPDATE PRODUK DELETE


router.get('/delete/(:id)', function (req, res) {
    
  var id = req.params.id;

  conn.query(`DELETE FROM users WHERE id = ${id}`, function (err, results) {

      if (err) {
          
          req.flash('Data tidak bisa dihapus');
          res.redirect('/users');

      }

      else {

          req.flash('Data dapat dihapus');
          res.redirect('/users');

      }


      
  })


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



