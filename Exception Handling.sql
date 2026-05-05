USE lost_found_db;

DELIMITER //

-- procedure with exception handling
CREATE PROCEDURE safe_insert_claim()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Error occurred while inserting claim' AS message;
    END;

    INSERT INTO CLAIMS VALUES (100,1,1,3,CURDATE(),'pending');

END //

DELIMITER ;

-- test exception
CALL safe_insert_claim();