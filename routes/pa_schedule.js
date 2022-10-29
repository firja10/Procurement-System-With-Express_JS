const router = require('express').Router();

var conn = require('../database');





// GET ALL DATA
router.get('/', function (req,res) {

    conn.query('SELECT * FROM pa_schedule', function (err,results) {

        res.render('schedule/pa', {title:'Data Detail Laporan PA Schedule', data:results});
        
     });
    
});







// GET ID 

router.get('/get_id/(:id)', function (req,res) {
    
    var id = req.params.id;

    conn.query(`SELECT * FROM pa_schedule WHERE id = ${id}`, function (err, results) {
        

        if (err) {
            res.redirect('/pa_schedule',{title:'Error Ini Mah'});
        }
        
        
        console.log(results);
        res.render('pa_schedule/get_id', {title:`Detail PA Schedule ${results[0].produk}`, data:results[0]});


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








