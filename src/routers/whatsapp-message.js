const express = require('express')
const WhatsAppMessage = require('../models/whatsapp-message')
const router = new express.Router()

router.post('/whatsapp/messages/webhook', async (req, res) => {
    try {
        const wppMessage = new WhatsAppMessage(req.body)
        await wppMessage.save()
        res.status(200).send(req.body)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router