// backend/server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crm',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Additional error handling for MySQL connection
db.on('error', (err) => {
    console.error('MySQL Error:', err);
});

// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API endpoint to fetch list of customers with first_name and created_at fields
app.get('/customers/listCustomer', (req, res) => {
    const sql = `SELECT id, first_name, mobile, email, address, customer_type, created_at, status, picture FROM customers`;

    // Execute SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching customer data:', err);
            return res.status(500).send('Error fetching customer data');
        }
        console.log('Customer data fetched successfully');
        res.status(200).json(result);
    });
});

// API endpoint to handle adding a new customer with profile picture upload
app.post('/customers/addCustomer', upload.single('picture'), (req, res) => {
    const { firstName, lastName, email, mobile, bankDetails, passport, facebookId, dateOfBirth, address, customerType, sex, status } = req.body;
    const picture = req.file ? req.file.path : null; // Get uploaded file path or set to null if not provided
    
    // Convert status to database-compatible format
    const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null;

    // Convert sex to database-compatible format
    const dbSex = sex === 'Male' ? 1 : sex === 'Female' ? 0 : null;

    const sql = `INSERT INTO customers (first_name, last_name, email, mobile, picture, bank_details, passport, facebook_id, date_of_birth, address, customer_type, sex, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, email, mobile, picture, bankDetails, passport, facebookId, dateOfBirth, address, customerType, dbSex, dbStatus];

    // Execute SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding customer:', err);
            return res.status(500).send('Error adding customer');
        }
        console.log('Customer added successfully');
        res.status(200).send('Customer added successfully');
    });
});

// API endpoint to update customer status
app.put('/customers/updateStatus/:id', (req, res) => {
    const customerId = req.params.id;
    const { status } = req.body;
    
    // Convert status to database-compatible format
    const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null;

    const sql = `UPDATE customers SET status = ? WHERE id = ?`;

    // Execute SQL query
    db.query(sql, [dbStatus, customerId], (err, result) => {
        if (err) {
            console.error('Error updating customer status:', err);
            return res.status(500).send('Error updating customer status');
        }
        console.log('Customer status updated successfully');
        res.status(200).send('Customer status updated successfully');
    });
});

app.listen(8087, () => {
    console.log("Server listening on port 8087");
});
