import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/HOD/HodHome.jsx'
import ClassroomHomePage from './components/classroom/ClassroomHomePage.jsx'
import Viewclassroom from './components/classroom/Viewclassroom.jsx'

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
      },
      {
        path:"/home",
        element:(
          <Home/>
        )
      },
      {
        path:"/signup",
        element:(
            <SignupPage/>
        )
      },
      {
        //path:"/add-faculty" 
        path:"/classroom"  ,
        element:(
            <ClassroomHomePage/>
        )
      },
      {
        path:"viewclassroom",
        element:(
           <Viewclassroom/>
        )
      },
      {
        path:"/exam",
        element:(
            <Home/>
        )
      },
      {
        path:"/exam-result",
        element:(
            <Home/>
        )
      },
      {
        path:"/timetable",
        element:(
            <Home/>
        )
      },
      {
        path:"/homework",
        element:(
            <Home/>
        )
      },
      
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
