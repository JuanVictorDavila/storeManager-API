DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(50) NOT NULL,
    category VARCHAR(30) NOT NULL,
    manufacturer VARCHAR(30) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
