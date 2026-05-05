USE lost_found_db;

DELIMITER //

-- procedure using cursor to display all claims
CREATE PROCEDURE list_all_claims()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE c_id INT;

    DECLARE cur CURSOR FOR 
        SELECT claim_id FROM CLAIMS;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO c_id;

        IF done THEN
            LEAVE read_loop;
        END IF;

        SELECT c_id AS claim_id;

    END LOOP;

    CLOSE cur;
END //

DELIMITER ;

-- test cursor
CALL list_all_claims();