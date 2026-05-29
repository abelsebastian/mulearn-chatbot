import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import { auth, provider } from "../firebase-config"
import "./Auth.css"

const cookies = new Cookies()

export default function Auth({ setIsAuth }) {
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
    cookies.set("auth-token", result.user.refreshToken)
    setIsAuth(true)
  }

  return (
    <div className="auth">
      <h1>ChatRoom</h1>
      <button onClick={signIn}>Continue with Google</button>
    </div>
  )
}
