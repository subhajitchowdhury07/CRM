import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Snackbar } from '@mui/base/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StockCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingName, setEditingName] = useState('');

    const [subCategories, setSubCategories] = useState([]);
    const [newSubCategory, setNewSubCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const nodeRef = React.useRef(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingSubCategory, setEditingSubCategory] = useState(null);
    const [editingSubCategoryName, setEditingSubCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8087/stock/AllCategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8087/stock/AllSubCategories');
            setSubCategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const addCategory = async () => {
        if (newCategory.trim() === '') return;
        try {
            await axios.post('http://localhost:8087/stock/NewCategories', { name: newCategory });
            setNewCategory('');
            fetchCategories();
            showSnackbarMessage('Category added successfully!');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const addSubCategory = async () => {
        if (newSubCategory.trim() === '' || !selectedCategory) return;
        try {
            await axios.post('http://localhost:8087/stock/NewSubCategories', { category_id: selectedCategory.id, name: newSubCategory });
            setNewSubCategory('');
            fetchSubCategories();
            showSnackbarMessage('SubCategory added successfully!');
        } catch (error) {
            console.error('Error adding subcategory:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/stock/DeleteCategories/${id}`);
            fetchCategories();
            showSnackbarMessage('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const deleteSubCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/stock/DeleteSubCategories/${id}`);
            fetchSubCategories();
            showSnackbarMessage('SubCategory deleted successfully!');
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    const updateCategory = async (id) => {
        if (editingName.trim() === '') return;
        try {
            await axios.put(`http://localhost:8087/stock/UpdateCategories/${id}`, { name: editingName });
            setEditingCategory(null);
            setEditingName('');
            fetchCategories();
            showSnackbarMessage('Category updated successfully!');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const updateSubCategory = async (id) => {
        if (editingSubCategoryName.trim() === '') return;
        try {
            await axios.put(`http://localhost:8087/stock/UpdateSubCategories/${id}`, { name: editingSubCategoryName });
            setEditingSubCategory(null);
            setEditingSubCategoryName('');
            fetchSubCategories();
            showSnackbarMessage('SubCategory updated successfully!');
        } catch (error) {
            console.error('Error updating subcategory:', error);
        }
    };

    const showSnackbarMessage = (message) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000);
    };

    const handleOpenDialog = (category) => {
        setSelectedCategory(category);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCategory(null);
    };

    const handleEditSubCategory = (subCategory) => {
        setEditingSubCategory(subCategory.id);
        setEditingSubCategoryName(subCategory.name);
    };

    const handleSaveSubCategory = () => {
        if (editingSubCategoryName.trim() === '') return;
        updateSubCategory(editingSubCategory);
        setEditingSubCategory(null);
        setEditingSubCategoryName('');
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="header-icon">
                    <i className="fa fa-list"></i>
                </div>
                <div style={{ backgroundColor: '#212631', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
  <h4 style={{ color: '#fff', margin: '0' }}>Stock Categories</h4>
  <small style={{ color: '#fff', fontWeight: '400' }}>Manage categories and subcategories</small>
</div>

            </section>
            <section className="content">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel lobidisable panel-bd">
                            <div className="panel-heading">
                                <div className="panel-title">
                                    <h4>Add Category</h4>
                                </div>
                            </div>
                            <div className="panel-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <button style={{ marginTop: '15px' }} type="button" className="btn btn-success" onClick={addCategory}>
                                    <CIcon icon={cilCheck} /> Add Category
                                </button>
                            </div>
                        </div>
                        <div className="panel lobidisable panel-bd">
                            <div className="panel-heading">
                                <div className="panel-title">
                                <h4 style={{ paddingTop: '20px' }}>Add SubCategory</h4>
                                </div>
                            </div>
                            <div className="panel-body">
    <select 
        className="form-control"
        onChange={(e) => setSelectedCategory(categories.find(cat => cat.id === parseInt(e.target.value)))}
    >
        <option value="">Select Category</option>
        {categories.map(category => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>
    <input
        type="text"
        className="form-control"
        placeholder="New SubCategory"
        value={newSubCategory}
        onChange={(e) => setNewSubCategory(e.target.value)}
        style={{ marginTop: '10px' }} // Adjust margin as needed
    />
    <button style={{ marginTop: '15px' }} type="button" className="btn btn-success" onClick={addSubCategory}>
        <CIcon icon={cilCheck} /> Add SubCategory
    </button>
</div>

                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="panel lobidisable panel-bd">
                            <div className="panel-heading">
                                <div className="panel-title">
                                    <h4>Categories and SubCategories</h4>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr className="info">
                                                <th>Category Name</th>
                                                <th>SubCategories</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map(category => (
                                                <tr key={category.id}>
                                                    <td>
                                                        {editingCategory === category.id ? (
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editingName}
                                                                onChange={(e) => setEditingName(e.target.value)}
                                                            />
                                                        ) : (
                                                            category.name
                                                        )}
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            {subCategories.filter(sub => sub.category_id === category.id).map(sub => (
                                                                <li key={sub.id}>
                                                                    {editingSubCategory === sub.id ? (
                                                                        <TextField
                                                                            value={editingSubCategoryName}
                                                                            onChange={(e) => setEditingSubCategoryName(e.target.value)}
                                                                        />
                                                                    ) : (
                                                                        sub.name
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td>
    {editingCategory === category.id ? (
        <>
            <button
                className="btn btn-success"
                style={{ padding: '5px 10px', marginRight: '5px' }} // Adjust padding and margin-right
                onClick={() => updateCategory(category.id)}
            >
                <CheckRoundedIcon />
            </button>
            <button
                className="btn btn-danger"
                style={{ padding: '5px 10px' }} // Adjust padding
                onClick={() => setEditingCategory(null)}
            >
                <CloseIcon />
            </button>
        </>
    ) : (
        <>
            <button
                className="btn btn-primary"
                style={{ padding: '5px 10px', marginRight: '5px' }} // Adjust padding and margin-right
                onClick={() => {
                    setEditingCategory(category.id);
                    setEditingName(category.name);
                }}
            >
                <EditIcon />
            </button>
            <button
                className="btn btn-danger"
                style={{ padding: '5px 10px' }} // Adjust padding
                onClick={() => deleteCategory(category.id)}
            >
                <DeleteIcon />
            </button>
        </>
    )}
</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <StyledSnackbar
                autoHideDuration={3000}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                nodeRef={nodeRef}
            >
                <SnackbarContent
                    style={{
                        transform: showSnackbar ? 'translateX(0)' : 'translateX(500px)',
                        transition: 'transform 300ms ease',
                    }}
                    ref={nodeRef}
                >
                    <CheckRoundedIcon
                        sx={{
                            color: 'success.main',
                            flexShrink: 0,
                            width: '1.25rem',
                            height: '1.5rem',
                        }}
                    />
                    <div className="snackbar-message">
                        <p className="snackbar-title">{snackbarMessage}</p>
                    </div>
                    <CloseIcon className="snackbar-close-icon" onClick={() => setShowSnackbar(false)} />
                </SnackbarContent>
            </StyledSnackbar>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Subcategories for {selectedCategory?.name}</DialogTitle>
                <DialogContent>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="info">
                                <th>Subcategory Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subCategories
                                .filter(sub => sub.category_id === selectedCategory?.id)
                                .map(sub => (
                                    <tr key={sub.id}>
                                        <td>
                                            {editingSubCategory === sub.id ? (
                                                <TextField
                                                    value={editingSubCategoryName}
                                                    onChange={(e) => setEditingSubCategoryName(e.target.value)}
                                                />
                                            ) : (
                                                sub.name
                                            )}
                                        </td>
                                        <td>
                                            {editingSubCategory === sub.id ? (
                                                <>
                                                    <button className="btn btn-success" onClick={handleSaveSubCategory}>Save</button>
                                                    <button className="btn btn-danger" onClick={() => setEditingSubCategory(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn btn-primary" onClick={() => handleEditSubCategory(sub)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => deleteSubCategory(sub.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StockCategory;


const StyledSnackbar = styled(Snackbar)`
    position: fixed;
    z-index: 5500;
    display: flex;
    bottom: 16px;
    right: 16px;
    max-width: 560px;
    min-width: 300px;
`;

const SnackbarContent = styled('div')`
    display: flex;
    gap: 8px;
    overflow: hidden;
    background-color: #249542;
    border-radius: 8px;
    border: 1px solid #e5eaf2;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    padding: 0.75rem;
    color: #fff;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;

    & .snackbar-message {
        flex: 1 1 0%;
        max-width: 100%;
    }

    & .snackbar-title {
        margin: 0;
        line-height: 1.5rem;
        margin-right: 0.5rem;
    }

    & .snackbar-close-icon {
        cursor: pointer;
        flex-shrink: 0;
        padding: 2px;
        border-radius: 4px;

        &:hover {
            background: #f3f6f9;
        }
    }
`;

