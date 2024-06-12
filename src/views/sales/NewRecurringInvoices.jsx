import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/addCustomer.css';

const NewRecurringInvoices = () => {
  const [formData, setFormData] = useState({
    referenceNo: '',
    recurringEvery: 'Hour',
    quantity: '',
    rate: '',
    tax: '',
    department: 'Technology', // Remove the default value
    startDate: '',
    endDate: '',
    client: '',
    total: '',
    notes: '',
  });

  const [departments, setDepartments] = useState(['Technology', 'IT', 'HR']);
  const [newDepartment, setNewDepartment] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData };

    if (name === 'quantity' || name === 'rate' || name === 'tax') {
        // Update the changed field value first
        newFormData[name] = value;

        const quantity = parseFloat(newFormData.quantity) || 0;
        const rate = parseFloat(newFormData.rate) || 0;
        const taxPercentage = parseFloat(newFormData.tax) || 0;

        let total = quantity * rate;

        // Apply tax
        if (!isNaN(taxPercentage)) {
            total += (total * taxPercentage) / 100;
        }

        newFormData.total = total.toFixed(2); // Update the total
    } else {
        newFormData[name] = value; // Update other fields
    }

    setFormData(newFormData);
};


  const handleNewDepartment = () => {
    if (newDepartment.trim() !== '') {
      setDepartments([...departments, newDepartment]);
      setFormData({ ...formData, department: newDepartment });
      setNewDepartment('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/sales/NewRecurringInvoice', formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Invoice added successfully');
        setFormData({
          referenceNo: '',
          recurringEvery: 'Hour',
          quantity: '',
          rate: '',
          tax: '',
          department:'Technology',
          startDate: '',
          endDate: '',
          client: '',
          total: '',
          notes: '',
        });
      } else {
        console.error('Failed to add Invoice:', response.data);
        alert('Failed to add Invoice');
      }
    } catch (err) {
      console.error('Error adding Invoice:', err);
      alert('Error adding Invoice');
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-suitcase"></i>
        </div>
        <div className="header-title">
          <h1>New Recurring invoices</h1>
          <small>New Recurring invoices Details</small>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel lobidisable panel-bd">
              <div className="panel-heading">
                <div className="btn-group" id="buttonexport">
                  <a href="#">
                    <h4>New Recurring invoices</h4>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form className="col-sm-6" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Reference No. /PO No.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ref No."
                      name="referenceNo"
                      value={formData.referenceNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Recurring Every</label>
                    <select
                      className="form-control"
                      name="recurringEvery"
                      value={formData.recurringEvery}
                      onChange={handleChange}
                    >
                      <option>Hour</option>
                      <option>Day</option>
                      <option>Week</option>
                      <option>Month</option>
                      <option>Year</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rate"
                      name="rate"
                      value={formData.rate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tax</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tax"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      className="form-control"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      {departments.map((dept) => (
                        <option key={dept}>{dept}</option>
                      ))}
                      <option value="">Add New Department</option>
                    </select>
                    {formData.department === '' && (
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Department"
                          value={newDepartment}
                          onChange={(e) => setNewDepartment(e.target.value)}
                        />
                        <button type="button" className="btn btn-primary mt-2" onClick={handleNewDepartment}>
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Client</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Client Name"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Notes</label><br />
                    <textarea
                      name="notes"
                      className="form-control"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Total</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Total"
                      name="total"
                      value={formData.total}
                      onChange={handleChange}
                      disabled 
                    />
                  </div>

                  <div className="form-group">
                    <input type="submit" value="Save" name="save" style={{marginRight:'10px'}} className="btn btn-primary" />
                    <button type="button" className="btn btn-secondary" onClick={() => setFormData({
                      referenceNo: '',
                      recurringEvery: 'Hour',
                      quantity: '',
                      rate: '',
                      tax: '',
                      department: '',
                      startDate: '',
                      endDate: '',
                      client: '',
                      total: '',
                      notes: '',
                    })}>Reset</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewRecurringInvoices;
