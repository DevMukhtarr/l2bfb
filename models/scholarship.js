const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
    scholarship_name: { type: String, required: true },
    scholarship_details: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);