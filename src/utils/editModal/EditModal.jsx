

import React from 'react'
import { Input } from "../input/Input";
import styles from "./EditModal.module.scss";

import { useState } from 'react';

export const EditModal = ({onCancel, oldValue, onConfirm}) => {
    
    const [value, setValue] = useState(oldValue)


    

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2>Edit task</h2>
          <button
            className={styles.closeButton}
            onClick={onCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <p>Change the name of your task.</p>

        <Input
          value={value}
          setValue={setValue}
          type="text"
          placeholder="Enter task name..."
        />

        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>

          <button
            className={styles.confirmButton}
            onClick={() => onConfirm(value)}
            disabled={!value.trim()}
            type="button"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  )
}
