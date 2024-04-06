import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer data from the database
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8087/customers/listCustomer');
        setCustomers(response.data); // Assuming response.data is an array of customer objects
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

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
                          <td><img src={`http://localhost:8087/${customer.picture}`} className="img-circle" alt="User" width="50" height="50" /></td>
                          <td>{customer.first_name}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.email}</td>
                          <td>{customer.address}</td>
                          <td>{customer.customer_type}</td>
                          <td>{customer.created_at}</td>
                          <td><span className={customer.status === 'Active' ? 'label-custom label label-default' : 'label-danger label label-default'}>{customer.status}</span></td>
                          <td>
                            <button type="button" className="btn btn-add btn-sm" data-toggle="modal" data-target="#customerEditModal"><i className="fa fa-pencil"></i></button>
                            <button type="button" className="btn btn-danger btn-sm" data-toggle="modal" data-target="#customerDeleteModal"><i className="fa fa-trash-o"></i> </button>
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
      {/* Modals for edit and delete */}
      {/* Customer Edit Modal */}
      <div className="modal fade" id="customerEditModal" tabIndex="-1" role="dialog" aria-hidden="true">
        {/* Modal content */}
      </div>
      {/* Customer Delete Modal */}
      <div className="modal fade" id="customerDeleteModal" tabIndex="-1" role="dialog" aria-hidden="true">
        {/* Modal content */}
      </div>
    </div>
  );
};

export default CustomerList;