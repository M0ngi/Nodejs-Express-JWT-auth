const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: [25, 'Max length is 25.']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    
    accessToken:{
        type: Number,
        required: false,
        select: false,
    },
    refreshToken:{
        type: Number,
        required: false,
        select: false,
    },
}, {
    timestamps: true
})

userSchema.method(
    'verifyPassword',
    async function (password){
        return await bcrypt.compare(password, this.password);
    },
)

userSchema.method(
    'updatePassword',
    async function (password){
      this.password = await bcrypt.hash(password, 12);
      await this.save();
    },
);

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000 && error.keyPattern.email) {
      next(new Error('Email is already registered.'));
    } else {
      next(error);
    }
});

module.exports = mongoose.model('user', userSchema)
