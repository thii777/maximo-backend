const express = require('express')

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const TaskController = require('./app/controllers/TaskController')
const MyTasksController = require('./app/controllers/MyTasksController')
const SessionController = require('./app/controllers/SessionController')

routes.post('/users', UserController.create)
routes.get('/users', UserController.getAll)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.post('/session', SessionController.create)

routes.post('/tasks', TaskController.create)
routes.get('/tasks', TaskController.getAll)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.delete)

routes.get('/mytasks', MyTasksController.getById)

module.exports = routes
