require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mealRoutes = require('./routes/mealRoutes')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

app.use('/api/meals', mealRoutes)

app.get('/', (req, res) => res.send('API running...'))

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on ${port}`))
