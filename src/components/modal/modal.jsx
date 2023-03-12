import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onClosePopup }) {

  React.useEffect(() => {
    const closeByEsc = (e) => {
      if(e.key === "Escape") {
        onClosePopup();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    }
  }, [])

  return createPortal(
    <ModalOverlay onClosePopup={onClosePopup}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.buttonClose} onClick={onClosePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

export default Modal;