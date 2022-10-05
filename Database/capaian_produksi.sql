-- BELUM

CREATE TABLE capaian_produksi (

    id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    produk varchar(255) NULL,
    no_part varchar(255) NULL,
    plan_produksi int(11) NULL,
    hasil_produksi int(11) NULL,
    sisa_produksi int(11) NULL,
    capaian_produksi int(11) NULL,
    created_at timestamp NULL default CURRENT_TIMESTAMP,
    updated_at timestamp NULL default CURRENT_TIMESTAMP   

) ENGINE=INNODB AUTO_INCREMENT = 1  ;