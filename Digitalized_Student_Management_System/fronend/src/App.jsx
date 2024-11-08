import { useEffect, useState } from 'react'
import LoginPage from './components/LogIn.jsx'
// In your index.js or App.js
import 'boxicons/css/boxicons.min.css';
import { Outlet } from 'react-router';
import Sidebar from '../../fronend/src/components/Sidebar/Sidebar.jsx'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from './store/authSlice.js';
import React from "react"

function App() {

  return (
    <div className="w-full">
      <Outlet/>
    </div>
  )
}

export default App
