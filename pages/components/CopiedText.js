import React from 'react'
import styles from '../../styles/Home.module.css'
function CopiedText({ text }) {
    return (
        <div className={styles.copiedTextContainer}>
            <p >{text}</p>
            <button>copy</button>
        </div>
    )
}

export default CopiedText
