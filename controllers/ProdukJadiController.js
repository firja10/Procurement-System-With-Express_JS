
const flash = require('express-flash');
const ProdukJadi = require('../models/ProdukJadi');





// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'projek_ahmad_db',
// });

// conn.connect();







module.exports = {

    index: (res,req) => {

        ProdukJadi.fetchData(req.conn, (err,rows)=>{

            if (err) {

                req.flash('error', 'Data Tidak Berhasil Ditampilkan');
                res.render('produk_jadi/index', {data:'', title:'Error'});
                
            }
        
        else {
            // req.flash('success', 'Data Berhasil Ditampilkan');
            res.render('produk_jadi/index',{data:rows,title:'Daftar Produk Jadi'});
        }

        });

    },


    // store:(req,res)=>{

    //     ProdukJadi.insertData(req.conn, (err,rows)=>{

    //         if (err) {
                
    //             req.flash('error', 'Data Tidak Berhasil Ditambahkan');
    //             res.redirect('/produk_jadi');

    //         }

    //         else {
    //             req.flash('success','Data Berhasil Ditambahkan');
    //             res.redirect('/produk_jadi');
    //         }

    //     });

    // },






}


