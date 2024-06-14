import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import '../../scss/stocks.css'; // Import CSS file for styling

const AssignStockPage = () => {
    const [stocks, setStocks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedStock, setSelectedStock] = useState('');
    const [assignData, setAssignData] = useState({
        customer_id: '',
        quantity: 0,
        location: '',
        project: '',
    });
    const [assignedStockDetails, setAssignedStockDetails] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        fetchData();
        fetchCustomerList();
        fetchAssignedStockDetails(); // Fetch assigned stock details
    }, []);

    const fetchData = async () => {
        try {
            const stockResponse = await axios.get('http://localhost:8087/stock/getAllStocks');
            const categoryResponse = await axios.get('http://localhost:8087/stock/AllCategories');
            setStocks(stockResponse.data);
            setCategories(categoryResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCustomerList = async () => {
        try {
            const response = await axios.get('http://localhost:8087/customers/listcustomer');
            setCustomerList(response.data);
        } catch (error) {
            console.error('Error fetching customer list:', error);
        }
    };

    const fetchAssignedStockDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8087/stock/AllAssignedStocks');
            setAssignedStockDetails(response.data);
        } catch (error) {
            console.error('Error fetching assigned stock details:', error);
        }
    };

    const handleAssignStock = async () => {
        try {
            const selectedStockObj = stocks.find(stock => stock.id === selectedStock.id);
            if (!selectedStockObj || assignData.quantity > selectedStockObj.quantity) {
                setSnackbarMessage('No more stock available');
                setShowSnackbar(true);
                return;
            }

            const response = await axios.post('http://localhost:8087/stock/AssignStock', {
                stockId: selectedStock.id,
                customer_id: assignData.customer_id,
                assignData: {
                    quantity: assignData.quantity,
                    location: assignData.location,
                    project: assignData.project,
                },
            });
            setAssignedStockDetails([...assignedStockDetails, response.data]);
            setSnackbarMessage('Stock assigned successfully.');
            setShowSnackbar(true);
            setAssignData({
                customer_id: '',
                quantity: 0,
                location: '',
                project: '',
            });
            setSelectedStock('');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error assigning stock:', error);
        }
    };

    const openAssignDialog = (stock) => {
        setSelectedStock(stock);
        setIsDialogOpen(true);
    };

    return (
        <div className="assign-stock-container">
            <h1>Assign Stock</h1>
            <table>
                <thead>
                    <tr>
                        <th>Stock ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Supplier</th>
                        <th>SKU</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => {
                        const category = categories.find((c) => c.id === stock.category_id);
                        return (
                            <tr key={stock.id}>
                                <td>{stock.id}</td>
                                <td>{stock.name}</td>
                                <td>{category?.name}</td>
                                <td>{stock.quantity}</td>
                                <td>{stock.price}</td>
                                <td>{stock.supplier}</td>
                                <td>{stock.sku}</td>
                                <td>
                                    <Button variant="contained" onClick={() => openAssignDialog(stock)}>
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
                        select
                        label="Customer Name"
                        value={assignData.customer_id}
                        onChange={(e) => setAssignData({ ...assignData, customer_id: e.target.value })}
                    >
                        {customerList.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.first_name} ({customer.email})
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Quantity"
                        type="number"
                        value={assignData.quantity}
                        onChange={(e) => setAssignData({ ...assignData, quantity: parseInt(e.target.value) })}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAssignStock} startIcon={<Assignment />}>
                        Assign
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Display Assigned Stock Details */}
            <h2>Assigned Stock Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Quantity Assigned</th>
                        <th>Location</th>
                        <th>Project</th>
                    </tr>
                </thead>
                <tbody>
                    {assignedStockDetails.map((assignedStock) => (
                        <tr key={assignedStock.id}>
                            <td>{customerList.find(customer => customer.id === assignedStock.customer_id)?.first_name || 'Unknown'}</td>
                            <td>{assignedStock.quantity}</td>
                            <td>{assignedStock.location}</td>
                            <td>{assignedStock.project}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
