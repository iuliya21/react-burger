
import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";


const modalRoot = document.getElementById("react-modals");

function ModalOverlay() {

  return createPortal((
    <div className={styles.overlay}>
      <Modal/>
    </div>
  ), modalRoot)
  
}

export default ModalOverlay;