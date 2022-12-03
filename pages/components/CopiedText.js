import React from 'react'
import styles from '../../styles/Home.module.css'
function CopiedText({ text }) {
    return (
        <div className={styles.copiedTextContainer}>
            <p >{text}</p>
            <button onClick={() => navigator.clipboard.writeText(text)}>copy</button>
        </div>
    )
}

export default CopiedText
