CREATE DATABASE database_rosales;
USE database_rosales;
--Users Table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username varchar(16) NOT NULL,
    password varchar(60) NOT NULL,
    fullname varchar(100) NOT NULL,
    domicilio varchar(150) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY(id);
ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
--DESCRIBE users;
-- Links tables
CREATE TABLE pedidos(
    id INT(11) NOT NULL,
    nombre varchar(150) NOT NULL,
    cantidad varchar(255) NOT NULL,
    mensaje TEXT,
    user_id INT(11),
    created_At timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE pedidos ADD PRIMARY KEY (id);
ALTER TABLE pedidos MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
--DESCRIBE pedidos;