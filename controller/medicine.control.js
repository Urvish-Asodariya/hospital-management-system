const Medicine = require("../models/medicine.model");

exports.addMedicine = async (req, res) => {
    try {
        const { name, quantity, expiryDate, manufacturer, price } = req.body;
        const medicine = new Medicine({ name, quantity, expiryDate, manufacturer, price });
        await medicine.save();
        const success = {
            message: "Medicine created successfully",
            status: 201
        };
        return res.json(success);
    }
    catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};

exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        const success = {
            message: "Medicines retrieved successfully",
            status: 200,
            data: medicines
        }
        res.json(success);
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};

exports.getMedicineById = async (req,res) =>{
    try{
        const id = req.params.id;
        const medicine = await Medicine.findById(id);
        if(!medicine){
            const error = {
                status: 404,
                message: "Medicine not found"
            };
            return res.json(error);
        }else{
            const success = {
                message: "Medicine retrieved successfully",
                status: 200,
                data: medicine
            };
            return res.json(success);
        }
    }catch(err){
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const update = await Medicine.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!update) {
            const error = {
                status: 404,
                message: "Medicine not found"
            };
            return res.json(error);
        } else {
            const success = {
                message: "Medicine updated successfully",
                status: 200,
                data: update
            };
            return res.json(success);
        }
    } catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteMedicine = await Medicine.findByIdAndDelete(id);
        if (!deleteMedicine) {
            const error = {
                status: 404,
                message: "Medicine not found"
            };
            return res.json(error);
        } else {
            const success = {
                message: "Medicine deleted successfully",
                status: 200
            };
            return res.json(success);
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