import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h2>Explore our menu </h2>
        <p className='explore-menu-text'>Embark on a culinary journey. Discover flavors from around the world.</p>
        <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All":item.menu_name)} className="explore-menu-list-item"  key={index}>
                    <img className={category===item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
