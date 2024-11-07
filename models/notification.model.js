const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  type: { 
    type: String, 
    enum: ["appointment", "report", "reminder"], 
    required: true 
},
  read: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
},{
    timestamps: true
});

module.exports = mongoose.model("Notification", NotificationSchema);
