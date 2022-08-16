const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    rollnumber: {
       required: true,
        type: Number,
        trim: true
    },
    branch: {
        required: true,
        type: String,
        trim: true
    },
    userid: {
        required: true,
        type: String,
        trim: true
    },
})

module.exports = mongoose.model('Data', dataSchema)