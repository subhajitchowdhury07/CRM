const mysql = require('mysql')
// const app = require('./app')

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
})

// Get all categories
exports.AllCategories= (req, res) => {
    const sql = 'SELECT id ,name FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Add new category
exports.NewCategories = (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    db.query(sql, [name], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Update category
exports.UpdateCategories = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE categories SET name = ? WHERE id = ?';
    db.query(sql, [name, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Delete category
exports.DeleteCategories =(req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categories WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Get all subcategories
exports.AllSubCategories = (req, res) => {
    const sql = 'SELECT * FROM subcategories';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Add new subcategory
exports.NewSubCategories = (req, res) => {
    const { category_id, name } = req.body;
    const sql = 'INSERT INTO subcategories (category_id, name) VALUES (?, ?)';
    db.query(sql, [category_id, name], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Update subcategory
exports.UpdateSubCategories = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE subcategories SET name = ? WHERE id = ?';
    db.query(sql, [name, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Delete subcategory
exports.DeleteSubCategories = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM subcategories WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

// Get all stocks
exports.getAllStocks = (req, res) => {
    const query = `
        SELECT s.*, c.name as category_name 
        FROM stocks s
        LEFT JOIN categories c ON s.category_id = c.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching stocks:', err);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
};

// Add new stock
exports.addStock = (req, res) => {
    const { name, category_id, quantity, price, supplier, sku } = req.body;
    const query = 'INSERT INTO stocks (name, category_id, quantity, price, supplier, sku) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, category_id, quantity, price, supplier, sku], (err, results) => {
        if (err) {
            console.error('Error adding stock:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Stock added');
    });
};

// Update stock
exports.updateStock = (req, res) => {
    const { id } = req.params;
    const { name, category_id, quantity, price, supplier, sku } = req.body;
    const query = 'UPDATE stocks SET name = ?, category_id = ?, quantity = ?, price = ?, supplier = ?, sku = ? WHERE id = ?';
    db.query(query, [name, category_id, quantity, price, supplier, sku, id], (err, results) => {
        if (err) {
            console.error('Error updating stock:', err);
            return res.status(500).send('Server error');
        }
        res.send('Stock updated');
    });
};

// Delete stock
exports.deleteStock = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM stocks WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting stock:', err);
            return res.status(500).send('Server error');
        }
        res.send('Stock deleted');
    });
};

//****************** */

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.findAll();
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Error fetching assignments' });
    }
};

exports.getAssignmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByPk(id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.json(assignment);
    } catch (error) {
        console.error('Error fetching assignment by ID:', error);
        res.status(500).json({ error: 'Error fetching assignment' });
    }
};

exports.createAssignment = async (req, res) => {
    const { product_id, category_id, user, location, project, quantity } = req.body;
    try {
        const assignment = await Assignment.create({ product_id, category_id, user, location, project, quantity });
        res.status(201).json(assignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ error: 'Error creating assignment' });
    }
};

exports.updateAssignment = async (req, res) => {
    const { id } = req.params;
    const { product_id, category_id, user, location, project, quantity } = req.body;
    try {
        const assignment = await Assignment.findByPk(id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        await assignment.update({ product_id, category_id, user, location, project, quantity });
        res.json(assignment);
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ error: 'Error updating assignment' });
    }
};

exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByPk(id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        await assignment.destroy();
        res.json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).json({ error: 'Error deleting assignment' });
    }
};

exports.getAllProducts = (req, res) => {
    const query = `
        SELECT * 
        FROM products
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.json(results);
    });
};
