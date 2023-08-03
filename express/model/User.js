const mongoose = require('mongoose');
const schema = mongoose.schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 1001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});