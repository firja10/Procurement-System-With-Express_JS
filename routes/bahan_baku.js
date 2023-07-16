var conn = require('../database');

var session = require('express-session');
var bodyParser = require('body-parser'); 


const BahanBakuController = require('../controllers/BahanBakuController');

const router = require('express').Router();

// router.get('/', BahanBakuController.index);
router.post('/store', BahanBakuController.store);
// router.get('/(:id)', BahanBakuController.getid);
// router.get('/get_id/(:id)', BahanBakuController.get_id);

// router.put('/update', BahanBakuController.updateData);
router.post('/update/:id', BahanBakuController.updateData);

// router.post('/delete/:id', BahanBakuController.deleteData);

router.get('/delete/(:id)', BahanBakuController.deleteData);







router.get('/', function (req,res, next) {
    
       
    conn.query(`SELECT * FROM bahan_baku`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });

});








router.get('/data', function (req,res, next) {
    
       
    // conn.query(`SELECT * FROM bahan_baku_transaksi`, function (err, results1, fields) {
    
    conn.query(`SELECT nama_bahan, no_part, 
    SUM(CASE WHEN status_bahan_baku = 'masuk' THEN stok ELSE -stok END) AS total_stok
FROM bahan_baku_transaksi
GROUP BY nama_bahan, no_part;
`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/data', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });

});












router.get('/get_id/:id', function (req,res, next) {
    
    var id = req.params.id;
       
    conn.query(`SELECT * FROM bahan_baku WHERE id = '${id}'`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/get_id', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/get_id', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });

});









//// DATA MASUK BAHAN BAKU

// GET DATA MASUK BAHAN BAKU

router.get('/data_masuk', function (req,res, next) {
    
       
    // conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'`, function (err, results1, fields) {

    conn.query(`SELECT 
    id,
    no_surat,
    kode_transaksi,
    bulan,
    nama_bahan,
    id_bahan,
    no_part,
    status_bahan_baku,
    DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan,
    
    stok FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'`, function (err, results1, fields) {

    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

        // conn.query("SELECT id, nama_bahan, stock FROM bahan_baku ", function (error, results3, fields) {

        conn.query("SELECT * FROM bahan_baku ", function (error, results3, fields) {

    if (req.session.nama) {


        let jabatan, data_1, bahan_baku;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_masuk', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', bahan_baku:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;
        bahan_baku = results3;

        res.render('bahan_baku/data_masuk', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, bahan_baku:bahan_baku, user_name:req.session.nama});

        // next();
    }


    else {
    
        res.redirect('/login');
    
    }
        
         });

        });


    });

});






// STORE DATA MASUK BAHAN BAKU







// INSERT Bahan Baku

router.post('/data_masuk/store', function (req, res) {

    // const {no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok, status_bahan_baku} = req.body;

    const {no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok} = req.body;

    const status_bahan_baku = 'masuk';


    var form_data = {
        no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok, status_bahan_baku
        // no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan_baku, no_part, stok, status_bahan_baku
    }

    conn.query(`INSERT INTO bahan_baku_transaksi SET ?`, form_data, function (err, results) {


        // conn.query(`SELECT * bahan_baku_transaksi ORDER BY id DESC LIMIT 1`, function (err, results1) {

        //     const hasil = results1[0];

        // `SELECT * bahan_baku_transaksi ORDER BY id DESC LIMIT 1`


        const update_bahan_baku = {stock:req.body.stok, no_part:req.body.no_part}


        conn.query(`UPDATE bahan_baku SET stock = stock + ? WHERE no_part = ? `, [req.body.stok, req.body.no_part], function (err, results) {

        if (err) {
            req.flash('Pertambahan Data Masuk Bahan Baku Error');

            // res.redirect('/bahan_baku/data_masuk');      
            
            res.redirect('/bahan_baku');      

            }

            else {

            req.flash('Data Masuk Bahan Baku sudah ditambahkan');

            res.redirect('/bahan_baku/data_masuk');    

            }



            });

        });

        
    });

