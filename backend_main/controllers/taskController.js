const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm',
});

// Route Handlers

exports.getAllTasks = (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(results);
    }
  });
};

exports.createTask = (req, res) => {
  const { name, dueDate, description, assignedTo, status } = req.body;
  const sql = 'INSERT INTO tasks (name, dueDate, description, assignedTo, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, dueDate, description, assignedTo, status], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(201).json({ id: result.insertId, name, dueDate, description, assignedTo, status });
    }
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { name, dueDate, description, assignedTo, status } = req.body;
  const sql = 'UPDATE tasks SET name = ?, dueDate = ?, description = ?, assignedTo = ?, status = ? WHERE id = ?';
  db.query(sql, [name, dueDate, description, assignedTo, status, id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ id, name, dueDate, description, assignedTo, status });
    }
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
};
