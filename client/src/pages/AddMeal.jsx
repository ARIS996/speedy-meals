import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createMeal } from "../services/apiClient"
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

export default function AddMeal() {
  const { meals, setMeals } = useContext(MealContext)
  const nav = useNavigate()
  const [form, setForm] = useState({ name:"", cookTime:"", directions:"", ingredients:["","",""] })
  const [errors, setErrors] = useState({})

  function handleChange(e, idx) {
    if (e.target.name === "ingredients") {
      let arr = [...form.ingredients]
      arr[idx] = e.target.value
      let upd = { ...form, ingredients: arr }
      setForm(upd)
      setErrors(validateMeal(upd))
    } else {
      let upd = { ...form, [e.target.name]: e.target.value }
      setForm(upd)
      setErrors(validateMeal(upd))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    let final = { ...form, cookTime: Number(form.cookTime) }
    let val = validateMeal(final)
    if (Object.keys(val).length > 0) {
      setErrors(val)
      return
    }
    createMeal(final).then(r => {
      setMeals([...meals, r.data])
      nav("/")
    }).catch(err => alert(err.response?.data?.error || "Error"))
  }

  return (
    <div className="container">
      <h2>Add Meal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br/>
          <input
            name="name"
            value={form.name}
            onChange={e=>{
              setForm({ ...form, name: e.target.value })
              let upd = { ...form, name:e.target.value }
              setErrors(validateMeal(upd))
            }}
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
            onChange={e=>{
              setForm({ ...form, cookTime:e.target.value })
              let upd = { ...form, cookTime:e.target.value }
              setErrors(validateMeal(upd))
            }}
            className={errors.cookTime ? "input-error" : ""}
          />
          {errors.cookTime && <div className="error">{errors.cookTime}</div>}
        </div>
        <div>
          <label>Directions</label><br/>
          <textarea
            name="directions"
            value={form.directions}
            onChange={e=>{
              setForm({ ...form, directions:e.target.value })
              let upd = { ...form, directions:e.target.value }
              setErrors(validateMeal(upd))
            }}
            className={errors.directions ? "input-error" : ""}
          />
          {errors.directions && <div className="error">{errors.directions}</div>}
        </div>
        <div>
          <label>Ingredients (3 optional)</label><br/>
          {form.ingredients.map((ing, idx)=>(
            <input
              key={idx}
              name="ingredients"
              value={ing}
              onChange={ev=>handleChange(ev, idx)}
              className={errors.ingredients ? "input-error" : ""}
            />
          ))}
          {errors.ingredients && <div className="error">{errors.ingredients}</div>}
        </div>
        <button disabled={Object.keys(errors).length>0}>Create</button>
      </form>
    </div>
  )
}
