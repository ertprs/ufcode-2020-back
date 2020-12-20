import mongoose from 'mongoose'

const fakeBancoPanSchema = new mongoose.Schema({
    loanRequestNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const FakeBancoPan = mongoose.model('FakeBancoPan', fakeBancoPanSchema)

export default FakeBancoPan
