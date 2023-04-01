import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import authRoute from "./routes/auth-route"
import mainRoute from "./routes/main-routes"
import ThemeProvider from "./utils/theme/theme"
import {createTheme} from "@mui/material/styles";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([...authRoute(), ...mainRoute()])
const queryClient = new QueryClient()

function App() {
    const theme = createTheme();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
