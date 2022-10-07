var express = require('express');
const { route } = require('./bahan_baku');
var router = express.Router();
var conn = require('../database');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ahmad`s Project Nih Ayo' });
// });


router.get('/', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard' });

  if (req.session.loggedin) {

    res.render('dashboard', { title: 'Dashboard' });
    
  }

  else {
    // res.send('Silakan lakukan log in ulang !');
    res.redirect('/login')
  }

});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Ahmad`s Project Nih Ayo' });
});


router.get('/dashboard', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard', layout:'./layouts/template' });
  res.render('dashboard', { title: 'Dashboard'});
});




router.get('/login', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard', layout:'./layouts/template' });
  res.render('login', { title: 'Login'});
});



router.get('/register',function(req,res,next){

  res.render('register',{title:'Registrasi'});

})







router.post('/auth',function (req, res) {

  let name = req.body.name;
  let password = req.body.password;


  if (name && password) {
    
  conn.query("SELECT * FROM users WHERE name ? AND password ?", [name,password], function(err,results,fields) {

    if (err) {

      throw err;
      
    }

    if (results.length > 0) {

      req.session.loggedin = true;
      req.session.name = name;
      
      res.redirect('/');

      
    }

    else {
      res.send('Username dan Password Salah ! ')
    }


    
  });    

    
  }

  else {
    res.send('Masukkan Username dan Password !');
    // res.redirect('/');
    res.end();
  }

});



router.post('/post_register', function (req,res,next) {
 

  // req.assert('name','Nama Diperlukan').notEmpty()

  // req.assert('password', 'Password Jangan Kosong').notEmpty()

  // req.assert('email','Email Tolong Isi !').isEmail()

  req.checkBody('name','Nama Diperlukan').notEmpty()

  req.checkBody('password', 'Password Jangan Kosong').notEmpty()

  req.checkBody('email','Email Tolong Isi !').isEmail()


  var errors = req.validationErrors();

  if(!errors) {

  var user = {

    name :req.sanitize('name').escape().trim(),
    email:reqsanitize('email').escape().trim(),
    password :req.sanitize('password').escape().trim(),



  }



    conn.query('INSERT INTO users SET ?',user, function (err,results) {

      if(err)
      {
        req.flash('error','Maaf Anda Gagal Registrasi');

        res.redirect('/register');

      }

      else {
        req.flash('success','Anda Telah Berhasil Registrasi, silakan login');
        res.redirect('/login');
      }


      
    })



  }


  else {
    res.render('/register',
    {
      title:'Register Page',
      name:req.body.name,
      email:req.body.email,
      password:'',
    }
    );
  }



  
});











module.exports = router;
