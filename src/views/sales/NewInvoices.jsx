import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/addCustomer.css';
import successGif from '../../assets/images/success.gif';

const NewINvoice = () => {
  const initialFormData = {
    invoiceNo: '',
    invoiceDate: '',
    refNo: '',
    refDate: '',
    reverseCharge: '',
    billType: '',
    placeOfSupply: '',
    paymentTerm: '',
    pdcDueDate: '',
    customerName: '',
    billingAddress: '',
    shippingAddress: '',
    gstin: '',
    state: '',
    contactPerson: '',
    itemCode: '',
    itemName: '',
    quantity: '',
    uom: '',
    itemRate: '',
    taxPercentage: '',
    discount: '',
    total: '',
    pinCode: '',
    hsnSacNumber: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    micrNumber: '',
    bankDetails: '',
    statusValue: ''
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/sales/NewInvoice', formData);
      if (response.status === 200) {
        console.log('Invoice add successfully');
        setShowSuccessPopup(true);
        handleReset(); // Reset the form after successful submission
      } else {
        console.error('Failed to add Invoice:', response.data);
        // Show error message
        alert('Failed to add Invoice');
      }
    } catch (err) {
      console.error('Error adding Invoice:', err);
      // Show error message
      alert('Error adding Invoice');
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
  };

  const statusValue =[
    'Active',
    'Inavtive',
  ];

  const indianStates = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-users"></i>
        </div>
        <div className="header-title">
          <div className="custom-heading">
            <h1>New Invoice</h1>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-bd lobidrag">
              <div className="panel-body">
                <form className="col-sm-6" onSubmit={handleSubmit}>
                  {/* Form fields */}
                  <div className="form-group">
                    <label>Invoice No.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Invoice No."
                      name="invoiceNo"
                      value={formData.invoiceNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Invoice Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Invoice Date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ref No.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Ref No."
                      name="refNo"
                      value={formData.refNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ref Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Ref Date"
                      name="refDate"
                      value={formData.refDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Reverse Charge</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Reverse Charge"
                      name="reverseCharge"
                      value={formData.reverseCharge}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Bill Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Bill Type"
                      name="billType"
                      value={formData.billType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Place of Supply</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Place of Supply"
                      name="placeOfSupply"
                      value={formData.placeOfSupply}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Term</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Payment Term"
                      name="paymentTerm"
                      value={formData.paymentTerm}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>PDC Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter PDC Due Date"
                      name="pdcDueDate"
                      value={formData.pdcDueDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Customer Name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Billing Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Billing Address"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Shipping Address"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>GSTIN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter GSTIN"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Contact Person"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Item Code</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Item Code"
                      name="itemCode"
                      value={formData.itemCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Item Name"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>UOM</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter UOM"
                      name="uom"
                      value={formData.uom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Item Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Item Rate"
                      name="itemRate"
                      value={formData.itemRate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tax Percentage (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Tax Percentage"
                      name="taxPercentage"
                      value={formData.taxPercentage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Total</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Total"
                      name="total"
                      value={formData.total}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PIN Code"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>HSN/SAC Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter HSN/SAC Number"
                      name="hsnSacNumber"
                      value={formData.hsnSacNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                    
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      name="statusValue"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Status</option>
                      {statusValue.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bank-name">
                    <h2>Bank Details</h2>
                  </div>
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Bank Name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter IFSC Code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Account Number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>MICR Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter MICR Number"
                      name="micrNumber"
                      value={formData.micrNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bank Details</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter Bank Details"
                      name="bankDetails"
                      value={formData.bankDetails}
                      onChange={handleChange}
                      required
                    ></textarea>
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
                      <p>Invoice added successfully !</p>
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

export default NewINvoice;
