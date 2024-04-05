// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
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

// API endpoint to fetch list of customers with selected fields
app.get('/customers/listCustomer', (req, res) => {
    const sql = `SELECT id, first_name, mobile, email, address, customer_type, created_at, status FROM customers`;

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

// API endpoint to update customer status
app.put('/customers/:id/status', (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
