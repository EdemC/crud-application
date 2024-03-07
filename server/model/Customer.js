const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    details: {
        type: String,
        // required: true
    }
}, {timestamps: true})

const Customer = model('Customer', customerSchema);


module.exports = {
    Customer
}