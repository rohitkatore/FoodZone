import { createContext, useEffect, useState } from "react";

import axios from 'axios' ;

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem,setCartItem] = useState({}) ;
    const [token,setToken] = useState(null) ;
    let url = "http://localhost:4000" ;
    const [food_list,setFoodList] = useState([]) ;


    const addToCart = async(itemId) =>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId] : 1 }))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
          await axios.post(url+"/api/cart/add",
            {itemId},
            {headers:{token:token}}
          ).then((response)=>console.log(response.data)).catch((err)=>console.log(err)) ;
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1})) ;
        if(token){
          await axios.post(url+"/api/cart/remove",
            {itemId},
            {headers:{token:token}}
          ).then((response)=>console.log(response.data)).catch((err)=>console.log(err)) ;
        }
    }

    const getTotalCartAmount = ()=>{
      let totalAmount = 0 ;
      for(const item in cartItem){
        if(cartItem[item]>0){
          let itemInfo = food_list.find((product)=> product._id === item) ;
          if (itemInfo) {
            totalAmount += itemInfo.price * cartItem[item] ;
          }
        }
      }
      return totalAmount ;
    }

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list") ;
    setFoodList(response.data.data) ;
  }

  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},
      {headers:{token:token}}
    ) ;
    setCartItem(response.data.cartData) ;
  }

  useEffect(()=>{
    async function fetchData(){
      await fetchFoodList() ;
      const token = localStorage.getItem("token") ;
      if(token){
        setToken(token) ;
        await loadCartData(localStorage.getItem("token")) ;
      }
    }
    fetchData() ;
  },[]);

  const ContextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
