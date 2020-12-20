import mongoose from 'mongoose'

/**
 * Schema for the collection of visits. This represents the visits scheduled by an user.
 */
const visitSchema = new mongoose.Schema({
    user: {
        /**
         * The user who scheduled the visit
         */
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    store: {
        /**
         * The name of the store where the user will go to finish his loan request.
         */
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Visit = mongoose.model('Visit', visitSchema)

export default Visit
