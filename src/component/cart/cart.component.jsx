import React from 'react'
import {connect} from 'react-redux'
import {selectCartItems,selectCartItemsPrice,selectCartItemsQuantity} from '../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import './cart.style.css'

const CartItems=({cartItems,selectCartItemsPrice,selectCartItemsQuantity})=>{

   
    return(
    <div>
        
 {cartItems.map(cartItem=>(
               <div className="bold" key={cartItem.id}>
       <div className="leftbox">{cartItem.dish}</div>      <div className="middlebox">{cartItem.quantity}x{cartItem.price}</div>
         <div className="rightbox">
             $ {cartItem.price*cartItem.quantity}</div>
        </div>
            ))}
          <br />
          <div className="detail_pane">  <h4>Total Items: {selectCartItemsQuantity}</h4>
<h4>Price: $ {selectCartItemsPrice}</h4></div>

  </div>
    )
}

const maptoporps=()=>createStructuredSelector({
    cartItems:selectCartItems,
    selectCartItemsPrice:selectCartItemsPrice,
    selectCartItemsQuantity:selectCartItemsQuantity
})


export default connect(maptoporps)(CartItems)