// var conn = require('../database');


module.exports = {



    fetchData:(conn, callback)=>{

        conn.query('SELECT * FROM produk_jadi', callback);

    },

    getById:(conn,id,callback)=>{

        conn.query("SELECT * FROM produk_jadi WHERE id = " + id, callback );

    },

    insertData:(conn,callback)=>{
        conn.query("INSERT INTO produk_jadi SET ?",callback);
    },

    updateData:(conn,data,id,callback)=>{

        conn.query("UPDATE produk_jadi SET ? WHERE id = " + id,data,callback);

    },

    deleteData:(conn,id,callback)=>{
        conn.query("DELETE FROM produk_jadi WHERE id = " + id,callback);
    }


}