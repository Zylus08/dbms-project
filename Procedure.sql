USE lost_found_db;

-- procedure to approve a claim
DELIMITER //

CREATE PROCEDURE approve_claim(IN p_id INT)
BEGIN
    UPDATE CLAIMS
    SET verification_status = 'approved'
    WHERE claim_id = p_id;
END //

DELIMITER ;

-- test procedure
CALL approve_claim(1);