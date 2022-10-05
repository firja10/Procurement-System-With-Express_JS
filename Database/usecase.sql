CREATE TABLE usecase (
id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
name_usecase varchar(255) NULL,
desc_usecase varchar(255) NULL,
keterangan varchar(255) NULL,
create_at timestamp NULL default CURRENT_TIMESTAMP,
updated_at timestamp NULL default CURRENT_TIMESTAMP

) ENGINE=INNODB AUTO_INCREMENT=1;