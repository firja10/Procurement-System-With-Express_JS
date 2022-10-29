var express = require('express');
const { route } = require('./bahan_baku');
var router = express.Router();
var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ahmad`s Project Nih Ayo' });
// });




// 

router.get('/', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard' });

  if (req.session.nama) {

    res.render('dashboard', { title: 'Dashboard' });
    
  }

  else {
    res.redirect('/login');
  }

  // res.render('dashboard', { title: 'Dashboard' });






  // else {
  //   // res.send('Silakan lakukan log in ulang !');
  //   // res.redirect('/login')

  //   res.render('dashboard', { title: 'Dashboard' });
  // }

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

});





router.post('/register', function (req, res, next) {
  
  inputData = {

    nama:req.body.nama,
    email:req.body.email,
    password:req.body.password,
    // confirm_password:req.body.confirm_password


  }


  var konfirmasi_pass = req.body.confirm_password;



  conn.query("SELECT * FROM users where email = ?", [inputData.email], function (err, results, fields) {
    

    if (err){

      var message = "Tidak Bisa Registrasi"
      // res.redirect('/register', {alert_message:message})
      res.redirect('/register');
    };       

    if (results.length>1) {

      var message = "Data Sudah Ada";
    
    } else if(konfirmasi_pass != inputData.password) {

      var message = "Konfirmasi Password dan Password Berbeda";

    }


    else {

      conn.query('INSERT INTO users SET?', inputData, function (err, results) {
        
        if (err){

          var message = "Tidak Bisa Registrasi"
          res.redirect('/register');
        };       
      });

      var message = "Kamu Sukses Registrasi";

      // res.redirect('/register', {alert_message:message});
      res.redirect('/register');

    }

  });


});




































router.post('/login', function(request, response, next){

  var nama = request.body.nama;

  var password = request.body.password;

  if(nama && password)
  {
      query = `
      SELECT * FROM users 
      WHERE nama = "${nama}"
      `;

      conn.query(query, function(error, data){

          if(data.length > 0)
          {
              for(var count = 0; count < data.length; count++)
              {
                  if(data[count].password == password)
                  {

                      request.session.nama = data[count].nama;
                    
                      // req.session.loggedin = true;
                      
                      response.redirect("/");
                  }
                  else
                  {
                      response.send('Incorrect Password');
                  }
              }
          }
          else
          {
              response.send('Incorrect Email Address');
          }
          response.end();
      });
  }
  else
  {
      response.send('Please Enter Email Address and Password Details');
      response.end();
  }

});

















router.get('/logout', function (req, res, next) {
  
  req.session.destroy();
  res.redirect('/');

})

























// router.post('/login', function (req, res, next) {
//   var nama = req.body.nama;
//   var password = req.body.password;

//   conn.query("SELECT * FROM users WHERE nama = ? AND password = ?", [nama, password], function (err, results) {
    
//     if (err) {
      
//       // var message = "Anda Tidak Bisa Login";
//       // res.redirect('/login');

//       return next(err);

//     }

//     if (results.length>0) {
      
//       req.session.loggedinUser = true;
//       // req.session.loggedinUser = true;
//       // req.session.email_address = email_address ;
//       // req.session.emailAddress = email_address ;
//       req.session.nama = nama ;

//       res.redirect('/');

//     }
//     res.redirect('/login');


//   });



  
// });











































// router.post('/auth',function (req, res) {

//   let nama = req.body.nama;
//   let password = req.body.password;


//   if (nama && password) {
    
//   conn.query(`SELECT * FROM users WHERE nama = '${nama}' AND password = '${password}'`,  function(err,results,fields) {

//     if (err) {

//       throw err;
      
//     }

//     if (results.length > 0) {

//       req.session.loggedin = true;
//       req.session.nama = nama;
      
//       res.redirect('/');

      
//     }

//     else {
//       res.send('Usernama dan Password Salah ! ')
//     }


    
//   });    

    
//   }

//   else {
//     res.send('Masukkan Usernama dan Password !');
//     // res.redirect('/');
//     res.end();
//   }

// });




// router.post('/auth_register', function(req,res) {

  
//   let nama = req.body.nama;
//   let email = req.body.email ;
//   let password = req.body.password;






//   conn.connect(function(err) {
//     if (err){
//         console.log(err);
//     };
//     // checking user already registered or no
//     conn.query(`SELECT * FROM users WHERE nama = '${nama}' AND password  = '${password}'`, function(err, result){
//         if(err){
//             console.log(err);
//         };
//         if(Object.keys(result).length > 0){
//             res.sendFile(__dirnama + '/failReg.html');
//         }else{
//         //creating user page in userPage function
//         function userPage(){
//             // We create a session for the dashboard (user page) page and save the user data to this session:
//             req.session.user = {
//                 nama: nama,
//                 email: email,
//                 password: password 
//             };

//             res.send(`
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <title>Login and register form with Node.js, Express.js and MySQL</title>
//                 <meta charset="UTF-8">
//                 <meta nama="viewport" content="width=device-width, initial-scale=1">
//                 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
//             </head>
//             <body>
//                 <div class="container">
//                     <h3>Hi, ${req.session.user.nama}</h3>
//                     <a href="/">Log out</a>
//                 </div>
//             </body>
//             </html>
//             `);
//         }
//             // inserting new user data
//             var sql = `INSERT INTO users (nama, email, password) VALUES ('${nama}', '${email}', '${password}')`;
//             conn.query(sql, function (err, result) {
//                 if (err){
//                     console.log(err);
//                 }else{
//                     // using userPage function for creating user page
//                     userPage();
//                 };
//             });

//     }

//     });
// });
  








  
// });


























// router.post('/post_register', function (req,res,next) {
 

//   // req.assert('nama','Nama Diperlukan').notEmpty()

//   // req.assert('password', 'Password Jangan Kosong').notEmpty()

//   // req.assert('email','Email Tolong Isi !').isEmail()

//   req.checkBody('nama','Nama Diperlukan').notEmpty()

//   req.checkBody('password', 'Password Jangan Kosong').notEmpty()

//   req.checkBody('email','Email Tolong Isi !').isEmail()


//   var errors = req.validationErrors();

//   if(!errors) {

//   var user = {

//     nama :req.sanitize('nama').escape().trim(),
//     email:reqsanitize('email').escape().trim(),
//     password :req.sanitize('password').escape().trim(),



//   }



//     conn.query('INSERT INTO users SET ?',user, function (err,results) {

//       if(err)
//       {
//         req.flash('error','Maaf Anda Gagal Registrasi');

//         res.redirect('/register');

//       }

//       else {
//         req.flash('success','Anda Telah Berhasil Registrasi, silakan login');
//         res.redirect('/login');
//       }


      
//     })



//   }


//   else {
//     res.render('/register',
//     {
//       title:'Register Page',
//       nama:req.body.nama,
//       email:req.body.email,
//       password:'',
//     }
//     );
//   }



  
// });











module.exports = router;
