const mongoose = require('mongoose')
const restricted = ['salt', 'pepper', 'cheese']

function ingredientValidator(list) {
  for (let i of list) {
    if (restricted.includes(i.toLowerCase())) return false
  }
  return true
}

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  cookTime: {
    type: Number,
    required: true,
    min: 2,
    max: 240
  },
  directions: {
    type: String,
    required: true,
    minlength: 10
  },
  ingredients: {
    type: [String],
    validate: {
      validator: ingredientValidator,
      message: 'No salt, pepper, or cheese allowed'
    }
  }
}, { timestamps: true })

module.exports = mongoose.model('Meal', mealSchema)
