import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Snackbar, Menu } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [taskData, setTaskData] = useState({
        name: '',
        dueDate: '',
        description: '',
        assignedTo: '',
        status: '',
    });
    const [customers, setCustomers] = useState([]);
    const [exportAnchorEl, setExportAnchorEl] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [csvHeaders] = useState([
        { label: 'Task Name', key: 'name' },
        { label: 'Due Date', key: 'dueDate' },
        { label: 'Description', key: 'description' },
        { label: 'Assign to', key: 'assignedTo' },
        { label: 'Status', key: 'status' },
    ]);
    const csvLinkRef = useRef();

    useEffect(() => {
        fetchTasks();
        fetchCustomers();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8087/tasks/getAllTasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8087/customers/listcustomer');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleAddTask = () => {
        setSelectedTask(null);
        setTaskData({
            name: '',
            dueDate: '',
            description: '',
            assignedTo: '',
            status: '',
        });
        setIsDialogOpen(true);
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setTaskData({
            name: task.name,
            dueDate: task.dueDate.split('T')[0],
            description: task.description,
            assignedTo: task.assignedTo,
            status: task.status,
        });
        setIsDialogOpen(true);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8087/tasks/deleteTask/${taskId}`);
            setSnackbarMessage('Task deleted successfully.');
            setShowSnackbar(true);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            setSnackbarMessage('Error deleting task.');
            setShowSnackbar(true);
        }
    };

    const handleSaveTask = async () => {
        try {
            if (selectedTask) {
                await axios.put(`http://localhost:8087/tasks/updateTask/${selectedTask.id}`, taskData);
                setSnackbarMessage('Task updated successfully.');
            } else {
                await axios.post('http://localhost:8087/tasks/createTask', taskData);
                setSnackbarMessage('Task created successfully.');
            }
            setShowSnackbar(true);
            setIsDialogOpen(false);
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
            setSnackbarMessage('Error saving task.');
            setShowSnackbar(true);
        }
    };

    const exportData = (type) => {
        if (type === 'pdf') {
            exportToPDF();
        } else if (type === 'csv') {
            exportToCSV();
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Task Name', 'Due Date', 'Description', 'Assign to', 'Status']],
            body: tasks.map(task => [
                task.name,
                task.dueDate.split('T')[0],
                task.description,
                customers.find(customer => customer.id === task.assignedTo)?.first_name || 'Unassigned',
                task.status
            ])
        });
        doc.save('tasks.pdf');
    };

    const exportToCSV = () => {
        const csvData = tasks.map(task => ({
            name: task.name,
            dueDate: task.dueDate.split('T')[0],
            description: task.description,
            assignedTo: customers.find(customer => customer.id === task.assignedTo)?.first_name || 'Unassigned',
            status: task.status
        }));
        setCsvData(csvData);
        setTimeout(() => {
            csvLinkRef.current.link.click();
        }, 0);
    };

    return (
        <div className="task-manager-container">
            <h1>Running Tasks</h1>
            <div className="table-actions">
                <Button
                    variant="contained"
                    onClick={handleAddTask}
                    sx={{ backgroundColor: '#1976d2', color: '#ffffff', marginBottom: '10px' }}
                >
                    Add Task
                </Button>
                <Button
                    variant="outlined"
                    onClick={(e) => setExportAnchorEl(e.currentTarget)}
                    style={{ marginBottom: '10px', marginLeft: '10px' }}
                >
                    Export Data
                </Button>
                <Menu
                    anchorEl={exportAnchorEl}
                    open={Boolean(exportAnchorEl)}
                    onClose={() => setExportAnchorEl(null)}
                >
                    <MenuItem onClick={() => { exportData('pdf'); setExportAnchorEl(null); }}>Export as PDF</MenuItem>
                    <MenuItem onClick={() => { exportData('csv'); setExportAnchorEl(null); }}>Export as CSV</MenuItem>
                </Menu>
            </div>
            <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename="tasks.csv"
                style={{ display: 'none' }}
                ref={csvLinkRef}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Assign to</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.dueDate.split('T')[0]}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{customers.find(customer => customer.id === task.assignedTo)?.first_name || 'Unassigned'}</TableCell>
                            <TableCell>
                                {task.status === 'submit' ? (
                                    <span style={{ backgroundColor: 'green', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                                        {task.status}
                                    </span>
                                ) : task.status === 'waiting' ? (
                                    <span style={{ backgroundColor: 'orange', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                                        {task.status}
                                    </span>
                                ) : (
                                    <span>{task.status}</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEditTask(task)}><Edit /></IconButton>
                                <IconButton onClick={() => handleDeleteTask(task.id)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>{selectedTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task Name"
                        value={taskData.name}
                        onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Description"
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Assign to"
                        value={taskData.assignedTo}
                        onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                        fullWidth
                        margin="normal"
                        defaultValue=""
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.first_name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Status"
                        value={taskData.status}
                        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="submit">Submit</MenuItem>
                        <MenuItem value="waiting">Waiting</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveTask} color="primary">
                        Save
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
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

export default TaskManager;

