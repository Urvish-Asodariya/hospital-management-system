const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient", 
    required: true 
},
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", 
    required: true 
},
  amount: { 
    type: Number, 
    required: true 
},
  status: { 
    type: String, 
    enum: ["pending", "paid", "canceled"], 
    default: "pending" 
},
  createdDate: { 
    type: Date, 
    default: Date.now 
}
},
{
    timestamps: true
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
