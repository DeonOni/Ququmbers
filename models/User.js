const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 40
    }
});

let User = module.exports = mongoose.model('User', userSchema);
