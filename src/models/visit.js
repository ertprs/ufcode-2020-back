import mongoose from 'mongoose'

/**
 * Schema for the collection of visits. This represents the visits scheduled by an user.
 */
const visitSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lead'
    },
    date: {
        type: mongoose.Schema.Types.Date,
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
