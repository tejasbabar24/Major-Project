import { useState } from 'react'
import LoginPage from './components/LoginPage'
// In your index.js or App.js
import 'boxicons/css/boxicons.min.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginPage/>
    </>
  )
}

export default App
