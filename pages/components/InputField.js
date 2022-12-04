import React from 'react'
import styles from '../../styles/Home.module.css'
import Send from './Send'


function InputField({ loggedIn, text, setText, saveToJson }) {
    return (
        <>
            <form method='POST' onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <div>
                    <label className={styles.textLabel} htmlFor="text">{loggedIn ? "Enter text To copy " : "Enter An Existing Or New Id"}</label>
                    <input
                        type="text"
                        id='text'
                        name='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={loggedIn ? "Type here to send" : "Ex: Dipankaj_123singh"}
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
