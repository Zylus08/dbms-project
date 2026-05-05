USE lost_found_db;

-- trigger: when claim is approved, update status and create handover
DELIMITER //

CREATE TRIGGER trg_claim_approved
AFTER UPDATE ON CLAIMS
FOR EACH ROW
BEGIN
    IF NEW.verification_status = 'approved' THEN

        UPDATE LOST_ITEMS
        SET status = 'closed'
        WHERE lost_id = NEW.lost_id;

        UPDATE FOUND_ITEMS
        SET current_status = 'returned'
        WHERE found_id = NEW.found_id;

        INSERT INTO HANDOVER (claim_id, handover_date, receiver_signature)
        VALUES (NEW.claim_id, CURDATE(), 'Signed');

    END IF;
END //

DELIMITER ;

-- test trigger
UPDATE CLAIMS 
SET verification_status = 'approved'
WHERE claim_id = 2;