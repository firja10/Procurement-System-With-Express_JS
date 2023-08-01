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

  var q = "SELECT (SELECT COUNT(*) FROM bahan_baku) AS count_bahan_baku, (SELECT COUNT(*) FROM produk_jadi) AS count_produk_jadi, (SELECT COUNT(*) FROM capaian_produksi) AS count_capaian_produksi, (SELECT COUNT(*) FROM users) AS count_users, (SELECT posisi FROM users WHERE nama = '" + req.session.nama + "') AS jabatan_user ;";
  // var q = "SELECT (SELECT COUNT(*) FROM bahan_baku) AS count_bahan_baku";

  // var jabatan = "SELECT posisi FROM users WHERE nama = " + "'" + req.session.nama + "'";

  // console.log(jabatan);

  // var q_bahan_baku = "SELECT nama_bahan, status_bahan_baku, no_part, stok, COUNT(*) as count FROM bahan_baku_transaksi GROUP BY status_bahan_baku";

  // var q_bahan_baku = 'SELECT nama_bahan,  status_bahan_baku, no_part, stok, COUNT(CASE WHEN status_bahan_baku = "masuk" THEN 1 END) as count_masuk, COUNT(CASE WHEN status_bahan_baku = "keluar" THEN 1 END) as count_keluar FROM bahan_baku_transaksi GROUP BY nama_bahan';
  var q_bahan_baku = 'SELECT nama_bahan,  status_bahan_baku, no_part, stok, COUNT(CASE WHEN status_bahan_baku = "masuk" THEN 1 END) as count_masuk, COUNT(CASE WHEN status_bahan_baku = "keluar" THEN 1 END) as count_keluar FROM bahan_baku_transaksi GROUP BY no_part';
  // var q_produk_jadi = 'SELECT nama_produk,  status_produk_jadi, no_part, stok, COUNT(CASE WHEN status_bahan_baku = "masuk" THEN 1 END) as count_masuk, COUNT(CASE WHEN status_bahan_baku = "keluar" THEN 1 END) as count_keluar FROM bahan_baku_transaksi GROUP BY nama_produk';
  var q_produk_jadi = 'SELECT nama_produk,  status_produk_jadi, no_part, stok, COUNT(CASE WHEN status_bahan_baku = "masuk" THEN 1 END) as count_masuk, COUNT(CASE WHEN status_bahan_baku = "keluar" THEN 1 END) as count_keluar FROM bahan_baku_transaksi GROUP BY no_part';

  var q_capaian_produksi = `SELECT tanggal, shift, bulan, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, FORMAT(persentase_ng, 2) as persentase_ngs, persentase_ng, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM quality`;

//   var q_ppc_dashboard = `SELECT
//   pa.produk AS produk,
//   pa.no_part AS no_part,
//   pa.plan_produksi AS plan_produksi,
//   cp.hasil_produksi AS hasil_produksi,
//   FORMAT((cp.hasil_produksi / pa.plan_produksi) * 100, 2) AS persentase 
// FROM
//   schedule_detail AS pa
// JOIN
//   capaian_produksi AS cp
// ON
//   pa.no_part = cp.no_part;
// `;



var q_ppc_dashboard = `SELECT
sche.produk AS produk,
sche.no_part AS no_part,
SUM(cp.hasil_produksi) AS total_hasil_produksi,
SUM(sche.plan_produksi) AS total_plan_produksi,
FORMAT((SUM(cp.hasil_produksi) / SUM(sche.plan_produksi)) * 100, 2) AS persentase
FROM
schedule_detail AS sche
JOIN
capaian_produksi AS cp ON sche.no_part = cp.no_part
GROUP BY
sche.no_part;
`;

  



  var q_hasil_quality = `SELECT
  cp.produk,
  cp.no_part,
  SUM(cp.hasil_produksi) AS total_hasil_produksi,
  SUM(q.kuantitas) AS total_kuantitas,
  FORMAT((SUM(q.kuantitas) / SUM(cp.hasil_produksi)) * 100, 2) AS persentase_ng
FROM
  capaian_produksi cp
JOIN
  quality q ON cp.no_part = q.no_part
GROUP BY
  cp.produk,
  cp.no_part;
`;


