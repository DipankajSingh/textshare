import React from 'react'
import styles from '../../styles/Home.module.css'
import Send from './Send'


function InputField({ loggedIn, text, setText, saveToJson }) {
    return (
        <>
            <form method='POST' onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <div>
                    <label className={styles.textLabel} htmlFor="text">{loggedIn ? "Share It!" : "You're Not Logged In!"}</label>
                    <input
                        type="text"
                        id='text'
                        name='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={loggedIn ? "You're Ready To send!" : "Unique Id Required "}
                    />
                    <button type='submit' onClick={saveToJson}>
                        <Send />
                    </button>
                </div>
            </form>
        </>
    )
}

export default InputField
