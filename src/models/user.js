const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    cep: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
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
        type: String,
    },
    number: {
        type: String,
        required: true,
    },
    rg: {
        type: String,
        required: true,
    },
    rgOrgao: {
        type: String,
        required: true,
    },
    rgUF: {
        type: String,
        required: true,
    },
    rgData: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    agency: {
        type: String,
        required: true,
    },
    income: {
        type: String,
        required: true,
    },
    margin: {
        type: String,
        required: true,
    },
    benefitType: {
        type: String,
        required: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

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

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User