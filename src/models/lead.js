const mongoose = require('mongoose')
const validator = require('validator')

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    value: {
        type: String,
    },
}, {
    timestamps: true
})

const Lead = mongoose.model('Lead', leadSchema)

module.exports = Lead
