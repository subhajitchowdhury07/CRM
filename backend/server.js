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
    const { firstName, lastName, email, mobile, address, customerType, status } = req.body;
    const picture = req.file ? req.file.path : null; // Get uploaded file path or set to null if not provided
    
    // Convert status to database-compatible format
    const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null;

    const sql = `INSERT INTO customers (first_name, last_name, email, mobile, picture, address, customer_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, email, mobile, picture, address, customerType, dbStatus];

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

// API endpoint to update customer details
app.put('/customers/:id', upload.single('picture'), (req, res) => {
    const customerId = req.params.id;
    const { firstName, lastName, email, mobile, address, customerType, status } = req.body;
    let picture = null;

    // Check if a new picture is uploaded
    if (req.file) {
        picture = req.file.path;
    }

    // Convert status to database-compatible format
    const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null;

    // SQL query to update customer details
    let sql = `UPDATE customers SET `;
    const values = [];

    // Append fields to update based on provided data
    if (firstName) {
        sql += `first_name = ?, `;
        values.push(firstName);
    }
    if (lastName) {
        sql += `last_name = ?, `;
        values.push(lastName);
    }
    if (email) {
        sql += `email = ?, `;
        values.push(email);
    }
    if (mobile) {
        sql += `mobile = ?, `;
        values.push(mobile);
    }
    if (picture) {
        sql += `picture = ?, `;
        values.push(picture);
    }
    if (address) {
        sql += `address = ?, `;
        values.push(address);
    }
    if (customerType) {
        sql += `customer_type = ?, `;
        values.push(customerType);
    }
    if (status) {
        sql += `status = ?, `;
        values.push(dbStatus);
    }

    // Remove trailing comma and add WHERE clause
    sql = sql.slice(0, -2); // Remove last comma and space
    sql += ` WHERE id = ?`;
    values.push(customerId);

    // Execute SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).send('Error updating customer');
        }
        console.log('Customer updated successfully');
        res.status(200).send('Customer updated successfully');
    });
});

// API endpoint to delete a customer
app.delete('/customers/:id', (req, res) => {
    const customerId = req.params.id;

    // SQL query to delete a customer by ID
    const sql = `DELETE FROM customers WHERE id = ?`;

    // Execute SQL query
    db.query(sql, customerId, (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).send('Error deleting customer');
        }
        console.log('Customer deleted successfully');
        res.status(200).send('Customer deleted successfully');
    });
});

/// API endpoint to fetch all invoices
app.get('/sales/invoices', (req, res) => {
    const sql = `SELECT 
        id,
        invoiceNo,
        customerName,
        total,
        invoiceDate,
        pdcDueDate,
        paymentTerm,
        status
    FROM invoices`;

    // Execute SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching invoice data:', err);
            return res.status(500).send('Error fetching invoice data');
        }
        console.log('Invoice data fetched successfully');
        res.status(200).json(result);
    });
});


// API endpoint to add a new deposit
app.post('/transaction/NewDeposit', (req, res) => {
    const { account, date, description, amount } = req.body;

    const sql = `INSERT INTO deposits (account, date, description, amount) VALUES (?, ?, ?, ?)`;
    const values = [account, date, description, amount];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding deposit:', err);
            return res.status(500).send('Error adding deposit');
        }
        console.log('Deposit added successfully');
        res.status(200).send('Deposit added successfully');
    });
});

// API endpoint to fetch list of recent deposits
app.get('/transaction/recent', (req, res) => {
    const sql = `SELECT description, amount FROM deposits ORDER BY date DESC LIMIT 10`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching recent deposits:', err);
            return res.status(500).send('Error fetching recent deposits');
        }
        console.log('Recent deposits fetched successfully');
        res.status(200).json(result);
    });
});

// API endpoint to add a new invoice
app.post('/sales/NewInvoice', (req, res) => {
    const {
        invoiceNo,
        invoiceDate,
        refNo,
        refDate,
        reverseCharge,
        billType,
        placeOfSupply,
        paymentTerm,
        pdcDueDate,
        customerName,
        billingAddress,
        shippingAddress,
        gstin,
        state,
        contactPerson,
        itemCode,
        itemName,
        quantity,
        uom,
        itemRate,
        taxPercentage,
        discount,
        total,
        pinCode,
        hsnSacNumber,
        statusValue,
        bankName,
        ifscCode,
        accountNumber,
        micrNumber,
        bankDetails
    } = req.body;

    const sql = `INSERT INTO invoices (
        invoiceNo,
        invoiceDate,
        refNo,
        refDate,
        reverseCharge,
        billType,
        placeOfSupply,
        paymentTerm,
        pdcDueDate,
        customerName,
        billingAddress,
        shippingAddress,
        gstin,
        state,
        contactPerson,
        itemCode,
        itemName,
        quantity,
        uom,
        itemRate,
        taxPercentage,
        discount,
        total,
        pinCode,
        hsnSacNumber,
        statusValue,
        bankName,
        ifscCode,
        accountNumber,
        micrNumber,
        bankDetails
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        invoiceNo,
        invoiceDate,
        refNo,
        refDate,
        reverseCharge,
        billType,
        placeOfSupply,
        paymentTerm,
        pdcDueDate,
        customerName,
        billingAddress,
        shippingAddress,
        gstin,
        state,
        contactPerson,
        itemCode,
        itemName,
        quantity,
        uom,
        itemRate,
        taxPercentage,
        discount,
        total,
        pinCode,
        hsnSacNumber,
        statusValue,
        bankName,
        ifscCode,
        accountNumber,
        micrNumber,
        bankDetails,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding invoice:', err);
            return res.status(500).send('Error adding invoice');
        }
        console.log('Invoice added successfully');
        res.status(200).send('Invoice added successfully');
    });
});