//   var q_ringkasan_produksi = `SELECT
//   nama_produk,
//   no_part,
//   SUM(stok_produk_jadi) AS stok_produk_jadi,
//   SUM(stok_bahan_baku) AS stok_bahan_baku,
//   SUM(stok_bahan_baku) - SUM(stok_produk_jadi) AS stok_produksi,
//   SUM(stok_bahan_baku) + SUM(stok_produk_jadi) + SUM(stok_bahan_baku) - SUM(stok_produk_jadi) AS stok_keseluruhan
// FROM
//   (
//       SELECT
//           nama_produk,
//           no_part,
//           CASE
//               WHEN status_produk_jadi = 'masuk' THEN stok
//               WHEN status_produk_jadi = 'keluar' THEN -stok
//               ELSE 0
//           END AS stok_produk_jadi,
//           0 AS stok_bahan_baku
//       FROM
//           produk_jadi_transaksi

//       UNION ALL

//       SELECT
//           NULL AS nama_produk,
//           no_part,
//           0 AS stok_produk_jadi,
//           CASE
//               WHEN status_bahan_baku = 'masuk' THEN stok
//               WHEN status_bahan_baku = 'keluar' THEN -stok
//               ELSE 0
//           END AS stok_bahan_baku
//       FROM
//           bahan_baku_transaksi
//   ) AS combined_data
// GROUP BY
//   no_part, nama_produk
// ORDER BY
//   no_part;
// `;




var q_ringkasan_produksi = `SELECT 
pj.nama_produk AS nama_produk,
pj.no_part AS no_part,
pj.stok AS stok_produk_jadi,
COALESCE(bb.stok, 0) AS stok_bahan_baku,
COALESCE(stok_bahan_baku_keluar.stok_keluar, 0) - COALESCE(stok_produk_jadi_masuk.stok_masuk, 0) AS stok_produksi,
COALESCE(pj.stok, 0) + COALESCE(bb.stok, 0) + (COALESCE(stok_bahan_baku_keluar.stok_keluar, 0) - COALESCE(stok_produk_jadi_masuk.stok_masuk, 0)) AS stok_keseluruhan
FROM 
produk_jadi_transaksi pj
LEFT JOIN 
bahan_baku_transaksi bb ON pj.no_part = bb.no_part
LEFT JOIN
(SELECT no_part, SUM(stok) AS stok_keluar FROM bahan_baku_transaksi WHERE status_bahan_baku = 'keluar' GROUP BY no_part) stok_bahan_baku_keluar ON pj.no_part = stok_bahan_baku_keluar.no_part
LEFT JOIN
(SELECT no_part, SUM(stok) AS stok_masuk FROM produk_jadi_transaksi WHERE status_produk_jadi = 'masuk' GROUP BY no_part) stok_produk_jadi_masuk ON pj.no_part = stok_produk_jadi_masuk.no_part;


`;









// var q_ringkasan_produksi = `SELECT
// nama_produk,
// no_part,
// SUM(stok_produk_jadi) AS stok_produk_jadi,
// SUM(stok_bahan_baku) AS stok_bahan_baku,
// SUM(CASE WHEN status_bahan_baku = 'keluar' THEN stok ELSE 0 END) - SUM(CASE WHEN status_produk_jadi = 'masuk' THEN stok ELSE 0 END) AS stok_produksi,
// SUM(stok_bahan_baku) + SUM(stok_produk_jadi) + SUM(CASE WHEN status_bahan_baku = 'keluar' THEN stok ELSE 0 END) - SUM(CASE WHEN status_produk_jadi = 'masuk' THEN stok ELSE 0 END) AS stok_keseluruhan
// FROM
// (
// SELECT
//     nama_produk,
//     no_part,
//     CASE
//         WHEN status_produk_jadi = 'masuk' THEN stok
//         WHEN status_produk_jadi = 'keluar' THEN -stok
//         ELSE 0
//     END AS stok_produk_jadi,
//     0 AS stok_bahan_baku
// FROM
//     produk_jadi_transaksi

// UNION ALL

