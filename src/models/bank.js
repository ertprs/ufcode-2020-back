import mongoose from 'mongoose'

/**
 * Schema for the collection of banks. This collection represents the banks that will be shown to the user in
 * the pre-signup step.
 */
const bankSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    interestRate: { // Percentage
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Bank = mongoose.model('Bank', bankSchema)

export default Bank
