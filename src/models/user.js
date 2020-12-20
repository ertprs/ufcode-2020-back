import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * Schema for the user. This represents someone that has either filled all the data for the loan request or someone
 * that didn't finish and are leads. In the end of the form, they'll be asked a password to their account. After filling
 * this, they're no longer a lead, but an user of our platform.
 */
const userSchema = new mongoose.Schema({
    isLead: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    value: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    birthday: {
        type: mongoose.Schema.Types.Date,
    },
    maritalStatus: {
        type: String,
    },
    motherName: {
        type: String,
    },
    city: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    address: {
        type: String,
    },
    complement: {
        type: String,
    },
    state: {
        type: String
    },
    number: {
        type: String,
    },
    rg: {
        type: String
    },
    rgOrgao: {
        type: String
    },
    rgUF: {
        type: String
    },
    rgData: {
        type: String
    },
    bank: {
        type: String
    },
    agency: {
        type: String
    },
    income: {
        type: String
    },
    margin: {
        type: String
    },
    benefitType: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (cpf, password) => {
    const user = await User.findOne({ cpf })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

export default User
