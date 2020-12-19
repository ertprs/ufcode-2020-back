import express from 'express'
import userRouter from './routers/user'
import taskRouter from './routers/task'
import loanRequestRouter from './routers/loan-request'
import visitRouter from './routers/visit'
import callRouter from './routers/call'
import whatsappMessageRouter from './routers/whatsapp-message'
import leadRouter from './routers/lead'

const App = express()

App.use(express.json())

/**
 * Routers
 */
App.use(userRouter)
App.use(taskRouter)
App.use(loanRequestRouter)
App.use(visitRouter)
App.use(callRouter)
App.use(whatsappMessageRouter)
App.use(leadRouter)

export default App
