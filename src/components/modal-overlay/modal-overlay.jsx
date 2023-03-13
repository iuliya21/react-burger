import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, onClosePopup }) {

  return (
    <div className={styles.overlay} onClick={onClosePopup}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  onClosePopup: PropTypes.func.isRequired
}

export default ModalOverlay;