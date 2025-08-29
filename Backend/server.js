// server.js (MySQL version)
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

/* -------- middleware -------- */
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});

/* -------- MySQL connection pool -------- */
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || 'koriji';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';

let pool;

async function initDb() {
  try {
    // Create a connection (not pool) to ensure DB exists, then create pool
    const tmpConn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS
    });

    // create database if not exists
    await tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await tmpConn.end();

    // create pool pointing to DB
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // create submissions table if not exists
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS submissions (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await pool.query(createTableSql);

    console.log('✅ MySQL pool created and table ensured.');
  } catch (err) {
    console.error('❌ Failed to initialize DB:', err);
    process.exit(1);
  }
}

/* -------- Routes -------- */

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'All fields are required.' });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return res.status(400).json({ ok: false, error: 'Invalid email.' });

    const sql = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [name.trim(), email.trim(), message.trim()]);

    return res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error('Error saving submission:', err);
    return res.status(500).json({ ok: false, error: 'Server error.' });
  }
});

/* ---- Admin Basic Auth ---- */
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';

app.use('/api/submissions',
  basicAuth({
    users: { [ADMIN_USER]: ADMIN_PASS },
    challenge: true,
    unauthorizedResponse: () => ({ ok: false, error: 'Unauthorized' })
  })
);

// GET submissions (admin)
app.get('/api/submissions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, message, created_at FROM submissions ORDER BY created_at DESC');
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return res.status(500).json({ ok: false, error: 'Server error.' });
  }
});

/* ---- Admin static page (protected) ---- */
app.use('/admin',
  basicAuth({
    users: { [ADMIN_USER]: ADMIN_PASS },
    challenge: true
  }),
  express.static(path.join(__dirname))
);

/* ---- Start server after DB init ---- */
const PORT = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`🔒 Admin dashboard: http://localhost:${PORT}/admin`);
  });
});
