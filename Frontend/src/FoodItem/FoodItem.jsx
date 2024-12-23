import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

function FoodItem({ item }) {
  
  const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext) ;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+item.image} alt="" />
        {!cartItem[item._id] ? (
          <img
            className="add"
            onClick={() => addToCart(item._id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(item._id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[item._id]}</p>
            <img
              onClick={() => addToCart(item._id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          <img
            className="food-item-name-rating-img"
            src={assets.rating_starts}
            alt="rating"
          />
        </div>
        <p className="food-item-desc">{item.description}</p>
        <p className="food-item-price">${item.price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
