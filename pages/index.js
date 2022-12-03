import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import CopiedText from './components/CopiedText'
import InputField from './components/InputField'
import Head from 'next/head'
export default function Home() {
  const localUrl = 'http://localhost:3000'
  const productionUrl = "https://textshare.vercel.app"
  const [text, setText] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [type, setType] = useState(undefined)
  const [copiedText, setCopiedText] = useState([])
  const [localId, setLocalId] = useState()

  const saveToJson = async () => {
    if (text !== '') {

      const res = await fetch(`${productionUrl}/api/storedata`, {
        method: 'POST',
        body: JSON.stringify({ id: localStorage.getItem('id') || text, text, type }),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      const data = await res.json()

      if (localStorage.getItem('id') == null) {
        localStorage.setItem('id', text)
        setLoggedIn(true)
        setType('add')
        setLocalId(text)
      }

      setText('')
      setCopiedText(data.text)
    }
  }


  useEffect(() => {
    const fetchText = async () => {
      if (localStorage.getItem('id') !== null) {
        setLocalId(localStorage.getItem('id'))
        setLoggedIn(true)
        const res = await fetch(`${productionUrl}/api/fetch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "id": localStorage.getItem("id")
          }
        })
        const data = await res.json()
        setType('add')
        setCopiedText(data.text)
      }
    }
    fetchText()
  }, [])


  return (<>
    <Head>
      <title>TextShare - share your text anywhere!</title>
    </Head>
    <Nav setLoggedIn={setLoggedIn} setQuery={setType} id={localId} loggedIn={loggedIn} />
    <div className={styles.container}>
      <InputField
        loggedIn={loggedIn}
        setText={setText}
        text={text}
        saveToJson={saveToJson}
      />

      <div className={styles.copiedContainer}>
        {copiedText && copiedText.map((v, i) => {
          return <CopiedText text={v} key={i} />
        })}
      </div>
    </div>

  </>
  )
}
