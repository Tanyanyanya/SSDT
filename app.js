const express = require('express')
const app = express()
const users = require('./models/user_data.js')
const category = require('./models/category_data.js')
const record = require('./models/record_data.js')

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

///Отримання списку всіх користувачів 
app.get('/api/users', (req, res) => {
    res.json(users)
})

///Отримання користувача за його ID 
app.get('/api/users/:userID', (req, res) => {
    const id = Number(req.params.userID)
    const user = users.find(users => users.id == id)
    if (!users) {
        return res.status(404).send('Product not found')}
    res.json(user)
})

app.use(express.json()) // парсимо вміст тіла json

//Створення нового користувача
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

//Отримання списку вже існуючих категорій витрат
app.get('/api/category', (req, res) => {
    res.json(category)
})

//Створення категорії витрат
app.post('/api/category', (req, res) => {
    const newCategory = {
        id: category.length + 1,
        name: req.body.name,
    }
    category.push(newCategory)
    res.status(201).json(newCategory)
})

//Отримання списку записів 
app.get('/api/record', (req, res) => {
    res.json(record)
})

//Створення нового запису
app.post('/api/record', (req, res) => {
    const newRecord = {
        id: record.length + 1,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        date: req.body.date,
        sum: req.body.sum

    }
    record.push(newRecord)
    res.status(201).json(newRecord)
})

//Отримання списку записів по певному користувачу
app.get('/api/record/:user_id', (req, res) => {
    const id = Number(req.params.user_id)
    const records = record.find(record => record.user_id == id)
    if (!record) {
        return res.status(404).send('Record not found')}
    res.json(records)
})

//Отримання списку записів в категорії для певного користувача
app.get('/api/record/:user_id/:category_id', (req, res) => {
    const userId = Number(req.params.user_id)
    const categoryId = Number(req.params.category_id)
    const records = record.find(record => record.user_id == userId & record.category_id == categoryId )
    if (!record) {
        return res.status(404).send('Record not found')}
    res.json(records)
})