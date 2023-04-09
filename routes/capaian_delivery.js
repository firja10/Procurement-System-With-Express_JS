const ProdukJadiController = require('../controllers/ProdukJadiController');
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 





// router.get('/', ProdukJadiController.index);








// Get Produk Jadi
router.get('/', function (req,res, ) {
    

    let data_1, jabatan;


    conn.query('SELECT * FROM capaian_delivery', function (err,results1, fields) {
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

















 





















module.exports = router;