const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
{
    "spaceID":{
        type:String,
        required:true,
        unique:[true,"spaceId already present"]
    },
    "availability":{
        type:Boolean,
        required:true
    },
    "top":{
        type:Number,
        required:true
    },
    "left":{
        type:Number,
        required:true
    }
    
})
module.exports=mongoose.model("parkingInfo",userSchema)