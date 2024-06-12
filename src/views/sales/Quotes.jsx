import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import editPng from '../../assets/images/edit.png';
import deletePng from '../../assets/images/delete.png';
import '../../scss/style.css';

const EditQuoteModal = ({ showEditModal, setShowEditModal, selectedQuote, onEditSuccess, setOpenSnackbar }) => {
  const [formData, setFormData] = useState({
    quote_Number: '',
    customer_name: '',
    customer_email: '',
    quote_date: '',
    validity_period: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedQuote) {
      const { quote_Number, customer_name, customer_email, quote_date, validity_period, notes } = selectedQuote;
      setFormData({
        quote_Number: quote_Number || '',
        customer_name: customer_name || '',
        customer_email: customer_email || '',
        quote_date: quote_date ? quote_date.split('T')[0] : '',
        validity_period: validity_period ? validity_period.split('T')[0] : '',
        notes: notes || '',
      });
    }
  }, [selectedQuote]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log('Form data updated:', formData); // Check if form data is updated correctly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedQuote || !selectedQuote.quote_id) {
        console.error('No selected quote or invalid quote id');
        return;
      }
      const response = await axios.put(`http://localhost:8087/sales/EditQuote/${selectedQuote.quote_id}`, formData);
      console.log('Quote updated:', response.data);
      onEditSuccess(response.data);
      setShowEditModal(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };
  
  return (
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} id="editQuoteModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Quote</h5>
            <button type="button" className="close" onClick={() => setShowEditModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="quote_Number">Quote Number</label>
                <input type="text" className="form-control" id="quote_Number" name="quote_Number" value={formData.quote_Number} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="customer_name">Customer Name</label>
                <input type="text" className="form-control" id="customer_name" name="customer_name" value={formData.customer_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="customer_email">Customer Email</label>
                <input type="email" className="form-control" id="customer_email" name="customer_email" value={formData.customer_email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="quote_date">Quote Date</label>
                <input type="date" className="form-control" id="quote_date" name="quote_date" value={formData.quote_date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="validity_period">Validity Period</label>
                <input type="date" className="form-control" id="validity_period" name="validity_period" value={formData.validity_period} onChange={handleChange} />
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

const DeleteQuoteModal = ({ showDeleteModal, setShowDeleteModal, handleDelete, selectedQuote, setOpenSnackbar }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Quote for deletion (handleSubmit):', selectedQuote);
    try {
      if (!selectedQuote || !selectedQuote.quote_id) {
        console.error('No selected quote or invalid quote id');
        return;
      }
      await handleDelete(selectedQuote);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="deleteQuoteModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Quote</h5>
            <button type="button" className="close" onClick={() => setShowDeleteModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this quote?</p>
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

const AllQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('http://localhost:8087/sales/AllQuotes');
      setQuotes(response.data);
    } catch (error)
    {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleEdit = (quoteId) => {
    // Placeholder code to show edit modal directly without fetching details
    // You can replace this with your actual implementation if needed
    const quote = quotes.find((quote) => quote.quote_id === quoteId);
    if (quote) {
      setSelectedQuote(quote);
      setShowEditModal(true);
      console.log('Edit modal should open now');
    } else {
      console.error('Quote not found');
    }
  };
  
  


  const handleDelete = async (quote) => {
    console.log('Selected Quote for deletion (handleDelete):', quote);
    try {
      const response = await axios.delete(`http://localhost:8087/sales/DeleteQuote/${quote.quote_id}`);
      if (response.status === 200) {
        setShowDeleteModal(false);
        const updatedQuotes = quotes.filter((q) => q.quote_id !== quote.quote_id);
        setQuotes(updatedQuotes);
        setOpenSnackbar(true);
      } else {
        console.error('Error deleting quote: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      if (error.response && error.response.status === 404) {
        console.error('Quote not found. It may have already been deleted.');
      }
    }
  };

  const handleEditSuccess = (updatedQuote) => {
    const updatedQuotes = quotes.map((quote) => {
      if (quote.quote_id === updatedQuote.quote_id) {
        return updatedQuote;
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-file-text"></i>
        </div>
        <div className="header-title">
          <h1>All Quotes</h1>
          <small>View All Quotes</small>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel lobidisable panel-bd">
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Quote Number</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Quote Date</th>
                        <th>Validity Period</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote) => (
                        <tr key={quote.quote_id}>
                          <td>{quote.quote_Number}</td>
                          <td>{quote.customer_name}</td>
                          <td>{quote.customer_email}</td>
                          <td>{quote.quote_date}</td>
                          <td>{quote.validity_period}</td>
                          <td>{quote.notes}</td>
                          <td>
                            <button type="button" className="edit-button" onClick={() => handleEdit(quote.quote_id)}>
                              <img src={editPng} alt="Edit" width="20" height="20" />
                            </button>
                            <button type="button" className="delete-button" onClick={() => { setSelectedQuote(quote); setShowDeleteModal(true); }}>
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
      <EditQuoteModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedQuote={selectedQuote}
        onEditSuccess={handleEditSuccess}
        setOpenSnackbar={setOpenSnackbar}
      />
      <DeleteQuoteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
        selectedQuote={selectedQuote}
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

export default AllQuotesPage;
