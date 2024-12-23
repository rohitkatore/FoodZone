import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios' ;
import { useEffect } from "react";

function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const {url,setToken} = useContext(StoreContext) ;
  const [data,setdata] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({...data,[name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault() ;
    let newURL = url ;
    if(currState === "Sign Up"){
      newURL += "/api/user/register" ;
    }
    else{
      newURL += "/api/user/login" ;
    }
    try{
      const response = await axios.post(newURL,data) ;
      if(response.data.success){
        setToken(response.data.token) ;
        localStorage.setItem("token",response.data.token) ;
        setShowLogin(false) ;
      }
    }catch(err){
      console.log(err) ;
    }
   
  } 

  

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input type="text" name="name" onChange={handleInput} value={data.name} placeholder="Your name" required />
          )}
          <input name="email" onChange={handleInput} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" value={data.password} onChange={handleInput} type="password" placeholder="Your password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to terms of use & privay policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
