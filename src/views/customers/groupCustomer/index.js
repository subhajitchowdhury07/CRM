import React, { useState } from 'react';
import '../../../scss/style.css';

const PopupButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button className="open-popup-button" onClick={togglePopup}>Open Popup</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>We appreciate your interaction.</p>
            <button className="close-popup-button" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
