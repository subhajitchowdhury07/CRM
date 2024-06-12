const express =require ('express')

const{
    AllCategories,
    NewCategories,
    UpdateCategories,
    DeleteCategories,
    AllSubCategories,
    NewSubCategories,
    UpdateSubCategories,
    DeleteSubCategories,
    getAllStocks,
    addStock,
    updateStock,
    deleteStock,
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAllProducts,

} = require('../controllers/stockController')

const router = express.Router();

router.get('/AllCategories', AllCategories)
router.post('/NewCategories', NewCategories)
router.put('/UpdateCategories/:id', UpdateCategories)
router.delete('/DeleteCategories/:id', DeleteCategories)

// Subcategory routes
router.get('/AllSubCategories', AllSubCategories);
router.post('/NewSubCategories', NewSubCategories);
router.put('/UpdateSubCategories/:id', UpdateSubCategories);
router.delete('/DeleteSubCategories/:id', DeleteSubCategories);

//Manage Stocks

// Route to fetch all stocks
router.get('/getAllStocks',getAllStocks);

// Route to add a new stock
router.post('/addStock',addStock);

// Route to update a stock
router.put('/updateStock/:id',updateStock);

// Route to delete a stock
router.delete('/deleteStock/:id',deleteStock);


router.get('/getAllAssignments',getAllAssignments);
router.get('/getAssignmentById/:id',getAssignmentById);
router.post('/createAssignment',createAssignment);
router.put('/updateAssignment/:id',updateAssignment);
router.delete('/deleteAssignment/:id',deleteAssignment);
router.get('/getAllProducts' ,getAllProducts);


module.exports = router