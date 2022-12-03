import React from 'react'
import styles from '../../styles/Home.module.css'
function Nav({ setLoggedIn, id, setQuery, loggedIn }) {
    return (
        <nav className={styles.nav}>
            <p>
                <span>TaxT</span>
                <span>Share</span>
            </p>
            <div style={{ display: loggedIn ? 'flex' : "none" }}>
                <div
                    onClick={() => navigator.clipboard.writeText(id)}
                    className={styles.Id}>{id}</div>
                <button onClick={() => {
                    localStorage.removeItem("id")
                    setLoggedIn(false)
                    setQuery(undefined)

                }}>LogOut</button>
            </div>
        </nav>
    )
}

export default Nav
