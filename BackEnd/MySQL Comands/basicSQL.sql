show databases;
create database BookMyShow;
use BookMyShow;

CREATE TABLE MOVIES(
	movieID int NOT NULL,
    name varchar(255) NOT NULL,
    rating int,
    releaseDate date,
    UNIQUE(name)
);

DROP TABLE MOVIES;

INSERT INTO MOVIES(movieId, name, releaseDate, rating) VALUES (4, "Pathan", "2021-12-05", 3);

SELECT * from MOVIES;
SELECT name, rating from MOVIES;

SELECT * from MOVIES WHERE releaseDate="2021-12-05" AND movieID=1;
SELECT * from MOVIES WHERE NOT movieID=1;

SELECT * from MOVIES ORDER BY movieID DESC LIMIT 2;









