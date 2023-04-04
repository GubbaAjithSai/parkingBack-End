const dotenv=require("dotenv")
const express=require("express");
const schedule = require('node-schedule');
const user=require("./model/userSchema")
const parkingLot=require("./model/parkingSpace")
const app=express();
const cors = require("cors");
const PORT=process.env.PORT || 3000
dotenv.config({path:'./config.env'})

require("./db/db")
app.use(cors());
app.use(express.json())

app.get("/parking", async (req, res) => {
    try {
      const slots = await parkingLot.find();
      res.send(slots);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});
app.get("/users", async (req, res) => {
    try {
      const users = await user.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});


app.post("/updateParking",async(req,res)=>{
    try {
        const data=new parkingLot(await req.body);
        await data.save();
        res.json({"msg":"done!!"})
    } catch (error) {
        console.log(error);
        res.json({"msg":error})
        
    }
})

app.post("/bookParking",async(req,res)=>{
    try {
        const { spaceID, vehicleType, parkingDate, vehicleNumber ,fromPeriod,toPeriod} = req.body
        
        const space = await parkingLot.findOne({ spaceID });
        
        if (!space) {
            res.status(400).json({ error: 'Parking space not found' });
        }
        else if (!space.availability) {
            res.status(400).json({ error: 'Parking space not available' });
        }
        else{
            await user.updateOne({ spaceID },{ $set: {vehicleType, toPeriod,fromPeriod,vehicleNumber,parkingDate } });
            await parkingLot.updateOne({ spaceID }, { $set: { availability: false } });
            res.json({ success: true });
            let date=toPeriod+":00.000+05:30"
            const job = schedule.scheduleJob(date, async function() {
                await parkingLot.updateOne({ spaceID }, { $set: { availability: true } }); 
                await user.updateOne({ spaceID },{ $set: {vehicleType:"0", toPeriod:"0",fromPeriod:"0",vehicleNumber:"0",parkingDate:"0" } });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error });
    }
})
app.get('/users/:id',async(req,res)=>{
    try {
        const spaceID=req.params.id
        const userr=await user.findOne({spaceID})
        res.json(userr)
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong.');
    }
})
app.listen(PORT,()=>{
    console.log("server connected")
})