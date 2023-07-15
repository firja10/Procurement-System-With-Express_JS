const ProdukJadiController = require('../controllers/ProdukJadiController');
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 





// router.get('/', ProdukJadiController.index);








// Get Produk Jadi
router.get('/', function (req,res, ) {
    

    let data_1, jabatan;


    conn.query(`SELECT nama_produk, no_part, 
    SUM(CASE WHEN status_produk_jadi = 'masuk' THEN stok ELSE -stok END) AS total_stok
FROM produk_jadi_transaksi
GROUP BY nama_bahan, no_part;`, function (err,results1, fields) {
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

        if (req.session.nama) {
    
        data_1 = results1;
        jabatan = results2[0].posisi;
      
        // console.log(results1);
        res.render('produk_jadi/index', {title:'Produk Jadi', data:data_1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

    });
   

});

});












// Get Produk Jadi Seluruh
// router.get('/data', function (req,res, ) {
    

//     let data_1, jabatan;


//     conn.query('SELECT * FROM produk_jadi_transaksi', function (err,results1, fields) {
//         conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

//         if (req.session.nama) {
    
//         data_1 = results1;
//         jabatan = results2[0].posisi;
      
//         // console.log(results1);
//         res.render('produk_jadi/data', {title:'Produk Jadi', data:data_1, jabatan:jabatan, user_name:req.session.nama});

//     } else {
//         res.redirect('/login');
//     }

//     });
   

// });

// });





router.get('/data', function (req,res, ) {
    

    let data_1, jabatan;


    conn.query(`SELECT nama_produk, no_part, 
    SUM(CASE WHEN status_produk_jadi = 'masuk' THEN stok ELSE -stok END) AS total_stok
FROM produk_jadi_transaksi
GROUP BY nama_produk, no_part;`, function (err,results1, fields) {
        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

        if (req.session.nama) {
    
        data_1 = results1;
        jabatan = results2[0].posisi;
      
        // console.log(results1);
        res.render('produk_jadi/data', {title:'Produk Jadi', data:data_1, jabatan:jabatan, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

    });
   

});

});











// Edit Produk Jadi 
router.get('/get_id/(:id)', function (req,res, ) {
    

    var id = req.params.id;

    conn.query(`SELECT * FROM produk_jadi WHERE id = '${id}'`, function (err,results) {

        // conn.query('SELECT * FROM produk_jadi WHERE id = ?', id, function (err,results) {


    if (req.session.nama) {
        


        if (err) {
            res.redirect('/produk_jadi',{title:'Error Ini Mah', user_name:req.session.nama});
        }
        
        
        console.log(results);
        res.render('produk_jadi/get_id', {title:`Produk Jadi ${results[0].nama_produk}`, data:results[0], user_name:req.session.nama});

    } else {

    }

    });
   

});


// INSERT PRODUK JADI 

 router.post('/store', function (req, res) {
   

    const {nama_produk, no_part, stock} = req.body;

    var form_data = {
        nama_produk,
        no_part,
        stock,
    }


    conn.query(`INSERT INTO produk_jadi SET ?`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Produk Error');

            res.redirect('/produk_jadi');            

        }

        else {

            req.flash('Produk sudah ditambahkan');

            res.redirect('/produk_jadi');

        }


        
    });
    
 });



 // UPDATE PRODUK JADI 

 router.post('/update/(:id)', function (req, res) {
    

    var id = req.params.id;

    const {nama_produk, no_part, stock} = req.body;

    var form_data = {
        nama_produk,
        no_part,
        stock,
    }

    conn.query(`UPDATE produk_jadi SET ? WHERE id = ${id}`, form_data, function (err,results) {
        
        if (err) {
            req.flash('Update Produk Error');

            res.redirect(`/produk_jadi/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);            

        }

        else {

            req.flash('Produk sudah ditambahkan');

            res.redirect(`/produk_jadi/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);              


        }




    })



 });






