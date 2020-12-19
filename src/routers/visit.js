const express = require('express')
const auth = require('../middleware/auth')
const Visit = require('../models/visit')
const router = new express.Router()

router.post('/visits', async (req, res) => {
    const visit = new Visit({
        ...req.body,
    })

    try {
        await visit.save()
        res.status(200).send(visit)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /visits?cpf=<user_id>
router.get('/visits', auth, async (req, res) => {
    const { cpf } = req.query

    try {
        const visits = await Visit.find({ cpf })

        res.send(visits)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/visits/:id', auth, async (req, res) => {
    const { id: _id } = req.params

    try {
        const visit = await Visit.findOne({ _id })

        if (!visit) {
            return res.status(404).send()
        }

        res.send(visit)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/visits/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['address', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const visit = await Visit.findOne({ _id: req.params.id})

        if (!visit) {
            return res.status(404).send()
        }

        updates.forEach((update) => visit[update] = req.body[update])
        await visit.save()
        res.send(visit)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/visits/:id', auth, async (req, res) => {
    try {
        const visit = await Visit.findOneAndDelete({ _id: req.params.id })

        if (!visit) {
            res.status(404).send()
        }

        res.send(visit)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
