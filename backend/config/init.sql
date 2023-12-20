CREATE DATABASE IF NOT EXISTS yoga;

USE yoga;

CREATE TABLE IF NOT EXISTS batch (
    batchid INT AUTO_INCREMENT PRIMARY KEY,
    batch VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS user (
    userid VARCHAR(255) PRIMARY KEY,
    batchid INT,
    name VARCHAR(255),
    age INT,
    phonenumber VARCHAR(20),
    enrollMonth DATETIME,
    password VARCHAR(255),
    latestPayment DATETIME,
    createdOn DATETIME,
    FOREIGN KEY (batchid) REFERENCES batch(batchid)
);


CREATE TABLE IF NOT EXISTS Payment (
    paymentId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    paymentDate DATETIME,
    paymentComplete BOOLEAN,
    FOREIGN KEY (userId) REFERENCES user(userid)
);

