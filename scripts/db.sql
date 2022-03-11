\c projo;

CREATE SCHEMA IF NOT EXISTS userSchema;


CREATE TABLE IF NOT EXISTS userSchema.User(
    id SERIAL NOT NULL,
    username VARCHAR(45) NOT NULL,
    passwd VARCHAR(128) NOT NULL,
    name VARCHAR(25),
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


