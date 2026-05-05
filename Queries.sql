USE lost_found_db;

-- basic data check
SELECT * FROM USERS;
SELECT * FROM LOST_ITEMS;
SELECT * FROM FOUND_ITEMS;
SELECT * FROM CLAIMS;

-- join: shows user + claimed lost item
SELECT 
    u.name,
    l.item_name,
    c.claim_id,
    c.verification_status
FROM CLAIMS c
JOIN USERS u ON c.claimer_id = u.user_id
JOIN LOST_ITEMS l ON c.lost_id = l.lost_id;

-- multi join: links lost item with found item
SELECT 
    u.name,
    l.item_name AS lost_item,
    f.item_name AS found_item,
    c.verification_status
FROM CLAIMS c
JOIN USERS u ON c.claimer_id = u.user_id
JOIN LOST_ITEMS l ON c.lost_id = l.lost_id
JOIN FOUND_ITEMS f ON c.found_id = f.found_id;

-- count items per category
SELECT category, COUNT(*) AS total_items
FROM FOUND_ITEMS
GROUP BY category;

-- total number of claims
SELECT COUNT(*) AS total_claims FROM CLAIMS;

-- lost items that have been claimed
SELECT * FROM LOST_ITEMS
WHERE lost_id IN (SELECT lost_id FROM CLAIMS);

-- pending claims only
SELECT * FROM CLAIMS
WHERE verification_status = 'pending';

-- latest lost items first
SELECT * FROM LOST_ITEMS
ORDER BY lost_date DESC;