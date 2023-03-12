import styles from "./modal-overlay.module.css";

function ModalOverlay({ children, onClosePopup }) {

  return (
    <div className={styles.overlay} onClick={onClosePopup}>
      {children}
    </div>
  )
}

export default ModalOverlay;