const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    report_id: {
        type: Number,
        required: true,
        unique: true
    },
    reportType: {
        type: String,
        enum: ['doctor', 'patient', 'staff'], 
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: function () { return this.reportType === 'doctor'; }
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: function () { return this.reportType === 'patient'; }
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: function () { return this.reportType === 'staff'; }
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema);
