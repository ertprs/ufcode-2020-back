import mongoose from 'mongoose'

/**
 * Schema for the collection of calls. This represents the calls scheduled by an user, which means their info
 * will be filled by an employee (to finish the loan request).
 */
const callSchema = new mongoose.Schema({
    user: {
        /**
         * The user who scheduled the call
         */
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
