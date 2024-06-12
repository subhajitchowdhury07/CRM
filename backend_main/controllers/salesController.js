const mysql = require('mysql')
// const app = require('./app')

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
})

// API endpoint to fetch all invoices
exports.allInvoices = (req, res) => {
  const sql = `SELECT 
      id,
      invoiceNo,
      customerName,
      total,
      invoiceDate,
      pdcDueDate,
      paymentTerm,
      status
  FROM invoices`

  // Execute SQL query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching invoice data:', err)
      return res.status(500).send('Error fetching invoice data')
    }
    console.log('Invoice data fetched successfully')
    res.status(200).json(result)
  })
}

// API endpoint to add a new invoice
exports.newInvoice = (req, res) => {
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
    bankDetails,
  } = req.body

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
      status,
      bankName,
      ifscCode,
      accountNumber,
      micrNumber,
      bankDetails
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

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
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding invoice:', err)
      return res.status(500).send('Error adding invoice')
    }
    console.log('Invoice added successfully')
    res.status(200).send('Invoice added successfully')
  })
}

// API endpoint to update invoice details
exports.updateInvoice = (req, res) => {
  const invoiceId = req.params.id
  // Extract the fields to update from the request body
  const {
    invoiceNo,
    customerName,
    invoiceDate,
    total,
    pdcDueDate,
    paymentTerm,
    status,
  } = req.body

  // Construct the SQL query to update the invoice
  let sql = `UPDATE invoices SET `
  const values = []

  // Check each field for update
  if (invoiceNo) {
    sql += `invoiceNo = ?, `
    values.push(invoiceNo)
  }
  if (customerName) {
    sql += `customerName = ?, `
    values.push(customerName)
  }
  if (invoiceDate) {
    sql += `invoiceDate = ?, `
    values.push(invoiceDate)
  }
  if (total) {
    sql += `total = ?, `
    values.push(total)
  }
  if (pdcDueDate) {
    sql += `pdcDueDate = ?, `
    values.push(pdcDueDate)
  }
  if (paymentTerm) {
    sql += `paymentTerm = ?, `
    values.push(paymentTerm)
  }
  if (status) {
    sql += `status = ?, `
    values.push(status)
  }

  // Remove the last comma and space
  sql = sql.slice(0, -2)
  // Add WHERE clause
  sql += ` WHERE id = ?`
  values.push(invoiceId)

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating invoice:', err)
      return res.status(500).send('Error updating invoice')
    }
    console.log('Invoice updated successfully')
    res.status(200).send('Invoice updated successfully')
  })
}

// API endpoint to delete an invoice
exports.deleteInvoice = (req, res) => {
  const invoiceId = req.params.id

  // Construct the SQL query to delete the invoice
  const sql = `DELETE FROM invoices WHERE id = ?`

  // Execute the SQL query
  db.query(sql, invoiceId, (err, result) => {
    if (err) {
      console.error('Error deleting invoice:', err)
      return res.status(500).send('Error deleting invoice')
    }
    console.log('Invoice deleted successfully')
    res.status(200).send('Invoice deleted successfully')
  })
}


