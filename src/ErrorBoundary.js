import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, openSnackbar: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information to an error reporting service or console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              onClose={this.handleClose}
            >
              {this.state.error && this.state.error.toString()}
            </MuiAlert>
          </Snackbar>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
