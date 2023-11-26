const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: {type: String, required: false},
    phone: {type: String, required: false},
    updated: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isAgent: {type: Boolean, default: false},
    skills: {type: Boolean, default: false, required: false},
    profile: {type: String, required: true, default: "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg"
},

}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);