const express = require('express')
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')

const router = express.Router()

router.get('/getAllTasks', getAllTasks);
router.post('/createTask', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router
