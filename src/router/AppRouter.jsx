import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../components/Login'
import Form from '../components/Form'
import { Profile } from '../components/Profile'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Form />
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/profile',
        element:<Profile/>
    }
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
