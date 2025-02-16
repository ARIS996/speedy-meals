import React, { createContext, useState, useEffect } from 'react'
import { getMeals } from '../services/apiClient'

export const MealContext = createContext()

export function MealProvider({ children }) {
  const [meals, setMeals] = useState([])
  useEffect(() => {
    loadMeals()
  }, [])
  async function loadMeals() {
    try {
      const { data } = await getMeals()
      setMeals(data)
    } catch {}
  }
  return (
    <MealContext.Provider value={{ meals, setMeals, loadMeals }}>
      {children}
    </MealContext.Provider>
  )
}
