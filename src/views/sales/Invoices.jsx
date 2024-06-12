import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import editPng from '../../assets/images/edit.png';
import deletePng from '../../assets/images/delete.png';
import '../../scss/style.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset).toISOString().split('T')[0];
};

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
        invoiceDate: formatDate(selectedInvoice.invoiceDate) || '',
        pdcDueDate: formatDate(selectedInvoice.pdcDueDate) || '',
        paymentTerm: selectedInvoice.paymentTerm || '',
        status: selectedInvoice.status || ''
      });
    }
  }, [selectedInvoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedInvoice || !selectedInvoice.id) {
        console.error('No selected invoice or invalid invoice id');
        return;
      }
      const response = await axios.put(`http://localhost:8087/sales/invoices/${selectedInvoice.id}`, formData);
      onEditSuccess(response.data);
      setShowEditModal(false);
      setOpenSnackbar({ open: true, message: 'Invoice updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating invoice:', error);
      const errorMsg = error.response?.data?.message || 'An unexpected error occurred while updating the invoice.';
      setOpenSnackbar({ open: true, message: errorMsg, severity: 'error' });
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
                <input type="text" className="form-control" id="total" name="total" value={formData.total} onChange={handleChange} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input type="date" className="form-control" id="invoiceDate" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} />
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
      setOpenSnackbar({ open: true, message: 'Invoice deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      setOpenSnackbar({ open: true, message: 'Error deleting invoice', severity: 'error' });
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

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
  };

  const handleDelete = async (invoice) => {
    try {
      const response = await axios.delete(`http://localhost:8087/sales/invoices/${invoice.id}`);
      if (response.status === 200) {
        setShowDeleteModal(false);
        setInvoices(invoices.filter(i => i.id !== invoice.id));
        setOpenSnackbar({ open: true, message: 'Invoice deleted successfully', severity: 'success' });
      } else {
        console.error('Error deleting invoice: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      if (error.response && error.response.status === 404) {
        setOpenSnackbar({ open: true, message: 'Invoice not found. It may have already been deleted.', severity: 'error' });
      }
    }
  };

  const handleEditSuccess = (updatedInvoice) => {
    const updatedInvoices = invoices.map(invoice => (invoice.id === updatedInvoice.id ? updatedInvoice : invoice));
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
                          <td>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: invoice.status === 'Active' ? '#368a37' : '#942527',
                              color: 'white',
                              width: '75px',
                              textAlign: 'center'
                            }}>{invoice.status}</span>
                          </td>
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
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar({ open: false, message: '', severity: 'success' })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar({ open: false, message: '', severity: 'success' })}
          severity={openSnackbar.severity}
        >
          {openSnackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default InvoiceList;