// API endpoint to update invoice details
app.put('/sales/invoices/:id', (req, res) => {
    const invoiceId = req.params.id;
    // Extract the fields to update from the request body
    const { 
        invoiceNo,
        customerName,
        invoiceDate,
        total,
        pdcDueDate,
        paymentTerm,
        status
    } = req.body;

    // Construct the SQL query to update the invoice
    let sql = `UPDATE invoices SET `;
    const values = [];

    // Check each field for update
    if (invoiceNo) {
        sql += `invoiceNo = ?, `;
        values.push(invoiceNo);
    }
    if (customerName) {
        sql += `customerName = ?, `;
        values.push(customerName);
    }
    if (invoiceDate) {
        sql += `invoiceDate = ?, `;
        values.push(invoiceDate);
    }
    if (total) {
        sql += `total = ?, `;
        values.push(total);
    }
    if (pdcDueDate) {
        sql += `pdcDueDate = ?, `;
        values.push(pdcDueDate);
    }
    if (paymentTerm) {
        sql += `paymentTerm = ?, `;
        values.push(paymentTerm);
    }
    if (status) {
        sql += `status = ?, `;
        values.push(status);
    }

    // Remove the last comma and space
    sql = sql.slice(0, -2);
    // Add WHERE clause
    sql += ` WHERE id = ?`;
    values.push(invoiceId);

    // Execute the SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating invoice:', err);
            return res.status(500).send('Error updating invoice');
        }
        console.log('Invoice updated successfully');
        res.status(200).send('Invoice updated successfully');
    });
});

// API endpoint to delete an invoice
app.delete('/sales/invoices/:id', (req, res) => {
    const invoiceId = req.params.id;

    // Construct the SQL query to delete the invoice
    const sql = `DELETE FROM invoices WHERE id = ?`;

    // Execute the SQL query
    db.query(sql, invoiceId, (err, result) => {
        if (err) {
            console.error('Error deleting invoice:', err);
            return res.status(500).send('Error deleting invoice');
        }
        console.log('Invoice deleted successfully');
        res.status(200).send('Invoice deleted successfully');
    });
});


const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