// Define a route to handle POST requests to store recurring invoices
exports.NewRecurringInvoice = (req, res) => {
  const formData = req.body; // Assuming form data is sent in the request body

  // SQL query to insert the data into the database
  const sql = `
    INSERT INTO recurringinvoices 
    (referenceNo, recurringEvery, quantity, rate, tax, department, startDate, endDate, client, total, notes) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    formData.referenceNo,
    formData.recurringEvery,
    formData.quantity,
    formData.rate,
    formData.tax,
    formData.department,
    formData.startDate,
    formData.endDate,
    formData.client,
    formData.total,
    formData.notes
  ];

  // Execute the SQL query
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error adding Invoice:', error);
      res.status(500).json({ error: 'Failed to add Invoice' });
    } else {
      console.log('Invoice added successfully');
      res.status(200).json({ message: 'Invoice added successfully' });
    }
  });
}


exports.AllRecurringInvoices= (req, res) => {
  const sql = `SELECT id, referenceNo, recurringEvery, quantity, rate, tax, department, startDate, endDate, client, total, notes FROM recurringinvoices`;

  // Execute SQL query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching recurring invoices:', err);
      return res.status(500).json({ error: 'Failed to fetch recurring invoices' });
    }
    console.log('Recurring invoices fetched successfully');
    res.status(200).json(result);
  });
}


// API endpoint to delete a recurring invoice by ID
exports.deleteRecurringInvoice= (req, res) => {
  const invoiceId = req.params.id;

  // Construct the SQL query to delete the invoice
  const sql = `DELETE FROM recurringinvoices WHERE id = ?`;

  // Execute the SQL query
  db.query(sql, invoiceId, (err, result) => {
    if (err) {
      console.error('Error deleting recurring invoice:', err);
      return res.status(500).json({ error: 'Failed to delete recurring invoice' });
    }
    console.log('Recurring invoice deleted successfully');
    res.status(200).json({ message: 'Recurring invoice deleted successfully' });
  });
}

exports.updateRecurringInvoice = (req, res) => {
  const invoiceId = req.params.id;
  // Extract the fields to update from the request body
  const {
    referenceNo,
    recurringEvery,
    quantity,
    rate,
    tax,
    department,
    startDate,
    endDate,
    client,
    total,
    notes,
  } = req.body;

  // Construct the SQL query to update the recurring invoice
  let sql = `UPDATE recurringinvoices SET `;
  const values = [];

  // Check each field for update
  if (referenceNo) {
    sql += `referenceNo = ?, `;
    values.push(referenceNo);
  }
  if (recurringEvery) {
    sql += `recurringEvery = ?, `;
    values.push(recurringEvery);
  }
  if (quantity) {
    sql += `quantity = ?, `;
    values.push(quantity);
  }
  if (rate) {
    sql += `rate = ?, `;
    values.push(rate);
  }
  if (tax) {
    sql += `tax = ?, `;
    values.push(tax);
  }
  if (department) {
    sql += `department = ?, `;
    values.push(department);
  }
  if (startDate) {
    sql += `startDate = ?, `;
    values.push(startDate);
  }
  if (endDate) {
    sql += `endDate = ?, `;
    values.push(endDate);
  }
  if (client) {
    sql += `client = ?, `;
    values.push(client);
  }
  if (total) {
    sql += `total = ?, `;
    values.push(total);
  }
  if (notes) {
    sql += `notes = ?, `;
    values.push(notes);
  }

  // Remove the last comma and space
  sql = sql.slice(0, -2);
  // Add WHERE clause
  sql += ` WHERE id = ?`;
  values.push(invoiceId);

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating recurring invoice:', err);
      return res.status(500).send('Error updating recurring invoice');
    }
    console.log('Recurring invoice updated successfully');
    res.status(200).send('Recurring invoice updated successfully');
  });
};


// Route to handle new quote submission
exports.NewQuote = (req, res) => {
  const quoteData = req.body;
  const { products, ...quoteDetails } = quoteData;

  // Insert quote details into Quotes table
  db.query('INSERT INTO quotes SET ?', quoteDetails, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add quote' });
      throw err;
    }

    // Get the ID of the inserted quote
    const quoteId = result.insertId;

    // Insert each product into Products table with the corresponding quote_id
    const productValues = products.map((product) => [quoteId, ...Object.values(product)]);
    db.query('INSERT INTO products (quote_id, name, description, quantity, unit_price, total, discount, tax) VALUES ?', [productValues], (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add products' });
        throw err;
      }
      
      res.status(200).json({ message: 'Quote added successfully' });
    });
  });
}

// GET all quotes
// API endpoint to fetch all quotes
exports.AllQuotes = (req, res) => {
  const sql = `SELECT 
      quote_id,
      quote_Number,
      customer_name,
      customer_email,
      quote_date,
      validity_period,
      notes
  FROM quotes`

  // Execute SQL query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching quotes:', err)
      return res.status(500).send('Error fetching quotes')
    }
    console.log('Quotes fetched successfully')
    res.status(200).json(result)
  })
}

// Edit or Update Quote model
exports.EditQuote = (req, res) => {
  const quoteId = req.params.id;
  const { quote_Number, customer_name, customer_email, quote_date, validity_period, notes } = req.body;

  const sql = `UPDATE quotes SET
      quote_Number = ?,
      customer_name = ?,
      customer_email = ?,
      quote_date = ?,
      validity_period = ?,
      notes = ?
  WHERE quote_id = ?`;

  const values = [quote_Number, customer_name, customer_email, quote_date, validity_period, notes, quoteId];

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating quote:', err);
      return res.status(500).send('Error updating quote');
    }
    console.log('Quote updated successfully');
    res.status(200).json(result);
  });
};


// Delete Quote model
exports.DeleteQuote = (req, res) => {
  const quoteId = req.params.id;

  // First, fetch products associated with the quote_id
  const fetchProductsSql = `SELECT product_id FROM products WHERE quote_id = ?`;
  db.query(fetchProductsSql, [quoteId], (err, productsResult) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Error fetching products');
    }

    // Extract product IDs from the result
    const productIds = productsResult.map((product) => product.product_id);

    // Now delete products associated with the quote_id
    const deleteProductsSql = `DELETE FROM products WHERE product_id IN (?)`;
    db.query(deleteProductsSql, [productIds], (err, deleteResult) => {
      if (err) {
        console.error('Error deleting products:', err);
        return res.status(500).send('Error deleting products');
      }

      // Finally, delete the quote
      const deleteQuoteSql = `DELETE FROM quotes WHERE quote_id = ?`;
      db.query(deleteQuoteSql, [quoteId], (err, result) => {
        if (err) {
          console.error('Error deleting quote:', err);
          return res.status(500).send('Error deleting quote');
        }
        console.log('Quote deleted successfully');
        res.status(200).json(result);
      });
    });
  });
};
