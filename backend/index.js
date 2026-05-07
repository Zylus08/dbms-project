const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- AUTHENTICATION ROUTES ---
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API working properly"
  });
});
// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await db.query('SELECT * FROM USERS WHERE name = ? OR email = ?', [username, username]);
        if (users.length > 0) {
            const user = users[0];
            if (user.password === password) {
                delete user.password; // Don't send password back to client
                res.json({ user: user });
            } else {
                res.status(401).json({ error: 'Incorrect password!' });
            }
        } else {
            res.status(401).json({ error: 'User not found. Please sign up!' });
        }
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password, phone, role } = req.body;
        
        if (!password) return res.status(400).json({ error: 'Password is required' });

        const [exist] = await db.query('SELECT * FROM USERS WHERE name = ?', [username]);
        if (exist.length > 0) {
            return res.status(400).json({ error: 'User already exists. Please login.' });
        }
        
        const [[{ nextId }]] = await db.query('SELECT COALESCE(MAX(user_id), 0) + 1 AS nextId FROM USERS');
        const defaultEmail = `${username.replace(/\s+/g,'').toLowerCase()}@gmail.com`;
        await db.query(`INSERT INTO USERS (user_id, name, email, phone, role, department, password) VALUES (?, ?, ?, ?, ?, 'General', ?)`, 
            [nextId, username, defaultEmail, phone || '9999999999', role || 'student', password]);
            
        const [newUser] = await db.query('SELECT * FROM USERS WHERE user_id = ?', [nextId]);
        delete newUser[0].password;
        res.json({ user: newUser[0] });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- ITEMS ROUTES ---
app.get('/api/lost-items', async (req, res) => {
    try {
        const q = `
            SELECT L.*, U.name as contact_name, U.email as contact_email, U.phone as contact_phone 
            FROM LOST_ITEMS L LEFT JOIN USERS U ON L.user_id = U.user_id 
            ORDER BY L.lost_id DESC
        `;
        const [rows] = await db.query(q);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/found-items', async (req, res) => {
    try {
        const q = `
            SELECT F.*, U.name as contact_name, U.email as contact_email, U.phone as contact_phone 
            FROM FOUND_ITEMS F LEFT JOIN USERS U ON F.user_id = U.user_id 
            ORDER BY F.found_id DESC
        `;
        const [rows] = await db.query(q);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/lost-items', async (req, res) => {
    try {
        const { item_name, category, description, lost_location, lost_date, user_id } = req.body;
        const [[{ nextId }]] = await db.query('SELECT COALESCE(MAX(lost_id), 0) + 1 AS nextId FROM LOST_ITEMS');
        const q = 'INSERT INTO LOST_ITEMS (lost_id, user_id, item_name, category, description, lost_location, lost_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(q, [nextId, user_id || 1, item_name, category, description, lost_location, lost_date, 'open']);
        res.status(201).json({ message: 'Success', lost_id: nextId });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/found-items', async (req, res) => {
    try {
        const { item_name, category, description, found_location, found_date, user_id } = req.body;
        const [[{ nextId }]] = await db.query('SELECT COALESCE(MAX(found_id), 0) + 1 AS nextId FROM FOUND_ITEMS');
        const q = 'INSERT INTO FOUND_ITEMS (found_id, user_id, item_name, category, description, found_location, found_date, current_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(q, [nextId, user_id || 1, item_name, category, description, found_location, found_date, 'available']);
        res.status(201).json({ message: 'Success', found_id: nextId });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- DELETE ROUTES ---
app.delete('/api/lost-items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM CLAIMANT_VERIFICATION WHERE claim_id IN (SELECT claim_id FROM CLAIMS WHERE lost_id = ?)', [id]);
        await db.query('DELETE FROM HANDOVER WHERE claim_id IN (SELECT claim_id FROM CLAIMS WHERE lost_id = ?)', [id]);
        await db.query('DELETE FROM CLAIMS WHERE lost_id = ?', [id]);
        await db.query('DELETE FROM LOST_ITEMS WHERE lost_id = ?', [id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/found-items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM CLAIMANT_VERIFICATION WHERE claim_id IN (SELECT claim_id FROM CLAIMS WHERE found_id = ?)', [id]);
        await db.query('DELETE FROM HANDOVER WHERE claim_id IN (SELECT claim_id FROM CLAIMS WHERE found_id = ?)', [id]);
        await db.query('DELETE FROM CLAIMS WHERE found_id = ?', [id]);
        await db.query('DELETE FROM FOUND_ITEMS WHERE found_id = ?', [id]);
        res.json({ message: 'Deleted successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Backend server is running on http://localhost:${PORT}`));
