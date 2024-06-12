const express = require('express')

const router = express.Router()

const upload = require('./../upload')
const {
  addCustomer,
  allCustomers,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController')

router.get('/listCustomer', allCustomers)
router.post('/addCustomer', upload.single('picture'), addCustomer)
router.put('/:id', upload.single('picture'), updateCustomer)
router.delete('/:id', deleteCustomer)

module.exports = router
