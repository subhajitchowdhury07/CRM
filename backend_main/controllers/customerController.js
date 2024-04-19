const mysql = require('mysql')
// const app = require('./app')

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
})
// const db= require('../server')
// API endpoint to fetch list of customers with first_name and created_at fields
exports.allCustomers = (req, res) => {
  const sql = `SELECT id, first_name, mobile, email, address, customer_type, created_at, status, picture FROM customers`

  

  // Execute SQL query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching customer data:', err)
      return res.status(500).send('Error fetching customer data')
    }
    console.log('Customer data fetched successfully')
    res.status(200).json(result)
  })
}

// API endpoint to handle adding a new customer with profile picture upload
exports.addCustomer = (req, res) => {
  const { firstName, lastName, email, mobile, address, customerType, status } =
    req.body
  const picture = req.file ? req.file.path : null // Get uploaded file path or set to null if not provided

  // Convert status to database-compatible format
  const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null

  const sql = `INSERT INTO customers (first_name, last_name, email, mobile, picture, address, customer_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  const values = [
    firstName,
    lastName,
    email,
    mobile,
    picture,
    address,
    customerType,
    dbStatus,
  ]

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding customer:', err)
      return res.status(500).send('Error adding customer')
    }
    console.log('Customer added successfully')
    res.status(200).send('Customer added successfully')
  })
}

// API endpoint to update customer details
exports.updateCustomer = (req, res) => {
  const customerId = req.params.id
  const { firstName, lastName, email, mobile, address, customerType, status } =
    req.body
  let picture = null

  // Check if a new picture is uploaded
  if (req.file) {
    picture = req.file.path
  }

  // Convert status to database-compatible format
  const dbStatus = status === 'Active' ? 1 : status === 'Inactive' ? 0 : null

  // SQL query to update customer details
  let sql = `UPDATE customers SET `
  const values = []

  // Append fields to update based on provided data
  if (firstName) {
    sql += `first_name = ?, `
    values.push(firstName)
  }
  if (lastName) {
    sql += `last_name = ?, `
    values.push(lastName)
  }
  if (email) {
    sql += `email = ?, `
    values.push(email)
  }
  if (mobile) {
    sql += `mobile = ?, `
    values.push(mobile)
  }
  if (picture) {
    sql += `picture = ?, `
    values.push(picture)
  }
  if (address) {
    sql += `address = ?, `
    values.push(address)
  }
  if (customerType) {
    sql += `customer_type = ?, `
    values.push(customerType)
  }
  if (status) {
    sql += `status = ?, `
    values.push(dbStatus)
  }

  // Remove trailing comma and add WHERE clause
  sql = sql.slice(0, -2) // Remove last comma and space
  sql += ` WHERE id = ?`
  values.push(customerId)

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating customer:', err)
      return res.status(500).send('Error updating customer')
    }
    console.log('Customer updated successfully')
    res.status(200).send('Customer updated successfully')
  })
}

// API endpoint to delete a customer
exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id

  // SQL query to delete a customer by ID
  const sql = `DELETE FROM customers WHERE id = ?`

  // Execute SQL query
  db.query(sql, customerId, (err, result) => {
    if (err) {
      console.error('Error deleting customer:', err)
      return res.status(500).send('Error deleting customer')
    }
    console.log('Customer deleted successfully')
    res.status(200).send('Customer deleted successfully')
  })
}
