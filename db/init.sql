CREATE DATABASE IF NOT EXISTS yoga;

USE yoga;

CREATE TABLE IF NOT EXISTS batch (
    batchId INT AUTO_INCREMENT PRIMARY KEY,
    batch VARCHAR(255) UNIQUE
);
INSERT INTO batch (batch) Values ("6-7AM");
INSERT INTO batch (batch) Values ("7-8AM");
INSERT INTO batch (batch) Values ("8-9AM");
INSERT INTO batch (batch) Values ("5-6PM");

CREATE TABLE IF NOT EXISTS user (
    userId VARCHAR(255) PRIMARY KEY,
    batchId INT,
    name VARCHAR(255),
    age INT,
    phoneNumber VARCHAR(20),
    enrollMonth DATETIME,
    password VARCHAR(255),
    latestPayment DATETIME,
    createdOn DATETIME,
    FOREIGN KEY (batchId) REFERENCES batch(batchId)
);


CREATE TABLE IF NOT EXISTS Payment (
    paymentId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    paymentDate DATETIME,
    paymentComplete BOOLEAN,
    FOREIGN KEY (userId) REFERENCES user(userId)
);

