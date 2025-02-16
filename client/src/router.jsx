import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllMeals from './pages/AllMeals'
import AddMeal from './pages/AddMeal'
import MealDetails from './pages/MealDetails'
import UpdateMeal from './pages/UpdateMeal'
import Header from './components/Header'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AllMeals />} />
        <Route path="/add" element={<AddMeal />} />
        <Route path="/meals/:id" element={<MealDetails />} />
        <Route path="/meals/:id/update" element={<UpdateMeal />} />
      </Routes>
    </BrowserRouter>
  )
}
