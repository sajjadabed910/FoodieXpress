import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sajjadabed910:20701019@cluster0.jhzyvby.mongodb.net/FoodieXpress').then(()=>console.log("DB connected!"))
}