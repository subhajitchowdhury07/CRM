import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../../../scss/style.css';
import editPng from '../../../assets/images/edit.png';
import deletePng from '../../../assets/images/delete.png';

const EditCustomerModal = ({ showEditModal, setShowEditModal, selectedCustomer, onEditSuccess, setCustomers, setOpenSnackbar }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    // lastName: '',
    email: '',
    mobile: '',
    address: '',
    customerType: '',
    status: ''
  });

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        firstName: selectedCustomer.first_name || '',
        // lastName: selectedCustomer.last_name || '',
        email: selectedCustomer.email || '',
        mobile: selectedCustomer.mobile || '',
        address: selectedCustomer.address || '',
        customerType: selectedCustomer.customer_type || '',
        status: selectedCustomer.status || ''
      });
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8087/customers/${selectedCustomer.id}`, formData);
      console.log('Customer updated:', response.data);
      onEditSuccess(response.data); // Update state with the updated customer data
      setShowEditModal(false);
      setOpenSnackbar(true); // Set Snackbar visibility
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} id="customerEditModal" tabIndex="-1" role="dialog" aria-hidden={!showEditModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Customer</h5>
            <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              {/* <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div> */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="customerType">Customer Type</label>
                <select className="form-control" id="customerType" name="customerType" value={formData.customerType} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="regular">Regular</option>
                  <option value="vendor">Vendor</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteCustomerModal = ({ showDeleteModal, setShowDeleteModal, handleDelete, selectedCustomer, setOpenSnackbar }) => {
  const handleConfirmDelete = async () => {
    if (!selectedCustomer) {
      console.error('No customer selected for deletion');
      return;
    }
    try {
      await handleDelete(selectedCustomer);
      setShowDeleteModal(false);
      setOpenSnackbar(true); // Set Snackbar visibility
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="customerDeleteModal" tabIndex="-1" role="dialog" aria-hidden={!showDeleteModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Customer</h5>
            <button type="button" className="close" onClick={() => setShowDeleteModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this customer?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State variable for Snackbar visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8087/customers/listCustomer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDelete = async (customer) => {
    console.log('Selected Customer for deletion:', customer);
    try {
      await axios.delete(`http://localhost:8087/customers/${customer.id}`);
      setShowDeleteModal(false);
  
      // Fetch updated customer data after deletion
      try {
        const response = await axios.get('http://localhost:8087/customers/listCustomer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching updated customer data:', error);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditSuccess = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === updatedCustomer.id) {
        return updatedCustomer;
      }
      return customer;
    });
    setCustomers(updatedCustomers);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        {/* Header content */}
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-bd lobidrag">
              <div className="panel-heading">
                {/* Add customer button */}
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table id="dataTableExample1" className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr className="info">
                        <th>Photo</th>
                        <th>Customer Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Type</th>
                        <th>Join</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id}>
                          <td className="table-img"><img src={`http://localhost:8087/${customer.picture}`} alt="User" width="50" height="50" /></td>
                          <td>{customer.first_name}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.email}</td>
                          <td>{customer.address}</td>
                          <td>{customer.customer_type}</td>
                          <td>{customer.created_at}</td>
                          <td><span className={customer.status === 'Active' ? 'label-custom label label-default' : 'label-danger label label-default'}>{customer.status}</span></td>
                          <td>
    <button type="button" className="edit-button" onClick={() => handleEdit(customer)}>
        <img src={editPng} alt="Edit" width="20" height="20" />
    </button>
    <button type="button" className="delete-button" onClick={() => { setSelectedCustomer(customer); setShowDeleteModal(true); }}>
        <img src={deletePng} alt="Delete" width="20" height="20" />
    </button>
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
      <EditCustomerModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedCustomer={selectedCustomer}
        onEditSuccess={handleEditSuccess} // Pass the onEditSuccess function
        setCustomers={setCustomers} // Pass setCustomers to update the table
        setOpenSnackbar={setOpenSnackbar} // Pass setOpenSnackbar function
      />
      <DeleteCustomerModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        selectedCustomer={selectedCustomer}
        setOpenSnackbar={setOpenSnackbar} // Pass setOpenSnackbar function
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)} // Close Snackbar on action
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)} // Close Snackbar on action
          severity="success"
        >
          Operation successful
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomerList;
