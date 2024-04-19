const mysql = require('mysql')
const app = require('./app')

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
})

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err)
    return
  }
  console.log('MySQL Connected...')
})

// Additional error handling for MySQL connection
db.on('error', (err) => {
  console.error('MySQL Error:', err)
})

const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});