var mysql = require('mysql');
var koneksi = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projek_ahmad_db',
    acquireTimeout:6000000
});

koneksi.connect(function(err) {
    if(err) throw err;
    console.log('Database Connected Succesfully');
    
});
module.exports = koneksi;