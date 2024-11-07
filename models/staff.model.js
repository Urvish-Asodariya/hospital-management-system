const mongoose = require("mongoose");
const staffSchema = mongoose.Schema({
    staff_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    role: {
        type: String
    },
    phone: {
        type: Number
    },
    department: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model("Staff", staffSchema);