const mongoose=require("mongoose")

const db=process.env.dataBase;
mongoose.connect(db).then(()=>{
    console.log("db connected...")
}).catch((err)=>{
    console.log(err)  
})