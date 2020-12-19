import mongoose from 'mongoose'

const callSchema = new mongoose.Schema({
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

const Call = mongoose.model('Call', callSchema)

export default Call
