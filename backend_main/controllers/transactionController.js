const mysql = require('mysql')
// const app = require('./app')

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
})

// API endpoint to add a new deposit
exports.newTransactions = (req, res) => {
  const { account, date, description, amount } = req.body

  const sql = `INSERT INTO deposits (account, date, description, amount) VALUES (?, ?, ?, ?)`
  const values = [account, date, description, amount]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding deposit:', err)
      return res.status(500).send('Error adding deposit')
    }
    console.log('Deposit added successfully')
    res.status(200).send('Deposit added successfully')
  })
}

// API endpoint to fetch list of recent deposits
exports.allTransactions = (req, res) => {
  const sql = `SELECT description, amount FROM deposits ORDER BY date DESC LIMIT 10`

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching recent deposits:', err)
      return res.status(500).send('Error fetching recent deposits')
    }
    console.log('Recent deposits fetched successfully')
    res.status(200).json(result)
  })
}
