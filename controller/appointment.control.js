const appointmentSchema = require("../models/appointment.model");
const NotificationController = require("./notification.control");

exports.create = async (req, res) => {
    try {
        const { appointment_id, patient_id, doctor_id, appointment_date, department } = req.body;
        const appointment = new appointmentSchema({ appointment_id, patient_id, doctor_id, appointment_date, department });
        await appointment.save();
        NotificationController.sendNotification({
            userId: req.body.patientId,
            message: `Your appointment with Dr. ${appointment.doctorId} is confirmed.`,
            type: "appointment"
        });
        const success = {
            message: "Appointment created successfully",
            status: 200
        };
        res.json(success);
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.single = async (req, res) => {
    try {
        const id = req.params.id;
        const appointment = await appointmentSchema.findById(id);
        if (!appointment) {
            const error = {
                status: 404,
                message: "Appointment not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "HERE IS YOUR APPOINTMENT",
                data: appointment

            };
            res.json(success);
        }
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.all = async (req, res) => {
    try {
        const limit = 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const appointments = await appointmentSchema.find().skip(skip).limit(limit);
        if (!appointments) {
            const error = {
                status: 404,
                message: "No appointments found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "All appointments found",
                data: appointments
            };
            res.json(success);
        }
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const appointment = await appointmentSchema.findByIdAndDelete(id);
        if (!appointment) {
            const error = {
                status: 404,
                message: "Appointment not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Appointment deleted successfully"
            };
            res.json(success);
        }
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};