const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema({
    doctor_id: {
        type: Number,
        unique: true
    },
    name: {
        typr: String
    },
    Specialty: {
        type: String
    },
    phone_no: {
        type: Number
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    appointment_no: {
        type: Number
    }
}, { timestamps: true });
module.exports = mongoose.model("Doctor", doctorSchema);