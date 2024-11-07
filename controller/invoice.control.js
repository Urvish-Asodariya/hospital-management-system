const Invoice = require("../models/invoice.model");

exports.createInvoice = async (req, res) => {
    try {
        const { patientId, doctorId, amount } = req.body;
        const invoice = new Invoice({ patientId, doctorId, amount });
        await invoice.save();
        const success = {
            message: "Invoice created successfully",
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

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        const success = {
            message: "Invoices retrieved successfully",
            status: 200,
            data: invoices
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

exports.getInvoiceById = async(req,res)=>{
    try{
        const invoiceId = req.params.id;
        const invoice = await Invoice.findById(invoiceId);
        if(!invoice){
            const error = {
                status: 404,
                message: "Invoice not found"
            };
            return res.json(error);
        }else{
            const success = {
                message: "Invoice retrieved successfully",
                status: 200,
                data: invoice
            };
            return res.json(success);
        }
    }
    catch(err){
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
};

exports.updateInvoices = async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!invoice){
            const error = {
                status: 404,
                message: "Invoice not found"
            };
            return res.json(error);
        }else{
            const success = {
                message: "Invoice updated successfully",
                status: 200,
                data: invoice
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

exports.deleteInvoice = async (req, res) => {
    try {
        const id = req.params.id;
      const invoice= await Invoice.findByIdAndDelete(id);
      if(!invoice){
        const error={
            status:404,
            message:"Invoice not found"
        };
        return res.json(error);
      }else{
        const success={
            message:"Invoice deleted successfully",
            status:200
        };
        return res.json(success);
      }
    }  catch (err) {
        const error = {
            status: err.status,
            message: err.message
        };
        return res.json(error);
    }
  };