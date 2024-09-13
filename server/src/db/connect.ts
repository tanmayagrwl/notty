import mongoose from "mongoose";

export default async function dbConnect(){
    await mongoose.connect(String(process.env.MONGODB_URI),{
        dbName:"notty",
    })
    console.log("Mongodb Connected successfully")


}