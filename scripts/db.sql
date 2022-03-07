\c projo;

CREATE SCHEMA IF NOT EXISTS userSchema;


CREATE TABLE IF NOT EXISTS userSchema.User(
    id SERIAL NOT NULL,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    passwd VARCHAR(45) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS userSchema.Grant(
    id SERIAL NOT NULL,
    usr INT NOT NULL,
    addAction BOOLEAN,
    deleteAction BOOLEAN,
    readAction BOOLEAN,
    lvl INT,
    PRIMARY KEY (id),
    CONSTRAINT FK_User
        FOREIGN KEY (usr) REFERENCES userSchema.User(id)

);

CREATE TABLE IF NOT EXISTS userSchema.Session(
    id INT NOT NULL,
    token VARCHAR(60) NOT NULL,
    
    
    PRIMARY KEY (id),
    FOREIGN KEY(id) REFERENCES userSchema.User(id)
);


