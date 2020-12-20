import express from 'express'
import cors from 'cors'

import userRouter from './routers/user'
import loanRequestRouter from './routers/loan-request'
import visitRouter from './routers/visit'
import callRouter from './routers/call'
import bankRouter from './routers/bank'
import whatsappMessageRouter from './routers/whatsapp-message'
import fakeBancoPan from './routers/fake-banco-pan'

import './db/mongoose'

const app = express()

app.use(express.json())

/**
 * Enable all cors requests
 */
app.use(cors())

/**
 * Routers
 */
app.use(userRouter)
app.use(loanRequestRouter)
app.use(visitRouter)
app.use(callRouter)
app.use(bankRouter)
app.use(whatsappMessageRouter)
app.use(fakeBancoPan)

export default app
