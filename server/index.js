const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

//local imports
const connectDb = require('./db')
const budgetRoutes = require('./controllers/budget.controller')
const { errorHandler } = require('./middlewares')

const app = express()

app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/api/budgets', budgetRoutes)
app.use(errorHandler)

connectDb()
    .then(() => {
        console.log('DB connection succeeded.')
        app.listen(3000, () => {
            console.log('Server started at 3000.')
        })
    })
    .catch(err => console.log(err))