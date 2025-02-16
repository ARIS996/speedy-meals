import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MealContext } from '../context/MealContext'

export default function Header() {
  const { meals } = useContext(MealContext)
  return (
    <div className="header">
      <Link to="/" style={{ color: '#fff' }}>Speedy Meals</Link>
      <div>Meals: {meals.length}</div>
    </div>
  )
}
