const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");

exports.register = async (req, res) => {
    try {
        const { user_id, name, address, phone, dateofbirth, gender, email, password } = req.body;
        const Pass = await bcrypt.hash(password, 10);
        const patient = new usermodel({ user_id, name, address, phone, dateofbirth, gender, email, password: Pass });
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
        return res.json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            const error = {
                status: 404,
                message: "User Not Found"
            };
            return res.json(error);
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const error = {
                    status: 401,
                    message: "Invalid Password"
                };
                return res.json(error);
            } else {
                const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
                const success = {
                    message: "Login Successfull",
                    status: 200,
                    token: token
                };
                return res.json(success);
            }
        }
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};