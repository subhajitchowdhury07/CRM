import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Snackbar } from '@mui/base/Snackbar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newStock, setNewStock] = useState({
        name: '',
        category_id: '', // This will store the selected category ID
        quantity: 0,
        price: 0,
        supplier: '',
        sku: '',
    });
    const [editingStock, setEditingStock] = useState(null);
    const [editingStockData, setEditingStockData] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:8087/stock/getAllStocks');
            setStocks(response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8087/stock/AllCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchStocks();
        fetchCategories();
    }, []);

    const addStock = async () => {
        if (isStockDataValid(newStock)) {
            const selectedCategory = categories.find(category => category.name === newStock.category_id);
            if (selectedCategory) {
                newStock.category_id = selectedCategory.id; // Update category_id with the selected category's ID
                try {
                    await axios.post('http://localhost:8087/stock/addStock', newStock);
                    setNewStock({
                        name: '',
                        category_id: '',
                        quantity: 0,
                        price: 0,
                        supplier: '',
                        sku: '',
                    });
                    fetchStocks();
                    showSnackbarMessage('Stock added successfully!');
                } catch (error) {
                    console.error('Error adding stock:', error);
                }
            } else {
                showSnackbarMessage('Selected category not found.');
            }
        } else {
            showSnackbarMessage('Please fill all the fields correctly.');
        }
    };
  
    const updateStock = async (id) => {
        if (isStockDataValid(editingStockData)) {
            try {
                await axios.put(`http://localhost:8087/stock/updateStock/${id}`, editingStockData);
                setEditingStock(null);
                setEditingStockData({});
                fetchStocks();
                showSnackbarMessage('Stock updated successfully!');
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        } else {
            showSnackbarMessage('Please fill all the fields correctly.');
        }
    };

    const deleteStock = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/stock/deleteStock/${id}`);
            fetchStocks();
            showSnackbarMessage('Stock deleted successfully!');
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const showSnackbarMessage = (message) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000);
    };

    const handleEditStock = (stock) => {
        setEditingStock(stock.id);
        setEditingStockData(stock);
    };

    const handleSaveStock = () => {
        updateStock(editingStock);
    };

    const isStockDataValid = (stock) => {
        return (
            stock.name.trim() !== '' &&
            stock.category_id !== '' && // Ensure category_id is not empty
            stock.quantity >= 0 &&
            stock.price >= 0 &&
            stock.supplier.trim() !== '' &&
            stock.sku.trim() !== ''
        );
    };

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ backgroundColor: '#212631', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', margin: '0' }}>Manage Stocks</h4>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Add New Stock</h4>
                    <TextField
                        label="Name"
                        value={newStock.name}
                        onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                        style={{ marginBottom: '10px', marginRight: '10px' }}
                    />
                    <TextField
                        label="Category"
                        select
                        SelectProps={{
                            native: true,
                        }}
                        value={newStock.category_id}
                        onChange={(e) => setNewStock({ ...newStock, category_id: e.target.value })}
                        style={{ marginBottom: '10px', marginRight: '10px' }}
                        >
                            <option value=""></option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={newStock.quantity}
                            onChange={(e) => setNewStock({ ...newStock, quantity: Math.max(0, e.target.value) })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={newStock.price}
                            onChange={(e) => setNewStock({ ...newStock, price: Math.max(0, e.target.value) })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="Supplier"
                            value={newStock.supplier}
                            onChange={(e) => setNewStock({ ...newStock, supplier: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="SKU"
                            value={newStock.sku}
                            onChange={(e) => setNewStock({ ...newStock, sku: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <Button variant="contained" onClick={addStock}>
                            Add Stock
                        </Button>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4>Current Stocks</h4>
                        <TextField
                            label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {filteredStocks.map((stock) => (
                                <li key={stock.id} style={{ marginBottom: '10px' }}>
                                    {stock.name} - {stock.quantity} in stock
                                    <Button onClick={() => handleEditStock(stock)}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={() => deleteStock(stock.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Dialog
                    open={!!editingStock}
                    onClose={() => setEditingStock(null)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Edit Stock</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            value={editingStockData.name}
                            onChange={(e) => setEditingStockData({ ...editingStockData, name: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="Category"
                            select
                            SelectProps={{
                                native: true,
                            }}
                            value={editingStockData.category_id}
                            onChange={(e) => setEditingStockData({ ...editingStockData, category_id: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        >
                            <option value=""></option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={editingStockData.quantity}
                            onChange={(e) => setEditingStockData({ ...editingStockData, quantity: Math.max(0, e.target.value) })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={editingStockData.price}
                            onChange={(e) => setEditingStockData({ ...editingStockData, price: Math.max(0, e.target.value) })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="Supplier"
                            value={editingStockData.supplier}
                            onChange={(e) => setEditingStockData({ ...editingStockData, supplier: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                        <TextField
                            label="SKU"
                            value={editingStockData.sku}
                            onChange={(e) => setEditingStockData({ ...editingStockData, sku: e.target.value })}
                            style={{ marginBottom: '10px', marginRight: '10px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSaveStock}>Save</Button>
                        <Button onClick={() => setEditingStock(null)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setShowSnackbar(false)}
                    message={snackbarMessage}
                />
            </div>
        );
    };
    
    export default ManageStocks;
    