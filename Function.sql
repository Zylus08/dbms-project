DELIMITER //

CREATE FUNCTION get_claim_status(p_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_status VARCHAR(20);

    SELECT verification_status 
    INTO v_status
    FROM CLAIMS
    WHERE claim_id = p_id
    LIMIT 1;

    RETURN IFNULL(v_status, 'not found');
END //

DELIMITER ;

