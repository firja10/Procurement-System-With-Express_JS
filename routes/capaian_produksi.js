
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
    
    conn.query('SELECT id, produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, FORMAT(capaian_produksi, 2) as capaian_produksi, DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan FROM capaian_produksi', function (err,results1, fields) {



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





















// // Get Capaian Pesanan
// router.get('/capaian_pesanan', function (req,res, ) {
    

//     let data_1, jabatan;
    
//     conn.query(`SELECT
//     pa_schedule.id,
//     pa_schedule.tanggal,
//     pa_schedule.produk,
//     pa_schedule.no_part,
//     SUM(pa_schedule.plan_produksi) AS a,
//     SUM(produk_jadi_transaksi.stok) AS b,
//     (SUM(produk_jadi_transaksi.stok) / SUM(pa_schedule.plan_produksi)) * 100 AS c,
//     produk_jadi_transaksi.status_produk_jadi
// FROM
//     pa_schedule
// JOIN
//     produk_jadi_transaksi
// ON
//     pa_schedule.no_part = produk_jadi_transaksi.no_part
// WHERE
//     produk_jadi_transaksi.status_produk_jadi = 'keluar'
// GROUP BY
//     pa_schedule.no_part,
//     pa_schedule.tanggal;
// `, function (err,results1, fields) {
//         conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
//         if (req.session.nama) {
//         data_1 = results1;
//         jabatan = results2[0].posisi;
//         console.log(results1);
//         res.render('capaian_produksi/capaian_pesanan', {title:'Capaian Produksi', data:results1, jabatan:jabatan, user_name:req.session.nama});
//     } else {
//         res.redirect('/login');
//     }

//         });
//     });
// });










// Get Capaian Pesanan
router.get('/capaian_pesanan', function (req,res, ) {
    

    let data_1, jabatan;
    
    conn.query(`SELECT
    CONCAT(MONTHNAME(pa_schedule.tanggal), ' ', YEAR(pa_schedule.tanggal)) AS bulan_tahun,
    pa_schedule.produk,
    pa_schedule.no_part,
    SUM(pa_schedule.plan_produksi) AS a,
    SUM(produk_jadi_transaksi.stok) AS b,
    ROUND((SUM(produk_jadi_transaksi.stok) / SUM(pa_schedule.plan_produksi)) * 100, 2) AS c,
    produk_jadi_transaksi.status_produk_jadi
FROM
    pa_schedule
JOIN
    produk_jadi_transaksi
ON
    pa_schedule.no_part = produk_jadi_transaksi.no_part
WHERE
    produk_jadi_transaksi.status_produk_jadi = 'keluar'
GROUP BY
    bulan_tahun,
    pa_schedule.produk,
    pa_schedule.no_part,
    produk_jadi_transaksi.status_produk_jadi;




`, function (err,results1, fields) {
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
        if (req.session.nama) {
        data_1 = results1;
        jabatan = results2[0].posisi;
        console.log(results1);
        res.render('capaian_produksi/capaian_pesanan', {title:'Capaian Pesanan', data:results1, jabatan:jabatan, user_name:req.session.nama});
    } else {
        res.redirect('/login');
    }

        });
    });
});














// Get Capaian Delivery
// router.get('/capaian_delivery', function (req,res, ) {
    

//     let data_1, jabatan;
    
//     conn.query(`
    
//     SELECT
//     id,
//     DATE_FORMAT(tanggal, '%d %M %Y') AS formatted_tanggal,
//     produk,
//     no_part,
//     SUM(a) AS a,
//     SUM(b) AS b,
//     ROUND((SUM(b) / SUM(a)) * 100, 2) AS c,
//     status_produk_jadi
// FROM (
//     SELECT
//         pa_schedule.id,
//         pa_schedule.tanggal,
//         pa_schedule.produk,
//         pa_schedule.no_part,
//         pa_schedule.plan_produksi AS a,
//         0 AS b,
//         produk_jadi_transaksi.status_produk_jadi
//     FROM
//         pa_schedule
//     JOIN
//         produk_jadi_transaksi
//     ON
//         pa_schedule.no_part = produk_jadi_transaksi.no_part
//         AND pa_schedule.tanggal = produk_jadi_transaksi.tanggal
//     WHERE
//         produk_jadi_transaksi.status_produk_jadi = 'keluar'
    
//     UNION ALL
    
//     SELECT
//         pa_schedule.id,
//         pa_schedule.tanggal,
//         pa_schedule.produk,
//         pa_schedule.no_part,
//         0 AS a,
//         produk_jadi_transaksi.stok AS b,
//         produk_jadi_transaksi.status_produk_jadi
//     FROM
//         pa_schedule
//     JOIN
//         produk_jadi_transaksi
//     ON
//         pa_schedule.no_part = produk_jadi_transaksi.no_part
//         AND pa_schedule.tanggal = produk_jadi_transaksi.tanggal
//     WHERE
//         produk_jadi_transaksi.status_produk_jadi = 'keluar'
// ) AS subquery
// GROUP BY
//     id,
//     tanggal,
//     produk,
//     no_part,
//     status_produk_jadi;




// `, function (err,results1, fields) {
//         conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
//         if (req.session.nama) {
//         data_1 = results1;
//         jabatan = results2[0].posisi;
//         console.log(results1);
//         res.render('capaian_produksi/capaian_delivery', {title:'Capaian Delivery', data:results1, jabatan:jabatan, user_name:req.session.nama});
//     } else {
//         res.redirect('/login');
//     }

//         });
//     });
// });








router.get('/capaian_delivery', function (req,res, ) {
    

    let data_1, jabatan;
    
    conn.query(`
    
    SELECT
    sd.produk,
    sd.no_part,
    sd.tanggal,
    sd.jumlah_plan_produksi AS a,
    cp.jumlah_hasil_produksi AS b,
    (cp.jumlah_hasil_produksi / sd.jumlah_plan_produksi) * 100 AS c
FROM
    (
        SELECT
            produk,
            no_part,
            tanggal,
            SUM(plan_produksi) AS jumlah_plan_produksi
        FROM
            schedule_detail
        GROUP BY
            produk, no_part, tanggal
    ) AS sd
JOIN
    (
        SELECT
            produk,
            no_part,
            tanggal,
            SUM(hasil_produksi) AS jumlah_hasil_produksi
        FROM
            capaian_produksi
        GROUP BY
            produk, no_part, tanggal
    ) AS cp ON sd.no_part = cp.no_part AND sd.tanggal = cp.tanggal;







`, function (err,results1, fields) {
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
        if (req.session.nama) {
        data_1 = results1;
        jabatan = results2[0].posisi;
        console.log(results1);
        res.render('capaian_produksi/capaian_delivery', {title:'Capaian Delivery', data:results1, jabatan:jabatan, user_name:req.session.nama});
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