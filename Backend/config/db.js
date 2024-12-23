import mongoose from "mongoose";
let url = "mongodb+srv://rohitkatore645:N9gl0Q8UwiE37ZXf@foodzone.xw9ya.mongodb.net/?retryWrites=true&w=majority&appName=foodzone" ;

export const connectDB = async ()=>{
    await mongoose.connect(url).then(()=>
        console.log("DB connected.")
    ) ;
}

