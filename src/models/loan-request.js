import mongoose from 'mongoose'

/**
 * Schema for the loan requests. This represents the request that's going to be opened after we have all
 * the information about our user (e.g, they filled the form or they've gone through the call center).
 */
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
    installmentValue: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    bankName:{
        type: String,
        required: true,
    }, 
    bankImage:{
        type: String,
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
