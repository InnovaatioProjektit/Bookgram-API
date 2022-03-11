\c projo;

CREATE SCHEMA IF NOT EXISTS userSchema;


CREATE TABLE IF NOT EXISTS userSchema.User(
    id SERIAL NOT NULL,
    username VARCHAR(45) NOT NULL,
    passwd VARCHAR(60) NOT NULL,
    name VARCHAR(25),
    lastname VARCHAR(25)

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userSchema.Session(
    id INT NOT NULL,
    token VARCHAR(60) NOT NULL,
    expires BIGINT,
    
    
    PRIMARY KEY (id),
    FOREIGN KEY(id) REFERENCES userSchema.User(id)
);


