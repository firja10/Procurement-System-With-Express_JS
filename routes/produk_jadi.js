const ProdukJadiController = require('../controllers/ProdukJadiController');
const router = require('express').Router();

var conn = require('../database');





// router.get('/', ProdukJadiController.index);








// Get Produk Jadi
router.get('/', function (req,res, ) {
    

    conn.query('SELECT * FROM produk_jadi', function (err,results) {
        
        
        console.log(results);
        res.render('produk_jadi/index', {title:'Produk Jadi', data:results});

    });
   

})



// Edit Produk Jadi 
router.get('/get_id/(:id)', function (req,res, ) {
    

    var id = req.params.id;

    conn.query(`SELECT * FROM produk_jadi WHERE id = '${id}'`, function (err,results) {

        // conn.query('SELECT * FROM produk_jadi WHERE id = ?', id, function (err,results) {


        if (err) {
            res.redirect('/produk_jadi',{title:'Error Ini Mah'});
        }
        
        
        console.log(results);
        res.render('produk_jadi/get_id', {title:`Produk Jadi ${results[0].nama_produk}`, data:results[0]});

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


    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE produk_jadi_transaksi = 'masuk'`, function (err,results) {


        if (err) {
            
            req.flash('produk_jadi/data_masuk');
            res.render('produk_jadi/data_masuk', {title:'Data Masuk Belum Ditemukan', data:''})

        }

    //    if (results.length <0 || results.length == undefined) {
        
    //     results = '';

    //    }

        res.render('produk_jadi/data_masuk', {title:'Data Masuk Produk Jadi', data:results});
        
    })
   
 });



// DATA MASUK PRODUK JADI ID 


router.get('/data_masuk/(:id)', function (req,res) {

    var id = req.params.id;

    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE id = '${id}' AND status_produk = 'masuk'`, function (err,results) {
        
        if (err) {

            req.flash('data_error_masuk_id');

            res.render('produk_jadi/data_masuk_id', {title:`Transaksi Data Masuk dengan Id = ${id} Error`, data:''});
        }

        res.render('produk_jadi/data_masuk_id', {title:`Transaksi Data Masuk ${results[0].nama_produk}`, data:results[0]});



    })


    
})





















 


  // DATA KELUAR PRODUK JADI 

  router.get('/data_keluar', function (req,res) {


    conn.query(`SELECT * FROM produk_jadi_transaksi WHERE produk_jadi_transaksi = 'keluar'`, function (err,results) {

        if (err) {
            
            req.flash('/produk_jadi', {title:'Error Ini Mah', data : ''});

        }

        res.render('produk_jadi/data_keluar', {title:'Data Keluar Produk Jadi', data:results});
        
    })

    
 });
















module.exports = router;