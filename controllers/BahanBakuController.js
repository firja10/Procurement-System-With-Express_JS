const flash = require('express-flash');
const BahanBaku = require('../models/BahanBaku');
var session = require('express-session');
var bodyParser = require('body-parser'); 







module.exports = {

    index: (req,res) => {
        
        BahanBaku.fetchData(req.conn, (err,rows)=>{

        if (req.session.nama) {
            
   
            if (err) {
                req.flash('error', `${error.message}`);
                res.render('bahan_baku/index', {data:'', title:'Error', user_name:req.session.nama});
                // res.render('bahan_baku', {data:'', title:'Error'});
            }

            else {

                res.render('bahan_baku/index',{data:rows, title:'Data Bahan Baku', user_name:req.session.nama});

                // res.render('bahan_baku',{data:rows, title:'Data Bahan Baku'});

            }

        } else {

            res.redirect('/login');

        }



        })

    },

    store : (req,res) => {

        const {nama_bahan, no_part, stock} = req.body;
        var form_data = {
            nama_bahan,
         
            no_part,
            stock,
        }


        BahanBaku.insertData(req.conn,form_data,(err, result)=>{

            if (err) {
                req.flash('error', 'Terdapat Kesalahan Database');
               res.redirect('/bahan_baku');
                // res.render('bahan_baku', {data:'', title:'Error'});
            }

            else {

                req.flash('Success', 'Data Bahan Baku telah ditambahkan');
                res.redirect('/bahan_baku');

                // res.render('bahan_baku',{data:rows, title:'Data Bahan Baku'});

            }


            
        });



    },


    get_id: (req, res) => {

        // const {id,nama_bahan,no_part,stock} = req.body;

        let id = req.params.id;

        BahanBaku.getById(req.conn,id,(err,rows)=>{

        if (req.session.nama) {
            
            if (err) {
                req.flash('error', `${error.message}`);
                res.render('bahan_baku/get_id', {data:'', title:'Error', user_name:req.session.nama});
                // res.render('bahan_baku', {data:'', title:'Error'});
            }

            else {

                res.render('bahan_baku/get_id',{data:rows[0], title:'Data Bahan Baku Spesial', user_name:req.session.nama});
                // res.render('bahan_baku',{data:rows, title:'Data Bahan Baku'});
            }

        }

        else {
            res.redirect('/login');
        }
        


        });

    },



    updateData: (req, res) => {

        const {nama_bahan, no_part, stock} = req.body;

        var form_data = {
            nama_bahan,
            no_part,
            stock
        }

        let id = req.params.id;


        BahanBaku.updateData(req.conn,form_data,id,(err,rows)=>{

            if (err) {

                req.flash('error', 'Tidak Bisa Update Data');
                res.redirect('/bahan_baku');
                
            }

            else {
                req.flash('success', 'Data Berhasil Diupdate');
                res.redirect('/bahan_baku');
            }



        });


    },


    deleteData : (req,res) => {

        let id = req.params.id;

        BahanBaku.deleteData(req.conn,id,(err,rows)=>{

            if (err) {

                req.flash('error','Data Tidak Berhasil Dihapus');
                res.redirect('/bahan_baku');           
            }

            else {
                req.flash('success', 'Data Berhasil Dihapus');
                res.redirect('/bahan_baku');
            }

        });      


    }










};