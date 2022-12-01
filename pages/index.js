import styles from '../styles/Home.module.css'
import Send from './components/Send'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'

export default function Home() {

  const [text, setText] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const id = loggedIn ? localStorage.getItem('id') : text
  const [type, setType] = useState('addUser')
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
    setText('')
    console.log(data, loggedIn, id)
  }


  useEffect(() => {
    console.log('rerenderd!')
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
    <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
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
