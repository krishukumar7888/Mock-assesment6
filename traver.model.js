// models/Travel.js
const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true, enum: ['India', 'Africa', 'Europe', 'America'] },
    travelers: { type: Number, required: true },
    budgetPerPerson: { type: Number, required: true },
},{
    versionKey:false
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = { Travel };
