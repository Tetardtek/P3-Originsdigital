DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS playlists_videos;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(15),
PRIMARY KEY (`id`)
);

CREATE TABLE categories (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE comments (
id INT NOT NULL AUTO_INCREMENT,
content VARCHAR(200) NOT NULL,
date DATE NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE playlists (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
link VARCHAR(250) NOT NULL,
description VARCHAR(300) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(30) DEFAULT NULL,
lastname VARCHAR(30) DEFAULT NULL,
pseudoname VARCHAR(30)  NOT NULL,
mail VARCHAR(90),
birthdate DATE NOT NULL,
logdate DATE NOT NULL,
password VARCHAR(200),
roles_id INT,
PRIMARY KEY (`id`),
FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE videos (
id INT NOT NULL AUTO_INCREMENT,
link VARCHAR(250) NOT NULL,
title VARCHAR(100) NOT NULL,
description VARCHAR(300) NOT NULL,
categories_id INT NOT NULL,
is_free BOOLEAN DEFAULT false,
PRIMARY KEY (`id`),
FOREIGN KEY (categories_id) REFERENCES categories(id)
);

CREATE TABLE playlists_videos (
id INT NOT NULL AUTO_INCREMENT,
playlists_id INT NOT NULL,
videos_id INT NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (playlists_id) REFERENCES playlists(id),
FOREIGN KEY (videos_id) REFERENCES videos(id)
);

CREATE TABLE contents (
id INT NOT NULL AUTO_INCREMENT,
users_id INT,
videos_id INT,
comments_id INT,
playlists_id INT,
PRIMARY KEY (`id`),
FOREIGN KEY (users_id) REFERENCES users(id),
FOREIGN KEY (videos_id) REFERENCES videos(id),
FOREIGN KEY (comments_id) REFERENCES comments(id),
FOREIGN KEY (playlists_id) REFERENCES playlists(id)
);
