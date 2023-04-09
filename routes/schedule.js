const router = require('express').Router();

var conn = require('../database');





// GET ALL DATA
router.get('/', function (req,res) {

let schedule_detail, jabatan;

conn.query('SELECT * FROM schedule_detail', function (err,results1, fields) {

    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

     if (req.session.nama) {
    
        schedule_detail = results1;
        jabatan = results2[0].posisi;


        res.render('schedule/detail', {title:'Data Detail Schedule', data:results1, jabatan:jabatan, user_name:req.session.nama});


    } else {

        res.redirect('/login');
    }

        
     });






    
});


});












// GET ID 

router.get('/get_id/(:id)', function (req,res) {
    
    var id = req.params.id;

    conn.query(`SELECT * FROM schedule_detail WHERE id = ${id}`, function (err, results) {
        

        if (req.session.nama) {
            
        if (err) {
            res.redirect('/schedule_detail',{title:'Error Ini Mah'});
        }
           
        // console.log(results);
        res.render('schedule_detail/get_id', {title:`Detail Schedule ${results[0].produk}`, data:results[0], user_name:req.session.nama});

    } else {

        res.redirect('/login');

    }


    });
    
});






// POST DATA

router.post('/store', function (req,res) {

const {tanggal,produk, no_part, plan_produksi} = req.body;

var form_data = {tanggal,produk, no_part, plan_produksi};


conn.query('INSERT INTO schedule_detail SET ?', form_data, function (err, results) {
   


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
    


    conn.query(`UPDATE schedule_detail SET ? WHERE id = ${id}`, form_data, function (err,results) {
        
        if (err) {
            req.flash('Update Schedule Error');

            res.redirect(`/schedule_detail/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);            
        }

        else {

            req.flash('Schedule Detail sudah ditambahkan');

            res.redirect(`/schedule_detail/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);              
        }


    })
 });



 

 router.get('/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM schedule_detail WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/schedule_detail');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/schedule_detail');

        }
        
    })


 });



module.exports = router











