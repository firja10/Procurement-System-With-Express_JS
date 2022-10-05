CREATE TABLE produk_jadi_transaksi (
    id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    no_surat varchar(255) NULL,
    kode_transaksi varchar(255) NULL,
    tanggal DATE NULL,
    nama_produk varchar(255) NULL,
    id_produk varchar(255) NULL,
    no_part varchar(255) NULL,
    stok int(11) NULL,
    created_at timestamp NULL default CURRENT_TIMESTAMP,
    updated_at timestamp NULL default CURRENT_TIMESTAMP


) ENGINE=INNODB AUTO_INCREMENT = 1;
