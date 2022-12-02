import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import CopiedText from './components/CopiedText'
import InputField from './components/InputField'

export default function Home() {

  const [text, setText] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const id = loggedIn ? localStorage.getItem('id') : text
  const [type, setType] = useState('addUser')
  console.log(type, "the type")

  const [copiedText, setCopiedText] = useState([])


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
    setCopiedText(data)
    console.log(copiedtext)
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
        setCopiedText(data.text)
      }
    }
    fetchText()
  }, [])


  return (<>
    <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    <div className={styles.container}>
      <InputField
        loggedIn={loggedIn}
        setText={setText}
        text={text}
        saveToJson={saveToJson}
      />
      <p className={styles.promptsText}>success</p>

      <div className={styles.copiedContainer}>
        {copiedText && copiedText.map((v, i) => {
          return <CopiedText text={v} />
        })}
      </div>
    </div>

  </>
  )
}
