import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import authRoute from "./routes/auth-route"
import mainRoute from "./routes/main-routes"
import ThemeProvider from "./utils/theme/theme"
import {createTheme} from "@mui/material/styles";

const router = createBrowserRouter([...authRoute(),...mainRoute()])

function App() {
    const theme = createTheme();
    return (
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