// SELECT
//     NULL AS nama_produk,
//     no_part,
//     0 AS stok_produk_jadi,
//     CASE
//         WHEN status_bahan_baku = 'masuk' THEN stok
//         WHEN status_bahan_baku = 'keluar' THEN -stok
//         ELSE 0
//     END AS stok_bahan_baku
// FROM
//     bahan_baku_transaksi
// ) AS combined_data
// GROUP BY
// no_part
// ORDER BY
// no_part;

// `;



  let bahan_baku, produk_jadi, capaian_produksi, ringkasan_produksi, hasil_quality, ppc_dashboard;


  conn.query(q_bahan_baku, function(err, results1){

    conn.query(q_produk_jadi, function(err, results2){

      conn.query(q_capaian_produksi, function(err, results3){


        conn.query(q_ringkasan_produksi, function(err, results4){

          conn.query(q_hasil_quality, function(err, results5){

            conn.query(q_ppc_dashboard, function(err, results6){









  let jabatan_sekarang

  let count, count2, count3, count4        
conn.query(q, function(err, results){
  if (req.session.nama) {
  if(err) throw err;
    // //count the results
    count = results[0].count_bahan_baku; 
    count2 = results[0].count_produk_jadi;
    count3 = results[0].count_capaian_produksi;
    count4 = results[0].count_users;
   jabatan_sekarang = results[0].jabatan_user;


   bahan_baku = results1;
   produk_jadi = results2;

   capaian_produksi = results3;

   ringkasan_produksi = results4;
   hasil_quality = results5;

   ppc_dashboard = results6;
   
  


    res.render('dashboard', { title: 'Dashboard', user_name:req.session.nama, jabatan:jabatan_sekarang, count: count, count2: count2, count3: count3, count4: count4, bahan_baku:bahan_baku, produk_jadi:produk_jadi, capaian_produksi:capaian_produksi, ringkasan_produksi:ringkasan_produksi, hasil_quality:hasil_quality, ppc_dashboard:ppc_dashboard  })
    // res.render('dashboard', { title: 'Dashboard', user_name:req.session.nama, count: count})  
   
  }

  else {
    res.redirect('/login');
  }



});






});

});


});
  });

});

});











  // res.render('dashboard', { title: 'Dashboard' });




  // if (req.session.nama) {



  //   // res.render('dashboard', { title: 'Dashboard', user_name:req.session.nama });
  //   res.render('dashboard', { title: 'Dashboard', user_name:req.session.nama });
    
  // }

  // else {
  //   res.redirect('/login');
  // }

  // // res.render('dashboard', { title: 'Dashboard' });






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

  if (req.session.nama) {
    
    res.render('dashboard', { title: 'Dashboard', user_name:req.session.nama});
  }
  else {
    res.redirect('/login');
  }

});






/// Bahan Baku Router 


// router.get('/bahan_baku/data_masuk', function (req,res) {
    
//   if (req.session.nama) {
     
//   conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'`, function (err, results) {

//       if (err) {

//           req.flash('Tidak Dapat menampilkan Data Masuk');
//           res.render('bahan_baku/data_masuk', {title:'Error Bahan Baku Masuk', data:'', user_name:req.session.nama});
//           // next();


//       }

//       res.render('bahan_baku/data_masuk', {title:'Data Bahan Baku Yang Masuk', data:results, user_name:req.session.nama});

//       // next();
      
//   })

// }


// else {

//   res.redirect('/login');

// }



// });



















router.get('/login', function(req, res, next) {
  // res.render('dashboard', { title: 'Dashboard', layout:'./layouts/template' });
  res.render('login', { title: 'Login'});
});



router.get('/register',function(req,res,next){

  res.render('register',{title:'Registrasi', message:''});

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

      var messages = "Kamu Sukses Registrasi, Silakan Login";

      // req.session.message = message;
      // res.redirect('/register', {alert_message:message});
    //  var messages = req.flash('message','Data Berhasil Didaftarkan');

    //  req.flash('message','Data Berhasil Didaftarkan');
    //  res.redirect('/register');

      res.render('register',{title:'Registrasi', message:messages});

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
                      // response.render("dashboard", {user_name:request.session.nama});
                  }
                  else
                  {
                      // response.send('Incorrect Password');

                      response.redirect("/login");

                  }
              }
          }
          else
          {
              // response.send('Incorrect Email Address');

              response.redirect("/login");
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
