
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 




// GET ALL DATA
router.get('/', function (req,res) {


    let q = "SELECT (SELECT * FROM pa_schedule) AS pa_schedules, (SELECT posisi FROM users WHERE nama = '" + req.session.nama + "') AS jabatan_user ;";

    // conn.query('SELECT * FROM pa_schedule', function (err,results) {

    let data_1, jabatan;


        conn.query(q, function (err,results) {

        if(req.session.nama)

        {

            if(err) throw err;

            data_1 = results[0].pa_schedules;
            jabatan = results[0].jabatan_user;



        // res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:results, user_name:req.session.nama});

        res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        } else {
            res.redirect('/login');
        }
        
     });
    
});










// GET ALL DATA
router.get('/laporan', function (req,res) {


    let q = "SELECT (SELECT * FROM pa_schedule) AS pa_schedule, (SELECT posisi FROM users WHERE nama = '" + req.session.nama + "') AS position";

    // conn.query('SELECT * FROM pa_schedule', function (err,results) {

    let data_1, jabatan;


    conn.query(q, function (err,results) {


        if(req.session.nama)

        {

            data_1 = results[0].pa_schedule;
            jabatan = results[0].position;


        res.render('schedule/laporan_pa', {title:'Data Detail Laporan PA Schedule', data:data_1, user_name:req.session.nama, jabatan:jabatan});

        } else {
            res.redirect('/login');
        }
        
     });
    
});








// GET ID 

router.get('/get_id/(:id)', function (req,res) {
    
    var id = req.params.id;

    conn.query(`SELECT * FROM pa_schedule WHERE id = ${id}`, function (err, results) {
        

        if (req.session.nama) {
            


        if (err) {
            res.redirect('/pa_schedule',{title:'Error Ini Mah'});
        }
        
        
        console.log(results);
        res.render('pa_schedule/get_id', {title:`Detail PA Schedule ${results[0].produk}`, data:results[0], user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }


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








