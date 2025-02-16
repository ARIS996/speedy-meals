import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MealContext } from '../context/MealContext'
import MealCard from '../components/MealCard'

export default function AllMeals() {
  const { meals } = useContext(MealContext)
  return (
    <div className="container">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/add">Add Meal</Link>
      </div>
      <table className="table">
        <thead>
          <tr><th>Meal</th><th>Cook Time</th><th>Options</th></tr>
        </thead>
        <tbody>
          {meals.map(m => <MealCard key={m._id} meal={m} />)}
        </tbody>
      </table>
    </div>
  )
}
