import React from 'react'

const Order=({x})=>{
   
return(
    <div>
   {Object.values(x).map(j=>
      <div key={j.id}>
          <p>Dish Name:{j.dish}</p>
          <p>Quantity: {j.quantity}</p>
           <p>Price: {j.price}</p>
       </div>
   )}
   
    </div>
)

}

export default Order