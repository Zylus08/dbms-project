USE lost_found_db;
-- view to see claim details with user and item info
CREATE VIEW CLAIM_DETAILS AS
SELECT 
    c.claim_id,
    u.name,
    l.item_name,
    c.verification_status
FROM CLAIMS c
JOIN USERS u ON c.claimer_id = u.user_id
JOIN LOST_ITEMS l ON c.lost_id = l.lost_id;

-- check view output
SELECT * FROM CLAIM_DETAILS;