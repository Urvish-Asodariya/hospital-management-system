const doctormodel = require("../models/doctor.model");

exports.all = async (req, res) => {
    try {
        const limit = 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const doctors = await doctormodel.find().skip(skip).limit(limit);
        const success = {
            status: 200,
            message: "All doctors fetched successfully",
            data: doctors
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
        const doctor = await doctormodel.findById(id);
        if (!doctor) {
            const error = {
                status: 404,
                message: "Doctor not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Doctor fetched successfully",
                data: doctor
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

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const doctor = await doctormodel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!doctor) {
            const error = {
                status: 404,
                message: "Doctor not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Doctor updated successfully",
                data: doctor
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
        const doctor = await doctormodel.findByIdAndDelete(id);
        if (!doctor) {
            const error = {
                status: 404,
                message: "Doctor not found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Doctor deleted successfully"
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