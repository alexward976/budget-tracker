const express = require('express')
const router = express.Router()

const Budget = require('../models/budget.model')
const { generateCrudMethods} = require('../services')
const budgetCrud = generateCrudMethods(Budget)
const { validateDbId, raise404Error } = require('../middlewares')

router.get('/', (req, res, next) => {
    budgetCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId, (req, res, next) => {
    budgetCrud.getById(req.params.id)
        .then((data) => {
            if (data) res.send(data)
            else raise404Error(req, res)
        })
        .catch(err => next(err))     
})

router.post('/', (req, res, next) => {
    const newRecord = {
        name: req.body.name,
        date: req.body.date,
        income: req.body.income,
        expenses: req.body.expenses,
        net: req.body.net,
    }

    budgetCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res, next) => {
    const updatedRecord = {
        name: req.body.name,
        date: req.body.date,
        income: req.body.income,
        expenses: req.body.expenses,
        net: req.body.net,
    }

    budgetCrud.update(req.params.id, updatedRecord)
        .then((data) => {
            if (data) res.send(data)
            else raise404Error(req, res)
        })
        .catch(err => next(err))  
})

router.delete('/:id', validateDbId, (req, res, next) => {
    budgetCrud.delete(req.params.id)
        .then((data) => {
            if (data) res.send(data)
            else raise404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router