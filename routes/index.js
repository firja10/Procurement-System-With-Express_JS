var express = require('express');
const { route } = require('./bahan_baku');
var router = express.Router();
var conn = require('../database');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ahmad`s Project Nih Ayo' });
// });




// 

router.get('/', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard' });

  if (req.session.loggedin) {

    res.render('dashboard', { title: 'Dashboard' });
    
  }

  else {
    // res.send('Silakan lakukan log in ulang !');
    // res.redirect('/login')

    res.render('dashboard', { title: 'Dashboard' });
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

  let nama = req.body.nama;
  let password = req.body.password;


  if (nama && password) {
    
  conn.query(`SELECT * FROM users WHERE nama = '${nama}' AND password = '${password}'`,  function(err,results,fields) {

    if (err) {

      throw err;
      
    }

    if (results.length > 0) {

      req.session.loggedin = true;
      req.session.nama = nama;
      
      res.redirect('/');

      
    }

    else {
      res.send('Usernama dan Password Salah ! ')
    }


    
  });    

    
  }

  else {
    res.send('Masukkan Usernama dan Password !');
    // res.redirect('/');
    res.end();
  }

});




router.post('/auth_register', function(req,res) {

  
  let nama = req.body.nama;
  let email = req.body.email ;
  let password = req.body.password;






  conn.connect(function(err) {
    if (err){
        console.log(err);
    };
    // checking user already registered or no
    conn.query(`SELECT * FROM users WHERE nama = '${nama}' AND password  = '${password}'`, function(err, result){
        if(err){
            console.log(err);
        };
        if(Object.keys(result).length > 0){
            res.sendFile(__dirnama + '/failReg.html');
        }else{
        //creating user page in userPage function
        function userPage(){
            // We create a session for the dashboard (user page) page and save the user data to this session:
            req.session.user = {
                nama: nama,
                email: email,
                password: password 
            };

            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Login and register form with Node.js, Express.js and MySQL</title>
                <meta charset="UTF-8">
                <meta nama="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <h3>Hi, ${req.session.user.nama}</h3>
                    <a href="/">Log out</a>
                </div>
            </body>
            </html>
            `);
        }
            // inserting new user data
            var sql = `INSERT INTO users (nama, email, password) VALUES ('${nama}', '${email}', '${password}')`;
            conn.query(sql, function (err, result) {
                if (err){
                    console.log(err);
                }else{
                    // using userPage function for creating user page
                    userPage();
                };
            });

    }

    });
});
  








  
});


























router.post('/post_register', function (req,res,next) {
 

  // req.assert('nama','Nama Diperlukan').notEmpty()

  // req.assert('password', 'Password Jangan Kosong').notEmpty()

  // req.assert('email','Email Tolong Isi !').isEmail()

  req.checkBody('nama','Nama Diperlukan').notEmpty()

  req.checkBody('password', 'Password Jangan Kosong').notEmpty()

  req.checkBody('email','Email Tolong Isi !').isEmail()


  var errors = req.validationErrors();

  if(!errors) {

  var user = {

    nama :req.sanitize('nama').escape().trim(),
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
      nama:req.body.nama,
      email:req.body.email,
      password:'',
    }
    );
  }



  
});











module.exports = router;
