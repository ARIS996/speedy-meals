const Meal = require('../models/Meal')

exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
    res.json(meals)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
    if (!meal) return res.status(404).json({ message: 'Not found' })
    res.json(meal)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body)
    const saved = await meal.save()
    res.status(201).json(saved)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.updateMeal = async (req, res) => {
  try {
    const updated = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

exports.deleteMeal = async (req, res) => {
  try {
    const deleted = await Meal.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Meal removed' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
