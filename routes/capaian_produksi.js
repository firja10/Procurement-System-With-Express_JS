
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 





// router.get('/', Capaian ProduksiJadiController.index);








// Get Capaian Produksi Jadi
// router.get('/', function (req,res, ) {
    

//     let data_1, jabatan;
    
//     conn.query('SELECT produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM capaian_produksi', function (err,results1, fields) {



//         conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


//         if (req.session.nama) {
    
//         data_1 = results1;
//         jabatan = results2[0].posisi;
      
//         console.log(results1);
//         res.render('capaian_produksi/index', {title:'Capaian Produksi', data:results1, jabatan:jabatan, user_name:req.session.nama});

//     } else {
//         res.redirect('/login');
//     }

//         });





//     });
   

// });


















// Get Capaian Produksi Jadi
router.get('/', function (req,res, ) {
    

    let data_1, jabatan;
    
    // conn.query('SELECT * FROM quality', function (err,results1, fields) {
    conn.query('SELECT id, tanggal, shift, bulan, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM quality', function (err,results1, fields) {

        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


        if (req.session.nama) {
    
        data_1 = results1;
        jabatan = results2[0].posisi;
      
        console.log(results1);
        res.render('capaian_produksi/index', {title:'Dashboard Capaian', data:results1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }



        });

    });
   

});



















// Get Capaian Produksi Jadi
router.get('/capaian', function (req,res, ) {
    

    let data_1, jabatan;
    
    conn.query('SELECT id, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM capaian_produksi', function (err,results1, fields) {



        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


        if (req.session.nama) {
    
        data_1 = results1;
        jabatan = results2[0].posisi;
      
        console.log(results1);
        res.render('capaian_produksi/capaian', {title:'Capaian Produksi', data:results1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

        });





    });
   

});




















// Get Capaian Produksi Jadi
router.get('/quality', function (req,res, ) {
    

    let data_1, jabatan;
    
    // conn.query('SELECT * FROM quality', function (err,results1, fields) {
    conn.query('SELECT id, tanggal, shift, bulan, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM quality', function (err,results1, fields) {

        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


        if (req.session.nama) {
    
        data_1 = results1;
        jabatan = results2[0].posisi;
      
        console.log(results1);
        res.render('capaian_produksi/quality', {title:'Quality', data:results1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }



        });

    });
   

});
























router.post('/quality/store', function (req, res) {
   

    const {tanggal, bulan, shift, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng} = req.body;

    var form_data = {
        tanggal, bulan, shift, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng
    }


    conn.query(`INSERT INTO quality SET ?`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Data Quality Error');

            res.redirect('/capaian_produksi/quality');            

        }

        else {

            req.flash('Quality sudah ditambahkan');

            res.redirect('/capaian_produksi/quality');

        }


        
    });
    
 });








 

// UPDATE Quality DELETE


router.get('/quality/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM quality WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/capaian_produksi/quality');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/capaian_produksi/quality');

        }


        
    })


 });











 
// Edit Capaian Produksi Jadi 
router.get('/quality/get_id/(:id)', function (req,res, ) {
    

    var id = req.params.id;

    conn.query(`SELECT * FROM quality WHERE id = '${id}'`, function (err,results) {

        // conn.query('SELECT * FROM capaian_produksi WHERE id = ?', id, function (err,results) {


            
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


            if (req.session.nama) {
        
            data_1 = results;
            jabatan = results2[0].posisi;
          
            console.log(results);
            res.render('capaian_produksi/get_quality_id', {title:'Capaian Produksi', data:data_1, jabatan:jabatan, user_name:req.session.nama});
    
        } else {
            res.redirect('/login');
        }
    
            });


    });
   

});









 
router.post('/quality/update/(:id)', function (req, res) {
   

    const {tanggal, bulan, shift, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng} = req.body;

    var form_data = {
        tanggal, bulan, shift, produk, no_part, hasil_produksi, jenis_kecacatan, kuantitas, persentase_ng
    }

    let id = req.params.id;


    conn.query(`UPDATE quality SET ? WHERE id = ${id}`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Data Quality Error');

            res.redirect(`/capaian_produksi/quality/get_id/${id}`);            

        }

        else {

            req.flash('Quality sudah ditambahkan');

            res.redirect(`/capaian_produksi/quality/get_id/${id}`);

        }


        
    });
    
 });






























// Edit Capaian Produksi Jadi 
router.get('/get_id/(:id)', function (req,res, ) {
    

    var id = req.params.id;

    conn.query(`SELECT * FROM capaian_produksi WHERE id = '${id}'`, function (err,results) {

        // conn.query('SELECT * FROM capaian_produksi WHERE id = ?', id, function (err,results) {


            
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {


            if (req.session.nama) {
        
            data_1 = results;
            jabatan = results2[0].posisi;
          
            console.log(results);
            res.render('capaian_produksi/get_id', {title:'Capaian Produksi', data:data_1, jabatan:jabatan, user_name:req.session.nama});
    
        } else {
            res.redirect('/login');
        }
    
            });


    });
   

});


// INSERT Capaian Produksi JADI 

 router.post('/store', function (req, res) {
   

    const {tanggal, bulan, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi} = req.body;

    var form_data = {
        tanggal, bulan, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi
    }


    conn.query(`INSERT INTO capaian_produksi SET ?`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Capaian Produksi Error');

            res.redirect('/capaian_produksi/capaian');            

        }

        else {

            req.flash('Produk sudah ditambahkan');

            res.redirect('/capaian_produksi/capaian');

        }


        
    });
    
 });



 // UPDATE Capaian Produksi JADI 

 router.post('/update/(:id)', function (req, res) {
    

    var id = req.params.id;

    const {tanggal, bulan, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi} = req.body;

    var form_data = {
        tanggal, bulan, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi
    }

    conn.query(`UPDATE capaian_produksi SET ? WHERE id = ${id}`, form_data, function (err,results) {
        
        if (err) {
            req.flash('Update Capaian Produksi Error');

            res.redirect(`/capaian_produksi/get_id/${id}`);   
            // res.redirect(`/capaian_produksi`);            

        }

        else {

            req.flash('Produk sudah ditambahkan');

            res.redirect(`/capaian_produksi/get_id/${id}`);   
            // res.redirect(`/capaian_produksi`);              


        }




    })



 });






// UPDATE Capaian Produksi DELETE


 router.get('/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM capaian_produksi WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/capaian_produksi/capaian');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/capaian_produksi/capaian');

        }


        
    })


 });




 module.exports = router