// UPDATE PRODUK DELETE


 router.get('/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM produk_jadi WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/produk_jadi');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/produk_jadi');

        }


        
    })


 });




 // DATA MASUK PRODUK JADI
 router.get('/data_masuk', function (req,res) {


    let data_1, jabatan, data_2;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE status_produk_jadi = 'masuk'`, function (err,results1, fields) {
      conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (err, results2, fields) {
        conn.query("SELECT * FROM produk_jadi ", function (error, results3, fields) {


      if (req.session.nama) {
        


        if (err) {
            
            req.flash('produk_jadi/data_masuk');
            res.render('produk_jadi/data_masuk', {title:'Data Masuk Belum Ditemukan', data:'', jabatan:'store', user_name:req.session.nama, produk_jadi:''})

        }


        data_1 = results1;
        jabatan = results2[0].posisi
        data_2 = results3;



    //    if (results.length <0 || results.length == undefined) {
        
    //     results = '';

    //    }

        res.render('produk_jadi/data_masuk', {title:'Data Masuk Produk Jadi', data:data_1, jabatan:jabatan, user_name:req.session.nama, produk_jadi:data_2});

    } else {
        res.redirect('/login');
    }
        
    })
   
 });

});

 });



// DATA MASUK PRODUK JADI ID 


router.get('/data_masuk/(:id)', function (req,res) {

    var id = req.params.id;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE id = '${id}' AND status_produk = 'masuk'`, function (err,results) {
        

    if (req.session.nama) {
        
   
        if (err) {

            req.flash('data_error_masuk_id');

            res.render('produk_jadi/data_masuk_id', {title:`Transaksi Data Masuk dengan Id = ${id} Error`, data:'', user_name:req.session.nama});
        }

        res.render('produk_jadi/data_masuk_id', {title:`Transaksi Data Masuk ${results[0].nama_produk}`, data:results[0], user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

    })


    
})









// INSERT Bahan Baku

router.post('/data_masuk/store', function (req, res) {

    // const {no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok, status_produk_jadi} = req.body;

    const {no_surat, kode_transaksi, tanggal, bulan, nama_produk, id_produk, no_part, stok} = req.body;

    const status_produk_jadi = 'masuk';


    var form_data = {
        no_surat, kode_transaksi, tanggal, bulan, nama_produk, id_produk, no_part, stok, status_produk_jadi
        // no_surat, kode_transaksi, tanggal, nama_bahan, id_produk_jadi, no_part, stok, status_produk_jadi
    }

    conn.query(`INSERT INTO produk_jadi_transaksi SET ?`, form_data, function (err, results) {


        // conn.query(`SELECT * produk_jadi_transaksi ORDER BY id DESC LIMIT 1`, function (err, results1) {

        //     const hasil = results1[0];

        // `SELECT * produk_jadi_transaksi ORDER BY id DESC LIMIT 1`


        const update_produk_jadi = {stock:req.body.stok, no_part:req.body.no_part}


        conn.query(`UPDATE produk_jadi SET stock = stock + ? WHERE no_part = ? `, [req.body.stok, req.body.no_part], function (err, results) {

        if (err) {
            req.flash('Pertambahan Data Masuk Bahan Baku Error');

            // res.redirect('/produk_jadi/data_masuk');      
            
            // res.redirect('/produk_jadi');    

            console.log('produknya tidak masuk');
            

            
            }

            else {

            req.flash('Data Masuk Bahan Baku sudah ditambahkan');

            // res.redirect('/produk_jadi/data_masuk');    

            
            console.log('produknya masuk');

            }



            });

        });


        
    });













    

 // DATA KELUAR PRODUK JADI
 router.get('/data_keluar', function (req,res) {


    let data_1, jabatan, data_2;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE status_produk_jadi = 'keluar'`, function (err,results1, fields) {
      conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (err, results2, fields) {
        conn.query("SELECT * FROM produk_jadi ", function (error, results3, fields) {


      if (req.session.nama) {
        


        if (err) {
            
            req.flash('produk_jadi/data_keluar');
            res.render('produk_jadi/data_keluar', {title:'Data Keluar Belum Ditemukan', data:'', jabatan:'store', user_name:req.session.nama, produk_jadi:''})

        }


        data_1 = results1;
        jabatan = results2[0].posisi
        data_2 = results3;



    //    if (results.length <0 || results.length == undefined) {
        
    //     results = '';

    //    }

        res.render('produk_jadi/data_keluar', {title:'Data Keluar Produk Jadi', data:data_1, jabatan:jabatan, user_name:req.session.nama, produk_jadi:data_2});

    } else {
        res.redirect('/login');
    }
        
    })
   
 });

});

 });



// DATA KELUAR PRODUK JADI ID 


router.get('/data_keluar/(:id)', function (req,res) {

    var id = req.params.id;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE id = '${id}' AND status_produk = 'keluar'`, function (err,results) {
        

    if (req.session.nama) {
        
   
        if (err) {

            req.flash('data_error_keluar_id');

            res.render('produk_jadi/data_keluar_id', {title:`Transaksi Data Keluar dengan Id = ${id} Error`, data:'', user_name:req.session.nama});
        }

        res.render('produk_jadi/data_masuk_id', {title:`Transaksi Data Keluar ${results[0].nama_produk}`, data:results[0], user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

    })


    
})









// INSERT Bahan Baku

router.post('/data_keluar/store', function (req, res) {

    // const {no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok, status_produk_jadi} = req.body;

    const {no_surat, kode_transaksi, tanggal, bulan, nama_produk, id_produk, no_part, stok} = req.body;

    const status_produk_jadi = 'keluar';


    var form_data = {
        no_surat, kode_transaksi, tanggal, bulan, nama_produk, id_produk, no_part, stok, status_produk_jadi
        // no_surat, kode_transaksi, tanggal, nama_bahan, id_produk_jadi, no_part, stok, status_produk_jadi
    }

    conn.query(`INSERT INTO produk_jadi_transaksi SET ?`, form_data, function (err, results) {


        // conn.query(`SELECT * produk_jadi_transaksi ORDER BY id DESC LIMIT 1`, function (err, results1) {

        //     const hasil = results1[0];

        // `SELECT * produk_jadi_transaksi ORDER BY id DESC LIMIT 1`


        const update_produk_jadi = {stock:req.body.stok, no_part:req.body.no_part}


        conn.query(`UPDATE produk_jadi SET stock = stock + ? WHERE no_part = ? `, [req.body.stok, req.body.no_part], function (err, results) {

        if (err) {
            req.flash('Pertambahan Data Masuk Bahan Baku Error');

            // res.redirect('/produk_jadi/data_masuk');      
            
            // res.redirect('/produk_jadi');    

            console.log('produknya tidak keluar');
            

            
            }

            else {

            req.flash('Data Keluar Bahan Baku sudah ditambahkan');

            // res.redirect('/produk_jadi/data_masuk');    

            
            console.log('produknya keluar');

            }



            });

        });


        
    });





























//  });






















 


  // DATA KELUAR PRODUK JADI 

  router.get('/data_keluar', function (req,res) {


    let data_1, jabatan;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE status_produk = 'keluar'`, function (err,results1, fields) {

        conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (err, results2, fields) {


            data_1 = results1;
            jabatan = results2[0].posisi;


    if (req.session.nama) {    
        if (err) {
            req.flash('produk_jadi/data_keluar');
            req.render('produk_jadi/data_keluar', {title:'Error Ini Mah', data : '', jabatan:'store', user_name:req.session.nama});

        }

        res.render('produk_jadi/data_keluar', {title:'Data Keluar Produk Jadi', data:data_1, jabatan:jabatan,  user_name:req.session.nama});

    } else {
        res.redirect('/login');
     }
        
    })

    
 });

});





















module.exports = router;