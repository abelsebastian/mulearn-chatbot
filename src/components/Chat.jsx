import { useEffect, useState } from "react"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { signOut } from "firebase/auth"
import Cookies from "universal-cookie"
import { auth, db } from "../firebase-config"
import "./Chat.css"

const cookies = new Cookies()

export default function Chat({ room, setIsAuth, setRoom }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(db, "messages"), where("room", "==", room), orderBy("createdAt"))
    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
  }, [room])

  const send = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    })
    setNewMessage("")
  }

  const logout = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  return (
    <div className="chat">
      <header>
        <span>#{room}</span>
        <button onClick={logout}>Sign Out</button>
      </header>

      <div className="messages">
        {messages.map((m) => {
          const sent = m.user === auth.currentUser.displayName
          return (
            <div key={m.id} className={`message ${sent ? "sent" : "received"}`}>
              {!sent && <div className="user">{m.user}</div>}
              <div className="text">{m.text}</div>
            </div>
          )
        })}
      </div>

      <form className="input-bar" onSubmit={send}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
