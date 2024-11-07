const mongoose = require("mongoose");
const AppointmentSchema = mongoose.Schema({
    appointment_id: {
        type: Number,
        required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    appointment_date: {
        type: Date,
        required: true
    },
    department: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model("Appointment", AppointmentSchema);