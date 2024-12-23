import userModel from '../models/userModel.js';

//add item to user cart
export const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData ;
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
    }
    else {
        cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData});
    res.status(200).json({ success: true, message: "Item added to cart" });
    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message: 'error' });
    }
}

//remove item from user cart
export const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData ;
        if (cartData[req.body.itemId] >0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData});
        res.json({ success: true, message: "Item removed from cart" });
    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message: 'error' });   
    }
}

//fetch user cart items
export const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.log(err);
        res.status(400).json({success:false, message: 'error' });
        
    }
}

