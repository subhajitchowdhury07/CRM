const express = require('express')
const {
  allInvoices,
  deleteInvoice,
  updateInvoice,
  newInvoice,
  NewRecurringInvoice,
  AllRecurringInvoices,
  deleteRecurringInvoice,
  updateRecurringInvoice,
  NewQuote,
} = require('../controllers/salesController')

const router = express.Router()

router.get('/invoices', allInvoices)
router.delete('/invoices/:id', deleteInvoice)
router.put('/invoices/:id', updateInvoice)
router.post('/NewInvoice', newInvoice)
router.post('/NewRecurringInvoice', NewRecurringInvoice)
router.get('/AllRecurringInvoices', AllRecurringInvoices)
router.delete('/DeleteRecurringInvoice/:id', deleteRecurringInvoice)
router.put('/AllRecurringInvoices/:id', updateRecurringInvoice)
router.post('/NewQuote', NewQuote)

module.exports = router
