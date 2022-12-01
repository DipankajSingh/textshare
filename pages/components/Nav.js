import React from 'react'
import styles from '../../styles/Home.module.css'
function Nav({ setLoggedIn, loggedIn }) {
    console.log('this is logged in', loggedIn)
    return (
        <nav className={styles.nav}>
            <p>
                <span>TaxT</span>
                <span>Share</span>
            </p>
            <div style={{ display: loggedIn ? 'flex' : "none" }}>
                <div className={styles.Id}></div>
                <button onClick={() => {
                    localStorage.removeItem("id")
                    setLoggedIn(false)
                }}>LogOut</button>
            </div>
        </nav>
    )
}

export default Nav
