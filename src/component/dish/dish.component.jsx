import React from 'react'
import Button from '../../shared/Button'

const Dish=({d})=>{

    

    return(
       <div className="item_e">
          <div className="item_e1">
              <h3>{d.dish}</h3> 
              <h4><b>Price: {d.price}</b></h4>
              <Button>Edit</Button> <Button inverse>Delete</Button>
          </div>
           <img src={d.image} width="100px" height="100px" className="menu_image" alt={d.dish} />
       </div>
    )
}

export default Dish