import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import authRoute from "./routes/auth-route"
import ThemeProvider from "./utils/theme/theme"

const router = createBrowserRouter(authRoute())

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
