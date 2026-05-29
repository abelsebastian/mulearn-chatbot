# 💬 Firebase React Chat Room — Vibe Code Prompt

## What You're Building

A **minimal, real-time multi-room chat app** using React + Firebase. Think iMessage meets a developer tool — clean, fast, no fluff.

---

## Tech Stack

- **React** (Vite or CRA)
- **Firebase** — Firestore (messages) + Auth (Google sign-in)
- **universal-cookie** — persist auth token across sessions
- **CSS Modules or plain CSS** — no UI libraries, keep it raw

---

## UI Aesthetic

**Brutally minimal.** Think:

- White or off-white (`#FAFAFA`) background
- One accent color — pick any single hue (e.g. `#0066FF`, `#10B981`, `#7C3AED`)
- Monospace font (`JetBrains Mono` or `IBM Plex Mono`) for messages
- Sans-serif (`Geist` or `DM Sans`) for UI chrome
- No rounded corners everywhere — sharp or very slightly rounded (`4px` max)
- No shadows, no gradients, no cards with elevation
- Use borders (`1px solid #E5E5E5`) to separate areas
- Sent messages: right-aligned, accent color background, white text
- Received messages: left-aligned, `#F0F0F0` background, dark text
- Timestamps: tiny, muted, `0.65rem`

---

## App Flow

```
Landing → [Sign In with Google]
    ↓
Room Entry → [Type room name] → [Enter Chat]
    ↓
Chat Room → [Messages] + [Input bar] + [Sign Out]
```

---

## Pages / Components to Build

### 1. `<Auth />` — Sign In Screen
- Full-screen centered layout
- App name at top (`ChatRoom` or whatever you want)
- Single button: **"Continue with Google"**
- On click → `signInWithPopup(auth, googleProvider)`
- Save `user.refreshToken` to cookie `auth-token`
- No registration, no email/password

### 2. `<App />` — Root / Router Logic
- Check for cookie `auth-token` on load
- If no token → show `<Auth />`
- If token exists but no room → show room picker
- If token + room → show `<Chat />`
- Room picker: one `<input ref={roomInputRef} placeholder="Enter room name..." />` + Enter button
- On enter → `setRoom(roomInputRef.current.value)`

### 3. `<Chat />` — Main Chat View
- **Header bar**: room name on left, "Sign Out" button on right
- **Message list**: scrollable, newest at bottom
- **Input bar**: fixed at bottom, text input + send button

#### Sending Messages
```js
addDoc(collection(db, "messages"), {
  text: newMessage,
  createdAt: serverTimestamp(),
  user: auth.currentUser.displayName,
  room: room,
})
```

#### Receiving Messages (real-time)
```js
const q = query(
  collection(db, "messages"),
  where("room", "==", room),
  orderBy("createdAt")
)
onSnapshot(q, (snapshot) => {
  setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
})
```
> ⚠️ Firebase will throw a console error asking you to create a **composite index** (room + createdAt). Click the link in the error to auto-create it in your Firebase console.

#### Sign Out
```js
signOut(auth)
cookies.remove("auth-token")
setIsAuth(false)
setRoom(null)
```

---

## Firebase Setup Checklist

- [ ] Create project at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Register web app → copy config
- [ ] Enable **Authentication → Google** sign-in method
- [ ] Enable **Firestore Database** (start in test mode)
- [ ] Paste config into `src/firebase-config.js`

```js
// src/firebase-config.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  // paste your config here
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
```

---

## File Structure

```
src/
├── firebase-config.js
├── App.jsx
├── App.css
├── components/
│   ├── Auth.jsx
│   ├── Auth.css
│   ├── Chat.jsx
│   └── Chat.css
```

---

## CSS Rules to Follow

```css
/* Global resets */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: #FAFAFA; color: #111; }

/* Message bubbles */
.message.sent   { align-self: flex-end;   background: #0066FF; color: #fff; }
.message.received { align-self: flex-start; background: #F0F0F0; color: #111; }
.message { padding: 8px 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; max-width: 70%; }

/* Input bar */
.input-bar { display: flex; border-top: 1px solid #E5E5E5; padding: 12px; gap: 8px; }
.input-bar input { flex: 1; border: 1px solid #E5E5E5; padding: 8px 12px; font-size: 0.9rem; outline: none; }
.input-bar input:focus { border-color: #0066FF; }
.input-bar button { background: #0066FF; color: #fff; border: none; padding: 8px 16px; cursor: pointer; }
```

---

## Install Commands

```bash
npm create vite@latest chatroom -- --template react
cd chatroom
npm install firebase universal-cookie
npm run dev
```

---

## Done? Host It

```bash
npm run build
# Deploy /dist to GitHub Pages, Vercel, or Netlify
```

Then share your repo in the **#web-development** channel with hashtag **`#cl-react-chatapp`** 🚀

---

> **Vibe summary:** Keep every decision minimal. If something feels decorative, remove it. The UI should feel like it was designed by an engineer who has *taste*.