import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../scss/style.css';

const EditCustomerModal = ({ showEditModal, setShowEditModal, selectedCustomer }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
        lastName: selectedCustomer.last_name || '',
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
      setShowEditModal(false);
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
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
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
                  <option value="Regular">Regular</option>
                  <option value="Vendor">Vendor</option>
                  <option value="VIP">VIP</option>
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

export default EditCustomerModal;
