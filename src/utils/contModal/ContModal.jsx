

import styles from "../../utils/contModal/ContModal.module.scss";
import React from 'react'



export const ContModal = ({clientX, clientY, onEdit, }) => {
  return (
    <div className={styles.contextMenu} style={{top: clientY-50 + 'px', left: clientX + 'px'}}>
      <button
        className={styles.menuButton}
        onClick={onEdit}
      >
        ✎ Edit
      </button>
    </div>
  )
}
