import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getMeal, deleteMeal } from '../services/apiClient'
import { MealContext } from '../context/MealContext'

export default function MealDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const { meals, setMeals } = useContext(MealContext)
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    getMeal(id).then(res => setMeal(res.data)).catch(()=>{})
  }, [id])

  function handleRemove() {
    deleteMeal(id).then(() => {
      setMeals(meals.filter(m => m._id!==id))
      nav('/')
    }).catch(()=>{})
  }

  if (!meal) return <div className="container">Loading...</div>
  return (
    <div className="container">
      <h2>{meal.name}</h2>
      <p>Cook Time: {meal.cookTime}</p>
      <p>Directions: {meal.directions}</p>
      <p>Ingredients: {meal.ingredients?.join(', ')}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  )
}
