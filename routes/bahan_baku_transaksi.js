var conn = require('../database');

const router = require('express').Router();




// GET DATA MASUK BAHAN BAKU

router.get('/data_masuk', function (req,res) {
    
    conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'masuk'`, function (err, results) {

    if (req.session.nama) {
        


        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_masuk', {title:'Error Bahan Baku Masuk', data:'', user_name:req.session.nama});
            
        }

        res.render('bahan_baku/data_masuk', {title:'Data Bahan Baku Yang Masuk', data:results, user_name:req.session.nama});
       
    } else {
        res.redirect('/login');
    }

        
    });



});







// GET DATA KELUAR BAHAN BAKU
router.get('/data_keluar', function (req,res) {
    
    conn.query(`SELECT * FROM bahan_baku_transaksi WHERE status_bahan_baku = 'keluar'`, function (err, results) {

    if (req.session.nama) {
        


        if (err) {

            req.flash('Tidak Dapat menampilkan Data Masuk');
            res.render('bahan_baku/data_keluar', {title:'Error Bahan Baku Masuk', data:'', user_name:req.session.nama});
            
        }

        res.render('bahan_baku/data_keluar', {title:'Data Bahan Baku Yang Masuk', data:results, user_name:req.session.nama});
        
    } else {
        res.redirect('/login');
    }

    })

});



module.exports = router