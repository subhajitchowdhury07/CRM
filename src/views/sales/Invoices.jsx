import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import editPng from '../../assets/images/edit.png';
import deletePng from '../../assets/images/delete.png';
import '../../scss/style.css';

const EditInvoiceModal = ({ showEditModal, setShowEditModal, selectedInvoice, onEditSuccess, setOpenSnackbar }) => {
    const [formData, setFormData] = useState({
      invoiceNo: '',
      customerName: '',
      total: '',
      invoiceDate: '',
      pdcDueDate: '',
      paymentTerm: '',
      status: ''
    });
  
    useEffect(() => {
      if (selectedInvoice) {
        setFormData({
          invoiceNo: selectedInvoice.invoiceNo || '',
          customerName: selectedInvoice.customerName || '',
          total: selectedInvoice.total || '',
          invoiceDate: selectedInvoice.invoiceDate || '',
          pdcDueDate: selectedInvoice.pdcDueDate || '',
          paymentTerm: selectedInvoice.paymentTerm || '',
          status: selectedInvoice.status || ''
        });
      }
    }, [selectedInvoice]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      // Check if the input is a date field
      if (e.target.type === 'date') {
        // Create a new Date object from the input value
        const date = new Date(value);
        // Format the date to "yyyy-MM-dd" format
        const formattedDate = date.toISOString().split('T')[0];
        // Update the state with the formatted date
        setFormData({ ...formData, [name]: formattedDate });
      } else {
        // For non-date fields, update the state directly
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!selectedInvoice || !selectedInvoice.id) {
          console.error('No selected invoice or invalid invoice id');
          return;
        }
        const response = await axios.put(`http://localhost:8087/sales/invoices/${selectedInvoice.id}`, formData);
        console.log('Invoice updated:', response.data);
        onEditSuccess(response.data); // Update state with the updated invoice data
        setShowEditModal(false);
        setOpenSnackbar(true); // Set Snackbar visibility
      } catch (error) {
        console.error('Error updating invoice:', error);
      }
    };
  
    return (
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} id="invoiceEditModal" tabIndex="-1" role="dialog" aria-hidden={!showEditModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Invoice</h5>
              <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="invoiceNo">Invoice No</label>
                  <input type="text" className="form-control" id="invoiceNo" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="customerName">Customer Name</label>
                  <input type="text" className="form-control" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="total">Total</label>
                  <input type="text" className="form-control" id="total" name="total" value={formData.total} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input type="text" className="form-control" id="invoiceDate" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="pdcDueDate">PDC Due Date</label>
                  <input type="date" className="form-control" id="pdcDueDate" name="pdcDueDate" value={formData.pdcDueDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="paymentTerm">Payment Term</label>
                  <input type="text" className="form-control" id="paymentTerm" name="paymentTerm" value={formData.paymentTerm} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" id="status" name="status" value={formData.status} onChange={handleChange}>
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

const DeleteInvoiceModal = ({ showDeleteModal, setShowDeleteModal, handleDelete, selectedInvoice, setOpenSnackbar }) => {
  const handleConfirmDelete = async () => {
    if (!selectedInvoice) {
      console.error('No invoice selected for deletion');
      return;
    }
    try {
      await handleDelete(selectedInvoice);
      setShowDeleteModal(false);
      setOpenSnackbar(true); // Set Snackbar visibility
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="invoiceDeleteModal" tabIndex="-1" role="dialog" aria-hidden={!showDeleteModal}>
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
            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format to display only date portion
};

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State variable for Snackbar visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8087/sales/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setShowEditModal(true);
    // Set the formData state to match the selected invoice
    setFormData({
      invoiceNo: invoice.invoiceNo || '',
      customerName: invoice.customerName || '',
      total: invoice.total || '',
      invoiceDate: invoice.invoiceDate || '',
      pdcDueDate: invoice.pdcDueDate || '',
      paymentTerm: invoice.paymentTerm || '',
      status: invoice.status || ''
    });
  };

  const handleDelete = async (invoice) => {
    console.log('Selected Invoice for deletion:', invoice);
    try {
      const response = await axios.delete(`http://localhost:8087/sales/invoices/${invoice.id}`);
      if (response.status === 200) {
        setShowDeleteModal(false);
        // Fetch updated invoice data after deletion
        try {
          const updatedResponse = await axios.get('http://localhost:8087/sales/invoices');
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
    const updatedInvoices = invoices.map(invoice => {
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
        {/* Header content */}
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-bd lobidrag">
              <div className="panel-heading">
                {/* Add invoice button */}
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table id="dataTableExample1" className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr className="info">
                        <th>Invoice No</th>
                        <th>Customer Name</th>
                        <th>Total</th>
                        <th>Invoice Date</th>
                        <th>PDC Due Date</th>
                        <th>Payment Term</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <tr key={invoice.id}>
                          <td>{invoice.invoiceNo}</td>
                          <td>{invoice.customerName}</td>
                          <td>{invoice.total}</td>
                          <td>{formatDate(invoice.invoiceDate)}</td>
                          <td>{formatDate(invoice.pdcDueDate)}</td>
                          <td>{invoice.paymentTerm}</td>
                          <td>{invoice.status}</td>
                          <td>
                            <button type="button" className="edit-button" onClick={() => handleEdit(invoice)}>
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
        onEditSuccess={handleEditSuccess} // Pass the onEditSuccess function
        setInvoices={setInvoices} // Pass setInvoices to update the table
        setOpenSnackbar={setOpenSnackbar} // Pass setOpenSnackbar function
      />
      <DeleteInvoiceModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        selectedInvoice={selectedInvoice}
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

export default InvoiceList;
