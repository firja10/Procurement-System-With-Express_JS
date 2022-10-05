-- Belum
CREATE TABLE produk_jadi (
    id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nama_produk varchar(255) NULL,
    no_part varchar(255) NULL,
    stock int(11) NULL,
    created_at timestamp NULL default CURRENT_TIMESTAMP,
    updated_at timestamp NULL default CURRENT_TIMESTAMP


) ENGINE=INNODB AUTO_INCREMENT = 1;