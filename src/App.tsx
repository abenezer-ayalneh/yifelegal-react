import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import authRoute from "./routes/auth-route"
import mainRoute from "./routes/main-routes"
import ThemeProvider from "./utils/theme/theme"

const router = createBrowserRouter([...authRoute(),...mainRoute()])

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
