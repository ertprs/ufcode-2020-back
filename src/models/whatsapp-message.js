const mongoose = require('mongoose')

const whatsappMessageSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    timestamp: {
        type: String,
    },
    type: {
        type: String,
    },
    subscriptionId: {
        type: String,
    },
    direction: {
        type: String,
    },
    channel: {
        type: String,
    },
    message: {
        contents: [{
            type: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            payload: {
                type: String,
            },
        }],
    }
}, {
    timestamps: true
})

const WhatsAppMessage = mongoose.model('WhatsAppMessage', whatsappMessageSchema)

module.exports = WhatsAppMessage