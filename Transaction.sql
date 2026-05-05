USE lost_found_db;

-- example transaction for approving a claim
START TRANSACTION;

UPDATE CLAIMS
SET verification_status = 'approved'
WHERE claim_id = 1;

COMMIT;

-- Demo 
START TRANSACTION;

UPDATE CLAIMS
SET verification_status = 'rejected'
WHERE claim_id = 2;

ROLLBACK;