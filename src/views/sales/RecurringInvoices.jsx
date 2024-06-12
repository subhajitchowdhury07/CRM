/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import editPng from '../../assets/images/edit.png';
import deletePng from '../../assets/images/delete.png';
import '../../scss/style.css';

const EditInvoiceModal = ({ showEditModal, setShowEditModal, selectedInvoice, onEditSuccess, setOpenSnackbar }) => {
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (selectedInvoice) {
      setFormData({
        referenceNo: selectedInvoice.referenceNo || '',
        recurringEvery: selectedInvoice.recurringEvery || '',
        quantity: selectedInvoice.quantity || '',
        rate: selectedInvoice.rate || '',
        tax: selectedInvoice.tax || '',
        department: selectedInvoice.department || '',
        startDate: selectedInvoice.startDate ? selectedInvoice.startDate.slice(0, 10) : '', // Format the date correctly
        endDate: selectedInvoice.endDate ? selectedInvoice.endDate.slice(0, 10) : '', // Format the date correctly
        client: selectedInvoice.client || '',
        total: selectedInvoice.total || '',
        notes: selectedInvoice.notes || '',
      });
    }
  }, [selectedInvoice]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData };
  
    if (name === 'endDate') {
      // Convert the datetime string to a valid MySQL datetime format
      const formattedEndDate = new Date(value).toISOString().slice(0, 19).replace('T', ' ');
      newFormData[name] = formattedEndDate;
    } else if (name === 'quantity' || name === 'rate' || name === 'tax') {
      // Update the value for Quantity, Rate, or Tax
      newFormData[name] = value;
      
      // Calculate the new Total based on Quantity, Rate, and Tax
      const quantity = parseFloat(newFormData.quantity || 0);
      const rate = parseFloat(newFormData.rate || 0);
      const tax = parseFloat(newFormData.tax || 0);
      const total = (quantity * rate) + tax;
      
      // Update the Total field in the form data
      newFormData.total = total.toFixed(2); // Limit to 2 decimal places
    } else {
      newFormData[name] = value; // Update other fields
    }
  
    setFormData(newFormData);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedInvoice || !selectedInvoice.id) {
        console.error('No selected invoice or invalid invoice id');
        return;
      }
      const response = await axios.put(`http://localhost:8087/sales/AllRecurringInvoices/${selectedInvoice.id}`, formData);
      console.log('Invoice updated:', response.data);
      onEditSuccess(response.data);
      setShowEditModal(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} id="editInvoiceModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Invoice</h5>
            <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="referenceNo">Reference No.</label>
                <input type="text" className="form-control" id="referenceNo" name="referenceNo" value={formData.referenceNo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="recurringEvery">Recurring Every</label>
                <select className="form-control" id="recurringEvery" name="recurringEvery" value={formData.recurringEvery} onChange={handleChange}>
                  <option value="Hour">Hour</option>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  {/* Add more options as needed */}
                </select>

              </div>
              <div className="form-group">
  <label htmlFor="quantity">Quantity</label>
  <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
</div>
<div className="form-group">
  <label htmlFor="rate">Rate</label>
  <input type="number" className="form-control" id="rate" name="rate" value={formData.rate} onChange={handleChange} />
</div>
<div className="form-group">
  <label htmlFor="tax">Tax</label>
  <input type="text" className="form-control" id="tax" name="tax" value={formData.tax} onChange={handleChange} />
</div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input type="text" className="form-control" id="department" name="department" value={formData.department} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="client">Client</label>
                <input type="text" className="form-control" id="client" name="client" value={formData.client} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="total">Total</label>
                <input type="text" className="form-control" id="total" name="total" value={formData.total} onChange={handleChange} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea className="form-control" id="notes" name="notes" value={formData.notes} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeleteInvoiceModal = ({ showDeleteModal, setShowDeleteModal, handleDelete, selectedInvoice, setOpenSnackbar }) => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (!selectedInvoice || !selectedInvoice.id) {
        console.error('No selected invoice or invalid invoice id');
        return;
      }
      await handleDelete(selectedInvoice); // Pass the selected invoice object instead of just the ID
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="deleteInvoiceModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Invoice</h5>
            <button type="button" className="close" onClick={() => setShowDeleteModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this invoice?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={(e) => handleSubmit(e)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecurringInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:8087/sales/AllRecurringInvoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleEdit = (invoiceId) => {
    // Placeholder code to show edit modal directly without fetching details
    // You can replace this with your actual implementation if needed
    const invoice = invoices.find((invoice) => invoice.id === invoiceId);
    if (invoice) {
      setSelectedInvoice(invoice);
      setShowEditModal(true);
      setFormData({
        referenceNo: invoice.referenceNo || '',
        recurringEvery: invoice.recurringEvery || 'Hour',
        quantity: invoice.quantity || '',
        rate: invoice.rate || '',
        tax: invoice.tax || '',
        department: invoice.department || '',
        startDate: invoice.startDate || '',
        endDate: invoice.endDate || '',
        client: invoice.client || '',
        total: invoice.total || '',
        notes: invoice.notes || ''
      });
    } else {
      console.error('Invoice not found');
    }
  };


  const handleDelete = async (invoice) => {
    console.log('Selected Invoice for deletion:', invoice);
    try {
      const response = await axios.delete(`http://localhost:8087/sales/DeleteRecurringInvoice/${invoice.id}`);
      if (response.status === 200) {
        setShowDeleteModal(false);
        // Fetch updated invoice data after deletion
        try {
          const updatedResponse = await axios.get('http://localhost:8087/sales/AllRecurringInvoices');
          setInvoices(updatedResponse.data);
        } catch (error) {
          console.error('Error fetching updated invoice data:', error);
        }
        setOpenSnackbar(true);
      } else {
        console.error('Error deleting invoice: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      if (error.response && error.response.status === 404) {
        console.error('Invoice not found. It may have already been deleted.');
      }
    }
  };

  const handleEditSuccess = (updatedInvoice) => {
    // Update the invoices state with the updated invoice
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === updatedInvoice.id) {
        return updatedInvoice;
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-suitcase"></i>
        </div>
        <div className="header-title">
          <h1>Recurring Invoices</h1>
          <small>All Recurring Invoices</small>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel lobidisable panel-bd">
              <div className="panel-heading">
                <div className="btn-group" id="buttonexport">
                  <a href="#">
                    <h4>Recurring Invoices List</h4>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Reference No.</th>
                        <th>Recurring Every</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Tax</th>
                        <th>Department</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Client</th>
                        <th>Total</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>{invoice.referenceNo}</td>
                          <td>{invoice.recurringEvery}</td>
                          <td>{invoice.quantity}</td>
                          <td>{invoice.rate}</td>
                          <td>{invoice.tax}</td>
                          <td>{invoice.department}</td>
                          <td>{new Date(invoice.startDate).toLocaleDateString()}</td> {/* Format startDate */}
                          <td>{new Date(invoice.endDate).toLocaleDateString()}</td> {/* Format endDate */}
                          <td>{invoice.client}</td>
                          <td>{invoice.total}</td>
                          <td>{invoice.notes}</td>
                          <td>
                            <button type="button" className="edit-button" onClick={() => handleEdit(invoice.id)}>
                              <img src={editPng} alt="Edit" width="20" height="20" />
                            </button>
                            <button type="button" className="delete-button" onClick={() => { setSelectedInvoice(invoice); setShowDeleteModal(true); }}>
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
      <EditInvoiceModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedInvoice={selectedInvoice}
        onEditSuccess={handleEditSuccess}
        setOpenSnackbar={setOpenSnackbar}
      />
      <DeleteInvoiceModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        selectedInvoice={selectedInvoice}
        setOpenSnackbar={setOpenSnackbar}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Operation successful
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default RecurringInvoices;
