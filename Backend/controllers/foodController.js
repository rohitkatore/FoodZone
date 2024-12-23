import foodModel from "../models/foodModel.js"
import fs from "fs"

//add food item

const addFood = async(req,res)=>{
const image_filename = `${req.file.filename}` ;

    const food = new foodModel({
        name : req.body.name ,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })
    try{
        await food.save() ;
        res.json({success:true,message:"food added"}) ;
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"}) ;
    }
}

let listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({}) ;
        res.json({success:true,data:foods}) ;

    }catch(err){
            console.log(err) ;
            res.json({success:false,message:"error"}) ;
    }
}

let removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id) ;
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id) ;
        res.json({success:true,message:"food removed"}) ;

    }catch(err){
        res.json({succes:false,message:"error"}) ;
    }
}

export {addFood,listFood,removeFood} ;