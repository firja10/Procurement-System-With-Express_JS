let mysql = require('mysql');

let koneksi = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'projek_ahmad',
});


koneksi.connect(function (error) {

    if (!!error) {
        console.log(error);
    }

    else {
        console.log('Koneksi Tercapai');
    }
    
});

module.exports = koneksi;

