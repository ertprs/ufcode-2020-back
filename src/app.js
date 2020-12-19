const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const loanRequestRouter = require('./routers/loan-request')
const visitRouter = require('./routers/visit')
const callRouter = require('./routers/call')
const whatsappMessageRouter = require('./routers/whatsapp-message')

const app = express()

app.use(express.json())

/**
 * Routers
 */
app.use(userRouter)
app.use(taskRouter)
app.use(loanRequestRouter)
app.use(visitRouter)
app.use(callRouter)
app.use(whatsappMessageRouter)

module.exports = app
