import React, { useState } from 'react';
import axios from 'axios';
import '../../../scss/addCustomer.css';
import successGif from '../../../assets/images/success.gif';

const AddCustomer = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    picture: '',
    bankDetails: '',
    passport: '',
    facebookId: '',
    dateOfBirth: '',
    address: '',
    customerType: '',
    sex: '',
    status: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files : value, // handle file type separately
    }));
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (key === 'picture') {
            formDataToSend.append(key, formData[key][0]); // Append the first file in the array
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      }
      const response = await axios.post('http://localhost:8087/customers/addCustomer', formDataToSend);
      if (response.status === 200) {
        console.log('Customer added successfully');
        setShowSuccessPopup(true);
        handleReset(); // Reset the form after successful submission
      } else {
        console.error('Failed to add customer:', response.data);
        // Show error message
        alert('Failed to add customer');
      }
    } catch (err) {
      console.error('Error adding customer:', err);
      // Show error message
      alert('Error adding customer');
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-users"></i>
        </div>
        <div className="header-title">
          <h1>Add Customer</h1>
          <small>Customer list</small>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-bd lobidrag">
              <div className="panel-heading">
                <div className="btn-group" id="buttonlist">
                  <a className="btn btn-add" href="clist.html">
                    <i className="fa fa-list"></i> Customer List
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form className="col-sm-6" onSubmit={handleSubmit}>
                  {/* Form fields */}
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Picture upload</label>
                    <input
                      type="file"
                      name="picture"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Bank details</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Bank details"
                      name="bankDetails"
                      value={formData.bankDetails}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Passport</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Passport details"
                      name="passport"
                      value={formData.passport}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Facebook Id</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Facebook details"
                      name="facebookId"
                      value={formData.facebookId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Date of Birth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Customer type</label>
                    <select
                      className="form-control"
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleChange}
                    >
                      <option value="">Select Customer Type</option>
                      <option value="vendor">Vendor</option>
                      <option value="vip">VIP</option>
                      <option value="regular">Regular</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sex</label><br />
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="sex"
                        value="1"
                        checked={formData.sex === '1'}
                        onChange={handleChange}
                      /> Male
                    </label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="sex"
                        value="0"
                        checked={formData.sex === '0'}
                        onChange={handleChange}
                      /> Female
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Status</label><br />
                    <div>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="status"
                          value="1"
                          checked={formData.status === '1'}
                          onChange={handleChange}
                        /> Active
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="status"
                          value="0"
                          checked={formData.status === '0'}
                          onChange={handleChange}
                        /> Inactive
                      </label>
                    </div>
                  </div>
                  {/* Reset and Save buttons */}
                  <div className="reset-button" style={{ marginBottom: '20px' }}>
                    <button type="reset" className="btn btn-warning" onClick={handleReset}>Reset</button>
                    <button type="submit" className="btn btn-success">Save</button>
                  </div>
                </form>
                {/* Success Popup */}
                {showSuccessPopup && (
                  <div className="success-popup">
                    <div className="success-popup-content">
                      <img src={successGif} alt="Success GIF" />
                      <p>Customer added successfully!</p>
                      <button onClick={handlePopupClose}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCustomer;