import { useState } from 'react'
import LoginPage from './components/LoginPage'
// In your index.js or App.js
import 'boxicons/css/boxicons.min.css';
import { Outlet } from 'react-router';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App