
const router = require('express').Router();

var conn = require('../database');
var session = require('express-session');
var bodyParser = require('body-parser'); 





// router.get('/', Capaian ProduksiJadiController.index);








// Get Capaian Produksi Jadi
router.get('/', function (req,res, ) {
    


    conn.query('SELECT * FROM capaian_produksi', function (err,results) {
        if (req.session.nama) {
    
      
        console.log(results);
        res.render('capaian_produksi/index', {title:'Capaian Produksi', data:results, user_name:req.session.nama});

    } else {
        res.redirect('/login');
    }

    });
   

})



// Edit Capaian Produksi Jadi 
router.get('/get_id/(:id)', function (req,res, ) {
    

    var id = req.params.id;

    conn.query(`SELECT * FROM capaian_produksi WHERE id = '${id}'`, function (err,results) {

        // conn.query('SELECT * FROM capaian_produksi WHERE id = ?', id, function (err,results) {


    if (req.session.nama) {
        


        if (err) {
            res.redirect('/capaian_produksi',{title:'Error Ini Mah', user_name:req.session.nama});
        }
        
        
        console.log(results);
        res.render('capaian_produksi/get_id', {title:`Capaian Produksi ${results[0].nama_produk}`, data:results[0], user_name:req.session.nama});

    } else {

    }

    });
   

});


// INSERT Capaian Produksi JADI 

 router.post('/store', function (req, res) {
   

    const {produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi} = req.body;

    var form_data = {
        produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi
    }


    conn.query(`INSERT INTO capaian_produksi SET ?`, form_data, function (err, results) {
    
        if (err) {
            req.flash('Pertambahan Capaian Produksi Error');

            res.redirect('/capaian_produksi');            

        }

        else {

            req.flash('Produk sudah ditambahkan');

            res.redirect('/capaian_produksi');

        }


        
    });
    
 });



 // UPDATE Capaian Produksi JADI 

 router.post('/update/(:id)', function (req, res) {
    

    var id = req.params.id;

    const {produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi} = req.body;

    var form_data = {
        produk, no_part, plan_produksi, hasil_produksi, sisa_produksi, capaian_produksi
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
            res.redirect('/capaian_produksi');

        }

        else {

            req.flash('Data dapat dihapus');
            res.redirect('/capaian_produksi');

        }


        
    })


 });




 module.exports = router