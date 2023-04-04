const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
{
    "spaceID":{
        type:String,
        required:true
        // unique:[true,"spaceId already registered"]
    },
    "vehicleType":{
        type:String,
        required:true
    },
    "vehicleNumber":{
        type:String,
        required:true,
        unique:[true,"vehicleNumber already booked"]
    },
    "parkingDate":{
        type:Date,
        required:true
    },
    "fromPeriod":{
        type:Date,
        required:true
    },
    "toPeriod":{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model("parkingUserInfo",userSchema)