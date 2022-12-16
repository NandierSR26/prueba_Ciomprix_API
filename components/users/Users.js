const { Schema, model } = require('mongoose')

const usersSchema = new Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
        
    },
    password: {
        type: String,
        trim: true
    },
    avatar: { type: String },
})

module.exports = model('Users', usersSchema)