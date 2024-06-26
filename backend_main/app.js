const express = require('express')
const cors = require('cors')
const path = require('path')

const salesRouter = require('./routers/saleRoute')
const customerRouter = require('./routers/customerRoute')
const transactionRouter = require('./routers/transactionRoute')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/sales', salesRouter)
app.use('/customers', customerRouter)
app.use('/transaction', transactionRouter)

module.exports = app
