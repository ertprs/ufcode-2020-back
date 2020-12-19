import express from 'express'
import Lead from '../models/lead'

/**
 * Local router to be used by the main router
 */
const router = new express.Router()

router.post('/leads', async (req, res) => {
    const lead = new Lead(req.body)

    try {
        await lead.save()
        res.status(201).send(lead)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /leads?cpf=<user_id>
router.get('/leads', async (req, res) => {
    const { cpf } = req.query

    try {
        const leads = await Lead.find({ cpf })

        res.status(200).send(leads)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/leads/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const lead = await Lead.findOne({ _id: _id })

        if (!lead) {
            return res.status(404).send()
        }

        res.send(lead)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/leads/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'phone', 'cpf', 'cep', 'email', 'value']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const lead = await Lead.findOne({ _id: req.params.id })

        if (!lead) {
            return res.status(404).send()
        }

        updates.forEach((update) => lead[update] = req.body[update])
        await lead.save()
        res.send(lead)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findOneAndDelete({ _id: req.params.id })

        if (!lead) {
            res.status(404).send()
        }

        res.send(lead)
    } catch (e) {
        res.status(500).send()
    }
})

export default router
