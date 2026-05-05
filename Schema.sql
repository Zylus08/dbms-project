CREATE DATABASE lost_found_db;
USE lost_found_db;

-- USERS TABLE
CREATE TABLE USERS (
    user_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    role ENUM('student','staff','admin'),
    department VARCHAR(50)
);

-- LOST ITEMS
CREATE TABLE LOST_ITEMS (
    lost_id INT PRIMARY KEY,
    user_id INT,
    item_name VARCHAR(100),
    category VARCHAR(50),
    description VARCHAR(200),
    lost_location VARCHAR(100),
    lost_date DATE,
    status ENUM('open','matched','closed'),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- FOUND ITEMS
CREATE TABLE FOUND_ITEMS (
    found_id INT PRIMARY KEY,
    user_id INT,
    item_name VARCHAR(100),
    category VARCHAR(50),
    description VARCHAR(200),
    found_location VARCHAR(100),
    found_date DATE,
    current_status ENUM('available','claimed','returned'),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- CLAIMS
CREATE TABLE CLAIMS (
    claim_id INT PRIMARY KEY,
    lost_id INT,
    found_id INT,
    claimer_id INT,
    claim_date DATE,
    verification_status ENUM('pending','approved','rejected'),
    FOREIGN KEY (lost_id) REFERENCES LOST_ITEMS(lost_id),
    FOREIGN KEY (found_id) REFERENCES FOUND_ITEMS(found_id),
    FOREIGN KEY (claimer_id) REFERENCES USERS(user_id)
);

-- CLAIMANT VERIFICATION
CREATE TABLE CLAIMANT_VERIFICATION (
    verification_id INT PRIMARY KEY,
    claim_id INT,
    claimer_id INT,
    id_type VARCHAR(30),
    id_number VARCHAR(50),
    proof_description VARCHAR(200),
    photo_proof_path VARCHAR(200),
    verification_status ENUM('pending','approved','rejected'),
    verified_by INT,
    verified_date DATE,
    FOREIGN KEY (claim_id) REFERENCES CLAIMS(claim_id),
    FOREIGN KEY (claimer_id) REFERENCES USERS(user_id),
    FOREIGN KEY (verified_by) REFERENCES USERS(user_id)
);

-- HANDOVER
CREATE TABLE HANDOVER (
    handover_id INT PRIMARY KEY AUTO_INCREMENT,
    claim_id INT,
    handover_date DATE,
    receiver_signature VARCHAR(100),
    FOREIGN KEY (claim_id) REFERENCES CLAIMS(claim_id)
);

SHOW TABLES;