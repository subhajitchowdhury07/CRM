import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';
import '../../scss/transection.css';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';

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

const AccountSelect = ({ value, onChange }) => (
  <div className="form-group">
    <label>Account</label>
    <select className="form-control" value={value} onChange={onChange} required>
      <option value="">Select Account</option>
      <option value="Bank of Asia">Bank of Asia</option>
      <option value="Brac Bank">Brac Bank</option>
      <option value="National Bank">National Bank</option>
      <option value="Exim Bank">Exim Bank</option>
      <option value="Datchbangla Bank">Datchbangla Bank</option>
      <option value="Sonali Bank">Sonali Bank</option>
    </select>
  </div>
);

const DateInput = ({ value, onChange }) => (
  <div className="form-group">
    <label>Date</label>
    <input type="date" className="form-control" value={value} onChange={onChange} required />
  </div>
);

const DescriptionInput = ({ value, onChange }) => (
  <div className="form-group">
    <label>Description</label>
    <input type="text" className="form-control" placeholder="Enter Short description" value={value} onChange={onChange} required />
  </div>
);

const AmountInput = ({ value, onChange }) => (
  <div className="form-group">
    <label>Amount</label>
    <input type="number" className="form-control" placeholder="Enter Amount" value={value} onChange={onChange} required />
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [accountRequired, setAccountRequired] = useState(false);
  const [dateRequired, setDateRequired] = useState(false);
  const [descriptionRequired, setDescriptionRequired] = useState(false);
  const [amountRequired, setAmountRequired] = useState(false);
  const nodeRef = React.useRef(null);

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
    setAccountRequired(false);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateRequired(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionRequired(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountRequired(false);
  };

  const handleSubmit = () => {
    // Check if any field is blank
    if (!account || !date || !description || !amount) {
      if (!account) setAccountRequired(true);
      if (!date) setDateRequired(true);
      if (!description) setDescriptionRequired(true);
      if (!amount) setAmountRequired(true);
      return;
    }

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
        // Clear form fields
        setAccount('');
        setDate('');
        setDescription('');
        setAmount('');
        // Show snackbar
        setShowSnackbar(true);
        // Trigger callback function passed from parent component
        onDepositSubmit();
        // Hide snackbar after 3 seconds
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
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
          <AccountSelect value={account} onChange={handleAccountChange} />
          {accountRequired && <p className="text-danger">Account is required</p>}
          <DateInput value={date} onChange={handleDateChange} />
          {dateRequired && <p className="text-danger">Date is required</p>}
          <DescriptionInput value={description} onChange={handleDescriptionChange} />
          {descriptionRequired && <p className="text-danger">Description is required</p>}
          <AmountInput value={amount} onChange={handleAmountChange} />
          {amountRequired && <p className="text-danger">Amount is required</p>}
          <SubmitButton onSubmit={handleSubmit} />
        </form>
        <StyledSnackbar
          autoHideDuration={3000}
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          nodeRef={nodeRef}
        >
          <Transition
            timeout={{ enter: 400, exit: 400 }}
            in={showSnackbar}
            appear
            unmountOnExit
            onEnter={() => {}}
            onExited={() => {}}
            nodeRef={nodeRef}
          >
            {(status) => (
              <SnackbarContent
                style={{
                  transform: positioningStyles[status],
                  transition: 'transform 300ms ease',
                }}
                ref={nodeRef}
              >
                <CheckRoundedIcon
                  sx={{
                    color: 'success.main',
                    flexShrink: 0,
                    width: '1.25rem',
                    height: '1.5rem',
                  }}
                />
                <div className="snackbar-message">
                  <p className="snackbar-title">Deposit added successfully!</p>
                </div>
                <CloseIcon className="snackbar-close-icon" />
              </SnackbarContent>
            )}
          </Transition>
        </StyledSnackbar>
      </div>
    </div>
  );
};

const RecentDepositsTable = ({ deposits }) => (
  <div className="panel lobidisable panel-bd">
    <div className="panel-heading">
      <div className="panel-title">
        <h4 style={{ marginBottom: '30px' }}>Recent Deposits</h4>
      </div>
    </div>
    <div className="panel-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  display: flex;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#249542'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 2px 16px rgba(0,0,0, 0.5)`
      : `0 2px 16px ${grey[200]}`
  };
  padding: 0.75rem;
  color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
  }
  `,
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};
