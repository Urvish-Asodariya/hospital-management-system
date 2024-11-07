const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  quantity: { 
    type: Number, 
    required: true 
},
  expiryDate: { 
    type: Date, 
    required: true 
},
  manufacturer: { 
    type: String, 
    required: true 
},
  price: { 
    type: Number, 
    required: true 
}
},
{
    timestamps: true
});

module.exports = mongoose.model("Medicine", MedicineSchema);