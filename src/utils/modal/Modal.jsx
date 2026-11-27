import React from "react";
import styles from "./Modal.module.scss";

export const Modal = ({ isOpen, message, onClose }) => {

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Notification</h2>

        <p>{message}</p>

        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};
