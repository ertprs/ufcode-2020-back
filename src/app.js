const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const whatsappMessageRouter = require('./routers/whatsapp-message')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(whatsappMessageRouter)

module.exports = app