//  });


 // Delete Data Masuk 
 
 router.get('/data_masuk/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM bahan_baku_transaksi WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/bahan_baku/data_masuk');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/bahan_baku/data_masuk');

        }
        
    })


 });






 
 // Select Data Masuk 
 
 router.get('/data_masuk/get_id/(:id)', function (req, res) {
    
    var id = req.params.id;
       
    conn.query(`SELECT * FROM bahan_baku_transaksi WHERE id = '${id}'`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_masuk_id', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/data_masuk_id', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });


 });












 // UPDATE DATA MASUK

 router.post('/data_masuk/update/(:id)', function (req, res) {
    

    var id = req.params.id;

    // const {no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok} = req.body;
    const {no_surat, kode_transaksi, tanggal, bulan, no_part, stok} = req.body;

    var form_data = {
        // no_surat, kode_transaksi, tanggal, bulan, nama_bahan, id_bahan, no_part, stok, status_bahan_baku

        no_surat, kode_transaksi, tanggal, bulan, no_part, stok
        // no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan_baku, no_part, stok, status_bahan_baku
    }

    

    conn.query(`UPDATE bahan_baku_transaksi SET ? WHERE id = ${id}`, form_data, function (err,results) {
        
        if (err) {
            req.flash('Update Bahan Baku Masuk Error');

            // res.redirect(`/bahan_baku/data_masuk/get_id/${id}`);   

            res.redirect(`/bahan_baku/data_masuk/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);            

        }

        else {

            req.flash('Data bahan baku masuk sudah ditambahkan');

            // res.redirect(`/bahan_baku/data_masuk/get_id/${id}`);  
            res.redirect(`/bahan_baku/data_masuk`);   
            // res.redirect(`/produk_jadi`);              


        }




    })



 });







 








 // Delete Data Masuk 
 
 router.get('/data_keluar/delete/(:id)', function (req, res) {
    
    var id = req.params.id;

    conn.query(`DELETE FROM bahan_baku_transaksi WHERE id = ${id}`, function (err, results) {

        if (err) {
            
            req.flash('Data tidak bisa dihapus');
            res.redirect('/bahan_baku/data_keluar');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/bahan_baku/data_keluar');

        }
        
    })


 });






 

















// GET DATA KELUAR BAHAN BAKU
router.post('/data_keluar/store', function (req,res) {
  
    // const {no_surat, kode_transaksi, tanggal, nama_bahan, bulan, id_bahan, no_part, stok} = req.body;

    const {no_surat, kode_transaksi, tanggal, nama_bahan, bulan, id_bahan, no_part, stok} = req.body;

    const status_bahan_baku = 'keluar';

    var form_data = {
        no_surat, kode_transaksi, tanggal, nama_bahan, bulan, id_bahan, no_part, stok, status_bahan_baku
    }


    conn.query(`INSERT INTO bahan_baku_transaksi SET ?`, form_data, function (err, results) {



        

        conn.query(`UPDATE bahan_baku SET stock = stock - ? WHERE no_part = ? `, [req.body.stok, req.body.no_part], function (err, results) {

    if (err) {
        req.flash('Pertambahan Data Masuk Bahan Baku Error');

        // res.redirect('/bahan_baku/data_keluar');      
        
        res.redirect('/bahan_baku/data_keluar');        

        }

        else {

        req.flash('Data Masuk Bahan Baku sudah ditambahkan');

        res.redirect('/bahan_baku/data_keluar');    

        }



        });



    });


});
















//// DATA KELUAR BAHAN BAKU

// GET DATA KELUAR BAHAN BAKU

router.get('/data_keluar', function (req,res, next) {
    



    // SELECT 
    // id,
    // no_surat,
    // kode_transaksi,
    // bulan,
    // nama_bahan,
    // id_bahan,
    // no_part,
    // status_bahan_baku,
    // DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan,
    
    // stok FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'
       
    // conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'keluar'`, function (err, results1, fields) {

    conn.query(`SELECT 
    id,
    no_surat,
    kode_transaksi,
    bulan,
    nama_bahan,
    id_bahan,
    no_part,
    status_bahan_baku,
    DATE_FORMAT(tanggal, "%d %M %Y") as formatted_tanggal, DATE_FORMAT(tanggal, "%M") as formatted_bulan,
    
    stok FROM bahan_baku_transaksi WHERE status_bahan_baku = 'keluar'`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {

        // conn.query("SELECT id, nama_bahan, stock FROM bahan_baku ", function (error, results3, fields) {

        conn.query("SELECT * FROM bahan_baku ", function (error, results3, fields) {

    if (req.session.nama) {


        let jabatan, data_1, bahan_baku;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_keluar', {title:'Error Bahan Baku Keluar', data:'', jabatan:'', bahan_baku:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;
        bahan_baku = results3;

        res.render('bahan_baku/data_keluar', {title:'Data Bahan Baku Yang Keluar', data:data_1, jabatan:jabatan, bahan_baku:bahan_baku, user_name:req.session.nama});

        // next();
    }


    else {
    
        res.redirect('/login');
    
    }
        
         });

        });


    });

});













 // Select Data Keluar
 router.get('/data_keluar/get_id/(:id)', function (req, res) {
    
    var id = req.params.id;
       
    conn.query(`SELECT * FROM bahan_baku_transaksi WHERE id = '${id}'`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Keluar');
            res.render('bahan_baku/data_keluar_id', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/data_keluar_id', {title:'Data Bahan Baku Yang Keluar', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });


 });













 

 // UPDATE DATA MASUK

 router.post('/data_keluar/update/(:id)', function (req, res) {
    
    var id = req.params.id;

    const {no_surat, kode_transaksi, tanggal, bulan, no_part, stok} = req.body;

    var form_data = {
        no_surat, kode_transaksi, tanggal, bulan, no_part, stok
        // no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan_baku, no_part, stok, status_bahan_baku
    }

    conn.query(`UPDATE bahan_baku_transaksi SET ? WHERE id = ${id}`, form_data, function (err,results) {
        
        if (err) {
            req.flash('Update Bahan Baku Keluar Error');

            res.redirect(`/bahan_baku/data_keluar/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);            

        }

        else {

            req.flash('Data bahan baku keluar sudah ditambahkan');

            res.redirect(`/bahan_baku/data_keluar/get_id/${id}`);   
            // res.redirect(`/produk_jadi`);              


        }




    })



 });















module.exports = router;