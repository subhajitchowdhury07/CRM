const express = require('express')
const {
  allTransactions,
  newTransactions,
} = require('../controllers/transactionController')

const router = express.Router()

router.get('/recent', allTransactions)
router.post('/NewDeposit', newTransactions)

module.exports = router
