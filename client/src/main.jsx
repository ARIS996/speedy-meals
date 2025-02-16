import React from 'react'
import ReactDOM from 'react-dom/client'
import { MealProvider } from './context/MealContext'
import AppRouter from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MealProvider>
    <AppRouter />
  </MealProvider>
)
