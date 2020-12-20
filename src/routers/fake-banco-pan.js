import express from 'express'
import User from '../models/user'
import FakeBancoPan from '../models/fake-banco-pan'
import axios from 'axios'

/**
 * Local router to be used by the main router
 */
const router = new express.Router()

/**
 * Fake loan requests numbers and their status
 */
const FAKE_LOAN_REQUEST_NUMBER = '334455100'
const FAKE_WEBHOOK_URL = 'https://ufcode2020zap.herokuapp.com/v2/channels/whatsapp/messages'

/**
 * Simulates the creation of a loan request
 */
router.post('/fake-banco-pan/emprestimos/propostas', async (req, res) => {
    /**
     * Populates the CPF passed in with a fake loan request
     */
    const loanRequest = new FakeBancoPan({
        loanRequestNumber: FAKE_LOAN_REQUEST_NUMBER,
        status: 'PENDENTE',
        cpf: req.body.cpf
    })

    /**
     * Response just like banco pan's endpoint returns
     */
    const fakeResponse = {
        'id_rastreamento_externo': '652ID',
        'numero_proposta': FAKE_LOAN_REQUEST_NUMBER,
        'tipo_operacao': 'MARGEM_LIVRE'
    }

    try {
        await loanRequest.save()
        res.status(200).send(fakeResponse)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Simulates checking for the status of a loan request for a given user
 */
router.get('/fake-banco-pan/emprestimos/propostas/cpf', async (req, res) => {
    const { cpf } = req.query

    try {
        const loans = await FakeBancoPan.find({ cpf })

        /**
         * Builds the response object just like banco pan's endpoint returns
         */
        const responses = {}
        loans.forEach(loan => {
            responses[loan.loanRequestNumber] = loan.status
        })
        res.status(200).send(responses)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Simulates changing the status of a loan request. The endpoint itself will make the request for sending the whatsapp message.
 */
router.post('/fake-banco-pan/emprestimos/propostas/change-status', async (req, res) => {
    const { status, cpf, loanRequestNumber } = req.body

    try {
        const loan = await FakeBancoPan.findOne({ cpf, loanRequestNumber })
        loan.status = status

        /**
         * We need to get the data of the user whose cpf matches the one passed here, to send him a message if the status of the loan changes.
         */
        const user = await User.findOne({ cpf })

        const updated = await loan.save()

        let statusMessage
        
        switch(loan.status) {
            case 'APROVADO':
                statusMessage = '✅ Aprovado'
                break
            case 'REPROVADO':
                statusMessage = '❌ Reprovado'
                break
            case 'PENDENTE':
                statusMessage = '⏳ Em análise'
                break
        }

        /**
         * In the real world, this probably wouldn't work because the external API may not have a webhook (and that's exactly
         * what we're simulating here). We would have to create a polling.
         */
        await axios.post(FAKE_WEBHOOK_URL, {
            'from': '',
            'to': user.phone,
            'contents': [
                {
                'type': 'text',
                'text': `O status do seu empréstimo foi atualizado!\n\n${statusMessage}`
                }
            ]
        })

        res.status(200).send(updated)
    } catch (e) {
        res.status(500).send(e)
    }
})

export default router
