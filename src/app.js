import express from 'express'
import cors from 'cors'

import userRouter from './routers/user'
import loanRequestRouter from './routers/loan-request'
import visitRouter from './routers/visit'
import callRouter from './routers/call'
import bankRouter from './routers/bank'
import whatsappMessageRouter from './routers/whatsapp-message'

import './db/mongoose'

const App = express()

App.use(express.json())
App.use(cors())

/**
 * Routers
 */
App.use(userRouter)
App.use(loanRequestRouter)
App.use(visitRouter)
App.use(callRouter)
App.use(bankRouter)
App.use(whatsappMessageRouter)

export default App
