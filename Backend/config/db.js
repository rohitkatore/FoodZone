import mongoose from "mongoose";
let url = process.env.MONGOOSE_URL ;

export const connectDB = async ()=>{
    await mongoose.connect(url).then(()=>
        console.log("DB connected.")
    ) ;
}

