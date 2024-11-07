const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const patientschema = require("../models/patient.model");

exports.register = async (req, res) => {
    try {
        const { patient_id, name, address, phone, dateofbirth, gender, email, password } = req.body;
        const Pass = await bcrypt.hash(password, 10);
        const patient = new patientschema({ patient_id, name, address, phone, dateofbirth, gender, email, password: Pass });
        await patient.save();
        const success = {
            message: "Patient Registered Successfully",
            status: 200
        };
        res.status(200).json(success);
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        res.json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await patientschema.findOne({ email });
        if (!patient) {
            const error = {
                status: 404,
                message: "Patient Not Found"
            };
            res.json(error);
        } else {
            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) {
                const error = {
                    status: 401,
                    message: "Invalid Password"
                };
                res.json(error);
            } else {
                const token = jwt.sign({ patient_id: patient.patient_id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                const success = {
                    message: "Patient Login Successfully",
                    status: 200,
                    token: token
                };
                res.json(success);
            }
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

exports.single = async (req, res) => {
    try {
        const id = req.params.id;
        const patient = await patientschema.findById(id);
        if (!patient) {
            const error = {
                status: 404,
                message: "Patient Not Found"
            };
            res.json(error);
        } else {
            const success = {
                message: "Patient Found",
                status: 200,
                data: patient
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
        const patients = await patientschema.find().skip(skip).limit(limit);
        const success = {
            message: "All Patients Found",
            status: 200,
            data: patients
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

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const patient = await patientschema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!patient) {
            const error = {
                status: 404,
                message: "Patient Not Found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Patient Updated Successfully",
                data: patient
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
        const patient = await patientschema.findByIdAndDelete(id);
        if (!patient) {
            const error = {
                status: 404,
                message: "Patient Not Found"
            };
            res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Patient Deleted Successfully"
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