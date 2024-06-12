import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import '../../scss/stocks.css'; // Import CSS file for styling

const AssignStockPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStock, setSelectedStock] = useState('');
    const [assignData, setAssignData] = useState({
        user: '',
        location: '',
        project: '',
        quantity: 0,
    });
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productResponse = await axios.get('http://localhost:8087/stock/getAllProducts');
            const categoryResponse = await axios.get('http://localhost:8087/stock/AllCategories');
            const stockResponse = await axios.get('http://localhost:8087/stock/getAllStocks');
            setProducts(productResponse.data);
            setCategories(categoryResponse.data);
            setStocks(stockResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAssignStock = () => {
        const { user, location, project, quantity } = assignData;
        const message = `Assigned ${quantity} units of stock to ${user} for ${project} at ${location}`;
        setSnackbarMessage(message);
        setShowSnackbar(true);
        setAssignData({
            user: '',
            location: '',
            project: '',
            quantity: 0,
        });
        setSelectedProduct('');
        setSelectedCategory('');
        setSelectedStock('');
        setIsDialogOpen(false);
    };

    const openAssignDialog = (product, category, stock) => {
        setSelectedProduct(product);
        setSelectedCategory(category);
        setSelectedStock(stock);
        setIsDialogOpen(true);
    };

    return (
        <div className="assign-stock-container"> {/* Apply CSS class for styling */}
            <h1>Assign Stock</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Quote ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Category</th>
                        <th>Stock Quantity</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => {
                        const product = products.find(p => p.id === stock.productId);
                        const category = categories.find(c => c.id === stock.categoryId);
                        return (
                            <tr key={stock.id}>
                                <td>{product?.product_id}</td>
                                <td>{product?.quote_id}</td>
                                <td>{product?.name}</td>
                                <td>{product?.description}</td>
                                <td>{product?.quantity}</td>
                                <td>{product?.unit_price}</td>
                                <td>{product?.total}</td>
                                <td>{product?.discount}</td>
                                <td>{product?.tax}</td>
                                <td>{category?.name}</td>
                                <td>{stock.quantity}</td>
                                <td>
                                    <Button variant="contained" onClick={() => openAssignDialog(product, category, stock)}>
                                        Assign
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Assign Stock</DialogTitle>
                <DialogContent>
                    <TextField
                        label="User"
                        value={assignData.user}
                        onChange={(e) => setAssignData({ ...assignData, user: e.target.value })}
                    />
                    <TextField
                        label="Location"
                        value={assignData.location}
                        onChange={(e) => setAssignData({ ...assignData, location: e.target.value })}
                    />
                    <TextField
                        label="Project"
                        value={assignData.project}
                        onChange={(e) => setAssignData({ ...assignData, project: e.target.value })}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={assignData.quantity}
                        onChange={(e) => setAssignData({ ...assignData, quantity: parseInt(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAssignStock} startIcon={<Assignment />}>Assign</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
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

export default AssignStockPage;
