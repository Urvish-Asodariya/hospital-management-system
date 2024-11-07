const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    dateofbirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role:{
        type:String,
        enum : ["user","admin"],
        default:"user"
    }
});
module.exports=mongoose.model("User",userSchema);