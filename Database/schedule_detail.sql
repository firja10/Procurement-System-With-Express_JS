CREATE TABLE schedule_detail(
    
    id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tanggal DATE NULL,
    produk varchar(255) NULL,
    no_part varchar(255) NULL,
    plan_produksi int(11) NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB AUTO_INCREMENT = 1;