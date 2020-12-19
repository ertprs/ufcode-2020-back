import mongoose from 'mongoose'

const loanRequestSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    value: {
        type: Number,
        required: true,
    },
    numInstallments: {
        type: Number,
        required: true,
    },
    valueInstallments: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        default: '',
    },
    status: {
        /**
         * Possible values:
         * - in_progress
         * - accepted
         * - denied
         */
        type: String,
        default: 'in_progress'
    },
}, {
    timestamps: true
})

const LoanRequest = mongoose.model('LoanRequest', loanRequestSchema)

export default LoanRequest
