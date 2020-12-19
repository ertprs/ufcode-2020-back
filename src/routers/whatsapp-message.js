import express from 'express'
import WhatsAppMessage from '../models/whatsapp-message'

/**
 * Local router to be used by the main router
 */
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

export default router
