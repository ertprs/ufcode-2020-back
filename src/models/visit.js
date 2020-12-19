import mongoose from 'mongoose'

const visitSchema = new mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Visit = mongoose.model('Visit', visitSchema)

export default Visit
