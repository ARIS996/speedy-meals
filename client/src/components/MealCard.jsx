import React from 'react'
import { Link } from 'react-router-dom'

function hasThreeValidIngredients(ings) {
  if (!ings) return false
  let arr = ings.filter(i => i.trim() !== '')
  if (arr.length !== 3) return false
  let r = ['salt','pepper','cheese']
  for (let x of arr) {
    if (r.includes(x.toLowerCase())) return false
  }
  return true
}

export default function MealCard({ meal }) {
  return (
    <tr>
      <td>
        {meal.name}
        {hasThreeValidIngredients(meal.ingredients) && <span> ⭐</span>}
      </td>
      <td>{meal.cookTime} min</td>
      <td>
      <Link to={`/meals/${meal._id}`} style={{ marginRight: '1rem' }}>Details</Link>
      <Link to={`/meals/${meal._id}/update`}>Edit</Link>
      </td>
    </tr>
  )
}
