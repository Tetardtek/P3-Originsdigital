DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories_playlists_videos;
DROP TABLE IF EXISTS playlists_videos;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
role VARCHAR(15) NOT NULL
);

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
nickname VARCHAR(30) NOT NULL,
mail VARCHAR(90) NOT NULL,
birthdate DATE NOT NULL,
logdate DATE NOT NULL,
password VARCHAR(200) NOT NULL,
roles_id INT,
FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE videos (
id INT AUTO_INCREMENT PRIMARY KEY,
link VARCHAR(250) NOT NULL,
title VARCHAR(100) NOT NULL,
description VARCHAR(300),
is_free BOOLEAN DEFAULT false
);

CREATE TABLE playlists (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
description VARCHAR(300) NOT NULL
);

CREATE TABLE categories (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
description VARCHAR(300)
);

CREATE TABLE playlists_videos (
id INT AUTO_INCREMENT PRIMARY KEY,
playlists_id INT NOT NULL,
videos_id INT NOT NULL,
FOREIGN KEY (playlists_id) REFERENCES playlists(id),
FOREIGN KEY (videos_id) REFERENCES videos(id)
);

CREATE TABLE categories_playlists_videos (
id INT AUTO_INCREMENT PRIMARY KEY,
playlists_id INT NOT NULL,
categories_id INT NOT NULL,
FOREIGN KEY (playlists_id) REFERENCES playlists(id),
FOREIGN KEY (categories_id) REFERENCES categories(id)
);

CREATE TABLE comments (
id INT AUTO_INCREMENT PRIMARY KEY,
users_id INT NOT NULL,
videos_id INT NOT NULL,
postDate DATE NOT NULL,
content VARCHAR(200) NOT NULL,
FOREIGN KEY (users_id) REFERENCES users(id),
FOREIGN KEY (videos_id) REFERENCES videos(id)
);