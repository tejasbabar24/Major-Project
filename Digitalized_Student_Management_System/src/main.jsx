import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPage from './components/LoginPage.jsx'
import SignUp from './components/pages/SignUp.jsx'
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:(
            <LoginPage/>
        )
      }  ,
      
      {
        path:"/signup",
        element:(
            <SignUp/>
        )
      }  
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


