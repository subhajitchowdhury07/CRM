/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import {
  cilCheck
} from '@coreui/icons'
import '../../scss/transection.css';

const ContentHeader = () => (
  <section className="content-header">
    <div className="header-icon">
      <i className="fa fa-shopping-basket"></i>
    </div>
    <div className="page-heading">
      <h1>Deposit</h1>
      <small>Deposit list & new Deposits</small>
    </div>
  </section>
);

const AccountSelect = () => (
  <div className="form-group">
    <label>Account</label>
    <select className="form-control">
      <option>Bank of Asia</option>
      <option>Brac Bank</option>
      <option>National Bank</option>
      <option>Exim Bank</option>
      <option>Datchbangla Bank</option>
      <option>Sonali Bank</option>
    </select>
  </div>
);

const DateInput = ({ onChange }) => (
  <div className="form-group">
    <label>Date</label>
    <input type="date" className="form-control" onChange={onChange} />
  </div>
);

const DescriptionInput = ({ onChange }) => (
  <div className="form-group">
    <label>Description</label>
    <input type="text" className="form-control" placeholder="Enter Short description" onChange={onChange} required />
  </div>
);

const AmountInput = ({ onChange }) => (
  <div className="form-group">
    <label>Amount</label>
    <input type="number" className="form-control" placeholder="Enter Amount" onChange={onChange} required />
  </div>
);

const SubmitButton = ({ onSubmit }) => (
  <div className="form-group">
    <button type="button" className="btn btn-success" onClick={onSubmit}>
    <CIcon icon={cilCheck} />Submit
    </button>
  </div>
);

const AddDepositForm = ({ onDepositSubmit }) => {
  const [account, setAccount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    // Prepare deposit data
    const depositData = {
      account,
      date,
      description,
      amount,
    };

    // Call API to add deposit
    axios.post('http://localhost:8087/transaction/NewDeposit', depositData)
      .then((response) => {
        console.log('Deposit added successfully');
        // Trigger callback function passed from parent component
        onDepositSubmit();
      })
      .catch((error) => {
        console.error('Error adding deposit:', error);
      });
  };

  return (
    <div className="panel lobidisable panel-bd">
      <div className="panel-heading">
        <div className="panel-title">
          <h4>Add Deposit</h4>
        </div>
      </div>
      <div className="panel-body">
        <form>
          <AccountSelect />
          <DateInput onChange={handleDateChange} />
          <DescriptionInput onChange={handleDescriptionChange} />
          <AmountInput onChange={handleAmountChange} />
          <SubmitButton onSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

const RecentDepositsTable = ({ deposits }) => (
  <div className="panel lobidisable panel-bd">
    <div className="panel-heading">
      <div className="panel-title">
        <h4 style={{marginBottom:'30px'}}>Recent Deposits</h4>
      </div>
    </div>
    <div className="panel-body">
      <div className="table-responsive">
        {Array.isArray(deposits) && deposits.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead>
              <tr className="info">
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit, index) => (
                <tr key={index}>
                  <td>{deposit.description}</td>
                  <td>{deposit.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent deposits found.</p>
        )}
      </div>
    </div>
  </div>
);

const DepositPage = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    // Fetch recent deposits from the server
    axios.get('http://localhost:8087/transaction/recent')
      .then((response) => {
        console.log('Recent deposits fetched successfully');
        setDeposits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent deposits:', error);
      });
  }, []);

  const handleDepositSubmit = () => {
    // After adding a new deposit, fetch updated deposit list
    axios.get('http://localhost:8087/transaction/recent')
      .then((response) => {
        console.log('Recent deposits fetched successfully');
        setDeposits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent deposits:', error);
      });
  };

  return (
    <div className="content-wrapper">
      <ContentHeader />
      <section className="content">
        <div className="row">
          <div className="col-sm-4">
            <AddDepositForm onDepositSubmit={handleDepositSubmit} />
          </div>
          <div className="col-sm-8">
            <RecentDepositsTable deposits={deposits} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepositPage;
