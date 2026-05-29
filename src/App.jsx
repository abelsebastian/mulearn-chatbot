import { useRef, useState } from "react"
import Cookies from "universal-cookie"
import Auth from "./components/Auth"
import Chat from "./components/Chat"

const cookies = new Cookies()

export default function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)

  if (!isAuth) return <Auth setIsAuth={setIsAuth} />

  if (!room) {
    return (
      <div className="room-picker">
        <h1>pick a room</h1>
        <input ref={roomInputRef} placeholder="Enter room name..." />
        <button onClick={() => setRoom(roomInputRef.current.value)}>Enter</button>
      </div>
    )
  }

  return <Chat room={room} setIsAuth={setIsAuth} setRoom={setRoom} />
}
