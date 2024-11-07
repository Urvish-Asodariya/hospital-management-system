const mongoose = require("mongoose");
const patientSchema = mongoose.Schema({
    patient_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    dateofbirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model("Patient", patientSchema);