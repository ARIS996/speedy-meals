import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMeal, updateMeal } from "../services/apiClient"
import { MealContext } from "../context/MealContext"

function validateMeal(f) {
  let e = {}
  if (!f.name || f.name.length < 3 || f.name.length > 20) e.name = "Name 3-20"
  if (!f.cookTime || f.cookTime < 2 || f.cookTime > 240) e.cookTime = "2-240"
  if (!f.directions || f.directions.length < 10) e.directions = ">=10 chars"
  if (f.ingredients) {
    let r = ["salt","pepper","cheese"]
    for (let i of f.ingredients) {
      if (r.includes(i.toLowerCase())) e.ingredients = "No salt, pepper, cheese"
    }
  }
  return e
}

export default function UpdateMeal() {
  const { id } = useParams()
  const nav = useNavigate()
  const { meals, setMeals } = useContext(MealContext)
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getMeal(id).then(r => {
      let m = r.data
      let ing = m.ingredients || []
      while (ing.length < 3) ing.push("")
      setForm({ name:m.name, cookTime:m.cookTime, directions:m.directions, ingredients:ing })
    }).catch(()=>{})
  }, [id])

  function handleChange(e, idx) {
    if (!form) return
    let field = e.target.name
    let value = e.target.value
    if (field === "cookTime") value = Number(value)

    if (field === "ingredients") {
      let arr = [...form.ingredients]
      arr[idx] = value
      let upd = { ...form, ingredients: arr }
      setForm(upd)
      setErrors(validateMeal(upd))
    } else {
      let upd = { ...form, [field]: value }
      setForm(upd)
      setErrors(validateMeal(upd))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form) return
    let final = { ...form, cookTime:Number(form.cookTime) }
    let val = validateMeal(final)
    if (Object.keys(val).length > 0) {
      setErrors(val)
      return
    }
    updateMeal(id, final).then(r => {
      let updated = r.data
      setMeals(meals.map(m => m._id===id ? updated : m))
      nav(`/meals/${id}`)
    }).catch(err => alert(err.response?.data?.error || "Error"))
  }

  if (!form) return <div>Loading...</div>

  return (
    <div style={{ width:"80%", margin:"1rem auto" }}>
      <h2>Update Meal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br/>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label>Cook Time</label><br/>
          <input
            type="number"
            name="cookTime"
            value={form.cookTime}
            onChange={handleChange}
            className={errors.cookTime ? "input-error" : ""}
          />
          {errors.cookTime && <div className="error">{errors.cookTime}</div>}
        </div>
        <div>
          <label>Directions</label><br/>
          <textarea
            name="directions"
            value={form.directions}
            onChange={handleChange}
            className={errors.directions ? "input-error" : ""}
          />
          {errors.directions && <div className="error">{errors.directions}</div>}
        </div>
        <div>
          <label>Ingredients</label><br/>
          {form.ingredients.map((ing, idx) => (
            <input
              key={idx}
              name="ingredients"
              value={ing}
              onChange={e => handleChange(e, idx)}
              className={errors.ingredients ? "input-error" : ""}
            />
          ))}
          {errors.ingredients && <div className="error">{errors.ingredients}</div>}
        </div>
        <button disabled={Object.keys(errors).length>0}>Update</button>
      </form>
    </div>
  )
}
