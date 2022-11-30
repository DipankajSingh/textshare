import styles from '../styles/Home.module.css'
import Send from '../components/Send'
import { useEffect, useState } from 'react'

export default function Home() {

  const [text, setText] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const id = loggedIn ? localStorage.getItem('id') : text
  const [type, setType] = useState()
  console.log(type, "the type")


  const saveToJson = async () => {
    const res = await fetch('http://localhost:3000/api/storedata', {
      method: 'POST',
      body: JSON.stringify({ id, text, type }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (localStorage.getItem("id") == null) {
      localStorage.setItem('id', text)
      setLoggedIn(true)
      setType('add')
    }
    console.log(data, loggedIn, id)
  }


  useEffect(() => {
    const fetchText = async () => {
      if (localStorage.getItem('id') !== null) {
        setLoggedIn(true)
        const res = await fetch('http://localhost:3000/api/fetch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "id": localStorage.getItem("id")
          }
        })
        const data = await res.json()
        console.log(data)
        setType('add')
      }
    }
    fetchText()
  }, [])


  return (<>
    <nav className={styles.nav}>
      <p>
        <span>TaxT</span>
        <span>Share</span>
      </p>
      <div>
        <div className={styles.Id}>Dipankaj</div>
        <button onClick={() => {
          localStorage.removeItem("id")
          setLoggedIn(false)
        }}>LogOut</button>
      </div>
    </nav>
    <div className={styles.container}>
      <form method='POST' onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div>
          <label className={styles.textLabel} htmlFor="text">{loggedIn ? "Enter text To copy " : "Please Enter An Old Or New Id Below!"}</label>
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
      <div className={styles.prompts}>
        <p className={styles.promptsText}>success</p>
        <span className={styles.promptsIcon}>@</span>
      </div>
    </div>
  </>
  )
}
