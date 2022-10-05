CREATE TABLE projek (
id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
nama_projek varchar(255) NULL,
tanggal_awal DATE NULL,
tanggal_akhir DATE NULL,
create_at timestamp NULL default CURRENT_TIMESTAMP,
updated_at timestamp NULL default CURRENT_TIMESTAMP


) ENGINE=INNODB AUTO_INCREMENT=1;