import React from 'react';
import '../../../scss/style.css';

const DeleteCustomerModal = ({ showDeleteModal, setShowDeleteModal, handleDelete, selectedCustomer }) => {
  return (
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="customerDeleteModal" tabIndex="-1" role="dialog" aria-hidden={!showDeleteModal}>
      {/* Modal content for delete */}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Customer</h5>
            <button type="button" className="close" onClick={() => setShowDeleteModal(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this customer?</p>
            {/* Button for confirming delete action */}
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedCustomer.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
