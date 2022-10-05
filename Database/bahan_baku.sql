-- Belum
CREATE TABLE bahan_baku (


    id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nama_bahan varchar(255) NULL,
    no_part varchar(255) NULL,
    stock int(11) NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP

) ENGINE=INNODB AUTO_INCREMENT=1 ;