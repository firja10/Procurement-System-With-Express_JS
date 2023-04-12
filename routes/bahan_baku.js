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
    
       
    conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'`, function (err, results1, fields) {
    conn.query("SELECT posisi FROM users WHERE nama = '" + req.session.nama + "'", function (error, results2, fields) {
    if (req.session.nama) {


        let jabatan, data_1;
    
        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_masuk', {title:'Error Bahan Baku Masuk', data:'', jabatan:'', user_name:req.session.nama});
            // next();


        }


        data_1 = results1;
        jabatan = results2[0].posisi;

        res.render('bahan_baku/data_masuk', {title:'Data Bahan Baku Yang Masuk', data:data_1, jabatan:jabatan, user_name:req.session.nama});

        // next();


    }


    else {
    
        res.redirect('/login');
    
    }
        
    });


    });

});






// STORE DATA MASUK BAHAN BAKU







// INSERT PRODUK JADI 

router.post('/data_masuk/store', function (req, res) {
   

    const {no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan, no_part, stok, status_bahan_baku} = req.body;

    var form_data = {
        no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan, no_part, stok, status_bahan_baku
    }


    conn.query(`INSERT INTO bahan_baku_transaksi SET ?`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Data Masuk Bahan Baku Error');

            res.redirect('/bahan_baku/data_masuk');            

        }

        else {

            req.flash('Data Masuk Bahan Baku sudah ditambahkan');

            res.redirect('/bahan_baku/data_masuk');    

        }
        
    });
    
 });










 

















// GET DATA KELUAR BAHAN BAKU
router.get('/data_keluar', function (req,res) {
  



    const {no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan, no_part, stok, status_bahan_baku} = req.body;

    var form_data = {
        no_surat, kode_transaksi, tanggal, nama_bahan, id_bahan, no_part, stok, status_bahan_baku
    }


    conn.query(`INSERT INTO bahan_baku_transaksi SET ?`, form_data, function (err, results) {

    if (req.session.nama) {
        
        if (err) {
            req.flash('Pertambahan Data Keluar Bahan Baku Error');

            res.redirect('/bahan_baku/data_keluar');            

        }

        else {

            req.flash('Data Kelur Bahan Baku sudah ditambahkan');

            res.render('bahan_baku/data_keluar', {title:'Data Bahan Baku Yang Keluar', data:results, user_name:req.session.nama});
        }

    } else {
        res.redirect('/login');
    }

        
    });




});












module.exports = router;