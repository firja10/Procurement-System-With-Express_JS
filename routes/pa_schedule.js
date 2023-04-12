
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 




// GET ALL DATA
router.get('/', function (req,res) {


    let q = "SELECT (SELECT * FROM pa_schedule) AS pa_schedules, (SELECT posisi FROM users WHERE nama = '" + req.session.nama + "') AS jabatan_user ;";

    // conn.query('SELECT * FROM pa_schedule', function (err,results) {

    let data_1, jabatan;




    // execute the query to select all rows from table1
conn.query('SELECT * FROM pa_schedule', function (error, results1, fields) {
    if (error) throw error;
  
    // execute the query to select all rows from table2
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


        if(req.session.nama)

        {

      if (error) throw error;
  
      // combine the results from both queries into a single array
      const combinedResults = results1.concat(results2);
  
      data_1 = results1;
      jabatan = results2[0].posisi;



  // res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:results, user_name:req.session.nama});

  res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:data_1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }




    });
  });








    //     conn.query(q, function (err,results) {

    //     if(req.session.nama)

    //     {

    //         if(err) throw err;

    //         data_1 = results[0].pa_schedules;
    //         jabatan = results[0].jabatan_user;



    //     // res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:results, user_name:req.session.nama});

    //     res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:data_1, jabatan:jabatan, user_name:req.session.nama});

    //     } else {
    //         res.redirect('/login');
    //     }
        
    //  });




    
});










// GET ALL DATA
router.get('/laporan', function (req,res) {

    let q = "SELECT (SELECT * FROM pa_schedule) AS pa_schedules, (SELECT posisi FROM users WHERE nama = '" + req.session.nama + "') AS jabatan_user ;";
    // conn.query('SELECT * FROM pa_schedule', function (err,results) {
    let data_1, jabatan;

    // execute the query to select all rows from table1
    conn.query('SELECT * FROM pa_schedule', function (error, results1, fields) {
    if (error) throw error;
  
    // execute the query to select all rows from table2
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

        if(req.session.nama)

        {

      if (error) throw error;
  
      // combine the results from both queries into a single array
      const combinedResults = results1.concat(results2);
  
      data_1 = results1;
      jabatan = results2[0].posisi;



  // res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:results, user_name:req.session.nama});

  res.render('schedule/laporan_pa', {title:'Data Detail Laporan PA Schedule', data:data_1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }




    });
  });




    
});



/// Get Data JSON Untuk Chart Under Bracket
router.get('/under_bracket', function (req,res) {

    conn.query(`SELECT bulan, COUNT(*) as produks FROM pa_schedule where produk='UNDER BRACKET' GROUP BY bulan`, function (err,results1, fields) {
        // conn.query('SELECT bulan FROM pa_schedule', function (err,results1, fields) {
    
            // console.log(results1);
        res.json(results1);
        
    });
    
    
});



/// Get Data JSON Untuk Chart Inner Tube
router.get('/inner_tube', function (req,res) {

    conn.query(`SELECT bulan, COUNT(*) as produks FROM pa_schedule where produk='INNER TUBE' GROUP BY bulan`, function (err,results1, fields) {
        // conn.query('SELECT bulan FROM pa_schedule', function (err,results1, fields) {
    
            // console.log(results1);
        res.json(results1);
        
    });
    
    
});





/// Get Data JSON Untuk Chart Inner Tube
router.get('/total', function (req,res) {

    conn.query(`SELECT bulan, COUNT(*) as produks FROM pa_schedule GROUP BY bulan`, function (err,results1, fields) {
        // conn.query('SELECT bulan FROM pa_schedule', function (err,results1, fields) {
    
            // console.log(results1);
        res.json(results1);
        
    });
    
    
});






















// GET ID 

router.get('/get_id/(:id)', function (req,res) {
    
    var id = req.params.id;

    conn.query(`SELECT * FROM pa_schedule WHERE id = ${id}`, function (err, results1, fields) {
        
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
        if (req.session.nama) {
            


        if (err) {
            res.redirect('/pa_schedule',{title:'Error Ini Mah'});
        }
        
        
        console.log(results1);
        res.render('schedule/get_id_pa', {title:`Detail PA Schedule ${results1[0].produk}`, data:results1[0], jabatan:results2[0].posisi, user_name:req.session.nama});

        

    } else {
        res.redirect('/login');
    }

});


    });
    
});






// POST DATA

router.post('/store', function (req,res) {

const {tanggal,produk, no_part, plan_produksi} = req.body;

var form_data = {tanggal,produk, no_part, plan_produksi};


conn.query('INSERT INTO pa_schedule SET ?', form_data, function (err, results) {
   


    if (err) {

        req.flash('Data Detail Jadwal Tidak Masuk');
        res.redirect('/');
        
    }

    else {

        req.flash('Data Detail Jadwal Masuk');
        res.redirect('/');

    }
    
});   
});







// UPDATE DATA 
router.post('/update/(:id)', function (req, res) {
    

    var id = req.params.id;

    const {tanggal,produk, no_part, plan_produksi} = req.body;

    var form_data = {tanggal,produk, no_part, plan_produksi};
    


    conn.query(`UPDATE pa_schedule SET ? WHERE id = ${id}`, form_data, function (err,results) {
        

        

        if (err) {
            req.flash('Update Schedule Error');

            res.redirect(`/pa_schedule/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);            
        }

        else {

            req.flash('Schedule Detail sudah ditambahkan');

            res.redirect(`/pa_schedule/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);              
        }


    })
 });



 

 router.get('/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM pa_schedule WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/pa_schedule');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/pa_schedule');

        }
        
    })


 });






module.exports = router








