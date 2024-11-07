const staffSchema = require("../models/staff.model");

exports.single = async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await staffSchema.findById(id);
        if (!staff) {
            const error = {
                status: 404,
                message: "Staff not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Staff found",
                data: staff
            };
            return res.json(success);
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
        const staff = await staffSchema.find().skip(skip).limit(limit);
        if (!staff) {
            const error = {
                status: 404,
                message: "Staff not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Staff found",
                data: staff
            };
            return res.json(success);
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
        const staff = await staffSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!staff) {
            const error = {
                status: 404,
                message: "Staff not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Staff updated",
                data: staff
            };
            return res.json(success);
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
        const staff = await staffSchema.findByIdAndDelete(id);
        if (!staff) {
            const error = {
                status: 404,
                message: "Staff not found"
            };
            return res.json(error);
        } else {
            const success = {
                status: 200,
                message: "Staff deleted"
            };
            return res.json(success);
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