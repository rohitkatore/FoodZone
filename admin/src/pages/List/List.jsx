import React from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';


function List({url}) {
  
  const [list,setList] = useState([]) ;

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`) ;
    console.log(response.data) ;
    if(response.data.success){
      setList(response.data.data) ;
    }
    else{
      toast.error(response.data.message) ;
    }
  }

  let removeFood = async(id)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id}) ;
    if(response.data.success){
      toast.success(response.data.message) ;
      await fetchList() ;
    }
    else{
      toast.error(response.data.message) ;
    }
  }

  useEffect(()=>{
    fetchList() ;
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Actions</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="food"/>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
