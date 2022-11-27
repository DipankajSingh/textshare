import styles from '../styles/Home.module.css'
import Send from '../components/Send'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState("")
  const id = 'Dipankaj'
  const saveToJson = async () => {
    const res = await fetch('http://localhost:3000/api/storedata', {
      method: 'POST',
      body: JSON.stringify({ id, text }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
  }
  return (<>
    <nav className={styles.nav}>
      <p>
        <span>TaxT</span>
        <span>Share</span>
      </p>
      <button>LogOut</button>
    </nav>
    <form method='POST' onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <div>
        <input
          type="text"
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text to share!'
        />
        <button type='submit' onClick={saveToJson}>
          <Send />
        </button>
      </div>
    </form>
  </>
  )
}
