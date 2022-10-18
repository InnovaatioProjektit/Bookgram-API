\c projo;

CREATE SCHEMA IF NOT EXISTS userSchema;
CREATE SCHEMA IF NOT EXISTS bookSchema;


CREATE TABLE IF NOT EXISTS userSchema.User(
    id SERIAL NOT NULL,
    username VARCHAR(45) NOT NULL UNIQUE,
    passwd VARCHAR(128) NOT NULL,
    fullname VARCHAR(25),
    lastname VARCHAR(25),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userSchema.Session(
    pid SERIAL NOT NULL,
    id INT NOT NULL,
    token VARCHAR(256) NOT NULL,
    expires BIGINT,
    
    PRIMARY KEY (pid),
    FOREIGN KEY(id) REFERENCES userSchema.User(id)
);

CREATE TABLE IF NOT EXISTS bookSchema.Review(
    id SERIAL NOT NULL,
    userID INT NOT NULL,
    booktag VARCHAR(20) NOT NULL,
    comment VARCHAR(280),

    PRIMARY KEY(id),
    FOREIGN KEY(userID) REFERENCES userSchema.User(id),

    CONSTRAINT NoDuplicateReview UNIQUE (userID, booktag)
);



CREATE TABLE IF NOT EXISTS bookSchema.Collection(
    id SERIAL NOT NULL,
    cname VARCHAR(30),
    userID INT NOT NULL,
    favourited INT NOT NULL DEFAULT 1 CHECK(favourited > 0),


    PRIMARY KEY(id),
    FOREIGN KEY (userID) REFERENCES userSchema.User(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS bookSchema.Book(
    booktag VARCHAR(20) NOT NULL,
    collectionID INT NOT NULL,
    starred BOOLEAN NOT NULL DEFAULT FALSE,

    PRIMARY KEY (booktag, collectionID),
    FOREIGN KEY (collectionID) REFERENCES bookSchema.Collection(id) ON DELETE CASCADE,

    CONSTRAINT NoDuplicatesCollection UNIQUE(booktag, collectionID)
);