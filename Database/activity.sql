CREATE TABLE activity (

id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
name_activity varchar(255) NULL,
desc_activity varchar(255) NULL,
tanggal_awal DATE NULL,
tanggal_akhir DATE NULL,
create_at timestamp NULL default CURRENT_TIMESTAMP,
updated_at timestamp NULL default CURRENT_TIMESTAMP

) ENGINE=INNODB AUTO_INCREMENT=1;