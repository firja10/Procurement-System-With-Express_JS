CREATE TABLE users (
id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nama varchar(255) NULL,
email varchar(255) NULL,
is_sales int(11) NULL,
is_ppic int(11) NULL,
is_produksi int(11) NULL,
is_store int(11) NULL,
is_manajerial int(11) NULL,
posisi varchar(255) NULL,
create_at timestamp NULL default CURRENT_TIMESTAMP,
updated_at timestamp NULL default CURRENT_TIMESTAMP

) ENGINE=INNODB AUTO_INCREMENT=1;