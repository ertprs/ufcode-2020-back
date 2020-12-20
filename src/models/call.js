import mongoose from 'mongoose'

/**
 * Schema for the collection of calls. This represents the calls scheduled by an user.
 */
const callSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lead'
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
}, {
    timestamps: true
})

const Call = mongoose.model('Call', callSchema)

export default Call
