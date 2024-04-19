import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/addCustomer.css';
import { Snackbar } from '@mui/material';

const NewQuotePage = () => {
  const [formData, setFormData] = useState({
    quote_Number: '',
    customer_name: '',
    customer_email: '',
    quote_date: '',
    validity_period: '',
    products: [],
    agreed_to_terms: false,
    notes: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData };

    if (name === 'quantity' || name === 'unit_price' || name === 'discount' || name === 'tax') {
      const index = parseInt(e.target.dataset.index);
      const product = newFormData.products[index];

      product[name] = value;

      // Calculate total price
      const quantity = parseFloat(product.quantity) || 0;
      const unit_price = parseFloat(product.unit_price) || 0;
      const discount = parseFloat(product.discount) || 0;
      const tax = parseFloat(product.tax) || 0;

      let subtotal = quantity * unit_price;
      let total = subtotal;

      // Apply discount
      if (!isNaN(discount)) {
        total -= (subtotal * discount) / 100;
      }

      // Apply tax
      if (!isNaN(tax)) {
        total += (subtotal * tax) / 100;
      }

      product.total = total.toFixed(2); // Update the total
    } else {
      newFormData[name] = value; // Update other fields
    }

    setFormData(newFormData);
  };

  const handleagreed_to_termsChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, agreed_to_terms: checked });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    const productNumber = formData.products.length + 1;
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          name: '',
          description: '',
          quantity: '',
          unit_price: '',
          total: '',
          discount: '',
          tax: '',
        },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, products: updatedProducts });
  };

  const resetForm = () => {
    setFormData({
      quote_Number: '',
      customer_name: '',
      customer_email: '',
      quote_date: '',
      validity_period: '',
      products: [],
      agreed_to_terms: false,
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/sales/NewQuote', formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Quote added successfully');
        resetForm();
        setSnackbarMessage('Quote added successfully');
        setSnackbarOpen(true);
      } else {
        console.error('Failed to add Quote:', response.data);
        alert('Failed to add Quote');
      }
    } catch (err) {
      console.error('Error adding Quote:', err);
      alert('Error adding Quote');
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="header-icon">
          <i className="fa fa-file-text"></i>
        </div>
        <div className="header-title">
          <h1>New Quote</h1>
          <small>Create a New Quote</small>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-sm-9">
            <div className="panel lobidisable panel-bd">
              <div className="panel-heading">
                <div className="btn-group" id="buttonexport">
                  <a href="#">
                    <h4>New Quote</h4>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form className="col-sm-12" onSubmit={handleSubmit}>
                  <div className="section">
                    <h3>Customer Information</h3>
                    <div className="form-group">
                      <label>Quote Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quote_Number"
                        value={formData.quote_Number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Customer Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Quote Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="quote_date"
                        value={formData.quote_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Validity Period</label>
                      <input
                        type="date"
                        className="form-control"
                        name="validity_period"
                        value={formData.validity_period}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="section">
                    <h3>Products/Services</h3>
                    {formData.products.map((product, index) => (
                      <div key={index} className="product-section">
                        <h4>Product {index + 1}</h4>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <input
                            type="text"
                            className="form-control"
                            value={product.description}
                            onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                            style={{ width: '100%', maxWidth: '100%', minHeight: '40px' }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Quantity</label>
                          <input
                            type="number"
                            className="form-control"
                            value={product.quantity}
                            data-index={index}
                            onChange={handleChange}
                            name="quantity"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Unit Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={product.unit_price}
                            data-index={index}
                            onChange={handleChange}
                            name="unit_price"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Total Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={product.total}
                            onChange={(e) => handleProductChange(index, 'total', e.target.value)}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Discount</label>
                          <input
                            type="number"
                            className="form-control"
                            value={product.discount}
                            data-index={index}
                            onChange={handleChange}
                            name="discount"
                          />
                        </div>
                        <div className="form-group">
                          <label>Tax</label>
                          <input
                            type="number"
                            className="form-control"
                            value={product.tax}
                            data-index={index}
                            onChange={handleChange}
                            name="tax"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeProduct(index)}
                          >
                            Remove Product
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addProduct} style={{marginBottom:'10px'}}>
                      Add Product
                    </button>
                  </div>
                  <div className="section">
                    <h3>Notes</h3>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="section">
                    <h3>Terms and Conditions</h3>
                    <div className="form-group">
                      <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati libero sit, labore excepturi amet officia similique dolore consectetur temporibus molestias sunt, delectus est?</span>
                    </div>
                    <div className="form-group">
                      {/* Hidden input to ensure a false value is always sent */}
                      <input
                        type="hidden"
                        name="agreed_to_terms"
                        value="false"
                      />
                      {/* Checkbox input with value set to true when checked */}
                      <label>
                        <input
                          type="checkbox"
                          name="agreed_to_terms"
                          checked={formData.agreed_to_terms}
                          onChange={handleagreed_to_termsChange}
                          value="true"
                          required
                        />
                        &nbsp; I agree to the
                        <span> Terms and Conditions</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <input type="submit" value="Save" className="btn btn-primary" style={{marginRight:'10px'}} />
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
       <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default NewQuotePage;
