import express from 'express'
import User from '../models/user'
import LoanRequest from '../models/loan-request'
import auth from '../middleware/auth'
import axios from 'axios'

/**
 * Local router to be used by the main router
 */
const router = new express.Router()
const FAKE_WEBHOOK_URL = 'https://ufcode2020zap.herokuapp.com/v2/channels/whatsapp/messages'

router.post('/loan-requests', async (req, res) => {
    const loanRequest = new LoanRequest({
        ...req.body,
    })

    try {
        const user = await User.findOne({ _id: req.body.owner })

        if (req.body.value > user.margin) {
            // If the value of the loan is greater than the user's margin, they should not continue
            return res.status(400).send({ error: 'Usuário não tem limite para fazer esse emprestimo '})
        }

        await loanRequest.save()

        /**
         * If the user's whatsapp number does not have an extra nine, we'll have some problems here: passing
         * - 319XXXXXXXX
         * - 31XXXXXXXX
         * is not the same thing to our bot! It'll only send a message if the user's wpp number matches perfectly with what we'll
         * pass in the post request below. Because of that, we'll make one request to the number with an extra digit and one
         * to the number without the extra digit (they'll always belong to the same person, of course)
         */
        let extraDigitNumber = user.phone.length === 11 ? user.phone : `${[user.phone.slice(0,3),'9',user.phone.slice(3)].join('')}`
        let oldNumberStyle = user.phone.length === 10 ? user.phone : `${user.phone.slice(0,3)}${user.phone.slice(4)}`

        /**
         * In the real world, this probably wouldn't work because the external API may not have a webhook (and that's exactly
         * what we're simulating here). We would have to create a polling.
         */
        await axios.post(FAKE_WEBHOOK_URL, {
            'from': '',
            'to': extraDigitNumber,
            'contents': [
                {
                'type': 'text',
                'text': `Olá, *${user.name}*!\n\nRecebemos sua solicitação de empréstimo 💰\n\nSeu pedido de número *${loanRequest._id.toString().slice(0,10)}* está sendo analisado, em breve retornaremos com notícias sobre seu status.\n\nObrigado por comprar com a Empresta!`
                }
            ]
        })
        await axios.post(FAKE_WEBHOOK_URL, {
            'from': '',
            'to': oldNumberStyle,
            'contents': [
                {
                'type': 'text',
                'text': `Olá, *${user.name}*!\n\nRecebemos sua solicitação de empréstimo 💰\n\nSeu pedido de número *${loanRequest._id.toString().slice(0,10)}* está sendo analisado, em breve retornaremos com notícias sobre seu status.\n\nObrigado por comprar com a Empresta!`
                }
            ]
        })

        res.status(200).send(loanRequest)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /loan-request?owner=<user_id>
router.get('/loan-requests', auth, async (req, res) => {
    const { owner } = req.query

    try {
        const loanRequests = await LoanRequest.find({ owner }).sort({createdAt: -1})

        res.send(loanRequests)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/loan-requests/:id', auth, async (req, res) => {
    const { id: _id } = req.params

    try {
        const loanRequest = await LoanRequest.findOne({ _id })

        if (!loanRequest) {
            return res.status(404).send()
        }

        res.send(loanRequest)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/loan-requests/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const loanRequest = await LoanRequest.findOne({ _id: req.params.id})

        if (!loanRequest) {
            return res.status(404).send()
        }

        updates.forEach((update) => loanRequest[update] = req.body[update])
        await loanRequest.save()
        res.send(loanRequest)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/loan-requests/:id', auth, async (req, res) => {
    try {
        const loanRequest = await LoanRequest.findOneAndDelete({ _id: req.params.id })

        if (!loanRequest) {
            res.status(404).send()
        }

        res.send(loanRequest)
    } catch (e) {
        res.status(500).send()
    }
})

export default router
