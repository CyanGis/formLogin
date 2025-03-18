import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../components/Login'
import Form from '../components/Form'




const router = createBrowserRouter([
    {
        path: '/',
        element: <Form />
    },
    {
        path:'/login',
        element: <Login />
    }
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
