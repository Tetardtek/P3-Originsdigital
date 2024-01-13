import React from "react";
import PropTypes from "prop-types";
import "../styles/Popup.scss";

function Popup({ children, onClose, onConfirm }) {
  const handleClose = () => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        {children}
        <button type="submit" onClick={handleClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

Popup.defaultProps = {
  children: null,
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Popup;
